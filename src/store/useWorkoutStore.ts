import { create } from "zustand";
import { DayProgress, WeekProgress } from "../types/workout";
import { clearProgress, loadProgress, saveProgress } from "../utils/storage";

interface WorkoutStore {
    progress: WeekProgress;
    isLoaded: boolean;

    // Actions
    initStore: () => Promise<void>;
    toggleExercise: (dayId: number, exerciseId: string) => void;
    isExerciseCompleted: (dayId: number, exerciseId: string) => boolean;
    getCompletedCount: (dayId: number) => number;
    getCompletedExercises: (dayId: number) => string[];
    resetWeek: () => void;
    resetDay: (dayId: number) => void;
}

function getWeekStartDate(): string {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0=Sunday
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7)); // get Monday
    return monday.toISOString().split("T")[0];
}

function createEmptyProgress(): WeekProgress {
    return {
        weekStartDate: getWeekStartDate(),
        days: {},
    };
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
    progress: createEmptyProgress(),
    isLoaded: false,

    initStore: async () => {
        const saved = await loadProgress();
        if (saved) {
            // Check if it's the same week, if not reset
            const currentWeekStart = getWeekStartDate();
            if (saved.weekStartDate === currentWeekStart) {
                set({ progress: saved, isLoaded: true });
            } else {
                // New week, reset progress
                const empty = createEmptyProgress();
                await saveProgress(empty);
                set({ progress: empty, isLoaded: true });
            }
        } else {
            const empty = createEmptyProgress();
            await saveProgress(empty);
            set({ progress: empty, isLoaded: true });
        }
    },

    toggleExercise: (dayId: number, exerciseId: string) => {
        const { progress } = get();
        const dayProgress = progress.days[dayId] || {
            dayId,
            completedExercises: [],
            lastUpdated: new Date().toISOString(),
        };

        const isCompleted = dayProgress.completedExercises.includes(exerciseId);
        const updatedExercises = isCompleted
            ? dayProgress.completedExercises.filter((id) => id !== exerciseId)
            : [...dayProgress.completedExercises, exerciseId];

        const updatedDayProgress: DayProgress = {
            ...dayProgress,
            completedExercises: updatedExercises,
            lastUpdated: new Date().toISOString(),
        };

        const updatedProgress: WeekProgress = {
            ...progress,
            days: {
                ...progress.days,
                [dayId]: updatedDayProgress,
            },
        };

        set({ progress: updatedProgress });
        saveProgress(updatedProgress);
    },

    isExerciseCompleted: (dayId: number, exerciseId: string) => {
        const { progress } = get();
        const dayProgress = progress.days[dayId];
        if (!dayProgress) return false;
        return dayProgress.completedExercises.includes(exerciseId);
    },

    getCompletedCount: (dayId: number) => {
        const { progress } = get();
        const dayProgress = progress.days[dayId];
        if (!dayProgress) return 0;
        return dayProgress.completedExercises.length;
    },

    getCompletedExercises: (dayId: number) => {
        const { progress } = get();
        const dayProgress = progress.days[dayId];
        if (!dayProgress) return [];
        return dayProgress.completedExercises;
    },

    resetWeek: () => {
        const empty = createEmptyProgress();
        set({ progress: empty });
        clearProgress();
    },

    resetDay: (dayId: number) => {
        const { progress } = get();
        const updatedProgress: WeekProgress = {
            ...progress,
            days: {
                ...progress.days,
                [dayId]: {
                    dayId,
                    completedExercises: [],
                    lastUpdated: new Date().toISOString(),
                },
            },
        };
        set({ progress: updatedProgress });
        saveProgress(updatedProgress);
    },
}));

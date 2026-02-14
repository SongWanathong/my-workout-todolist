import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { MedicationProgress } from "../types/medication";

const STORAGE_KEY = "medication_progress";

function getTodayDate(): string {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

interface MedicationStore {
    progress: MedicationProgress;
    isLoaded: boolean;

    // Actions
    initStore: () => Promise<void>;
    toggleMedication: (medicationId: string) => void;
    isMedicationTaken: (medicationId: string) => boolean;
    getCompletedCount: () => number;
    getCompletedIds: () => string[];
    resetToday: () => void;
}

export const useMedicationStore = create<MedicationStore>((set, get) => ({
    progress: {
        date: getTodayDate(),
        completedIds: [],
    },
    isLoaded: false,

    initStore: async () => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEY);
            if (data) {
                const saved: MedicationProgress = JSON.parse(data);
                const today = getTodayDate();

                if (saved.date === today) {
                    // วันเดียวกัน — ใช้ข้อมูลเดิม
                    set({ progress: saved, isLoaded: true });
                } else {
                    // วันใหม่ — รีเซ็ตอัตโนมัติ!
                    const empty: MedicationProgress = {
                        date: today,
                        completedIds: [],
                    };
                    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(empty));
                    set({ progress: empty, isLoaded: true });
                }
            } else {
                const empty: MedicationProgress = {
                    date: getTodayDate(),
                    completedIds: [],
                };
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(empty));
                set({ progress: empty, isLoaded: true });
            }
        } catch (error) {
            console.error("Error loading medication progress:", error);
            set({ isLoaded: true });
        }
    },

    toggleMedication: (medicationId: string) => {
        const { progress } = get();
        const isTaken = progress.completedIds.includes(medicationId);

        const updatedIds = isTaken
            ? progress.completedIds.filter((id) => id !== medicationId)
            : [...progress.completedIds, medicationId];

        const updatedProgress: MedicationProgress = {
            ...progress,
            completedIds: updatedIds,
        };

        set({ progress: updatedProgress });
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
    },

    isMedicationTaken: (medicationId: string) => {
        return get().progress.completedIds.includes(medicationId);
    },

    getCompletedCount: () => {
        return get().progress.completedIds.length;
    },

    getCompletedIds: () => {
        return get().progress.completedIds;
    },

    resetToday: () => {
        const empty: MedicationProgress = {
            date: getTodayDate(),
            completedIds: [],
        };
        set({ progress: empty });
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(empty));
    },
}));

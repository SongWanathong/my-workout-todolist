export type ExerciseCategory =
    | "upper_push"
    | "lower_body"
    | "cardio_core"
    | "upper_pull"
    | "lower_glute"
    | "cardio_fat_burn"
    | "recovery";

export interface Exercise {
    id: string;
    name: string;
    sets?: number;
    reps?: string; // "10" or "30 วิ/ข้าง" or "15–20 นาที"
    note?: string;
    isCardio?: boolean;
}

export interface ExerciseGroup {
    groupTitle?: string; // e.g. "คาร์ดิโอ", "Core แบบ McGill"
    exercises: Exercise[];
}

export interface WorkoutDay {
    id: number; // 1-7
    dayLabel: string; // "Day 1"
    title: string; // "Upper Push"
    subtitle: string; // "(ปลอดภัยหลัง)"
    emoji: string; // "💪"
    category: ExerciseCategory;
    color: string; // gradient start color
    colorEnd: string; // gradient end color
    groups: ExerciseGroup[];
}

export interface DayProgress {
    dayId: number;
    completedExercises: string[]; // exercise IDs
    lastUpdated: string; // ISO date
}

export interface WeekProgress {
    weekStartDate: string;
    days: Record<number, DayProgress>;
}

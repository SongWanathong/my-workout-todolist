export interface Medication {
    id: string;
    name: string;
    dosage?: string; // e.g. "1 เม็ด", "500mg"
    time: MedicationTime; // ช่วงเวลาที่ต้องกิน
    note?: string;
    emoji?: string;
}

export type MedicationTime = "morning" | "afternoon" | "evening" | "bedtime";

export const medicationTimeLabels: Record<MedicationTime, string> = {
    morning: "🌅 เช้า",
    afternoon: "☀️ กลางวัน",
    evening: "🌇 เย็น",
    bedtime: "🌙 ก่อนนอน",
};

export interface MedicationProgress {
    date: string; // YYYY-MM-DD
    completedIds: string[];
}

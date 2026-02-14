import { Medication } from "../types/medication";

/**
 * รายการยาประจำวัน
 * แก้ไขรายการยาที่นี่ได้เลยครับ!
 */
export const dailyMedications: Medication[] = [
    // === ยาเช้า ===
    {
        id: "med_1",
        name: "ยารวม",
        dosage: "2 เม็ด",
        time: "morning",
        emoji: "💊",
    },

];

export function getMedicationsByTime(meds: Medication[]) {
    const groups: Record<string, Medication[]> = {};
    for (const med of meds) {
        if (!groups[med.time]) {
            groups[med.time] = [];
        }
        groups[med.time].push(med);
    }
    return groups;
}

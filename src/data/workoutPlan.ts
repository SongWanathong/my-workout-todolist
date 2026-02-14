import { colors } from "../theme/colors";
import { WorkoutDay } from "../types/workout";

export const workoutPlan: WorkoutDay[] = [
    {
        id: 1,
        dayLabel: "Day 1",
        title: "Upper Push",
        subtitle: "ปลอดภัยหลัง",
        emoji: "🏋️",
        category: "upper_push",
        color: colors.day1.start,
        colorEnd: colors.day1.end,
        groups: [
            {
                exercises: [
                    {
                        id: "d1_e1",
                        name: "Machine Chest Press",
                        sets: 4,
                        reps: "10",
                    },
                    {
                        id: "d1_e2",
                        name: "Incline Dumbbell Press",
                        sets: 3,
                        reps: "10",
                        note: "พิงพนัก",
                    },
                    {
                        id: "d1_e3",
                        name: "Seated Shoulder Press",
                        sets: 3,
                        reps: "10",
                        note: "พนักพิง",
                    },
                    {
                        id: "d1_e4",
                        name: "Lateral Raise",
                        sets: 3,
                        reps: "15",
                    },
                    {
                        id: "d1_e5",
                        name: "Rope Tricep Pushdown",
                        sets: 3,
                        reps: "12",
                    },
                    {
                        id: "d1_e6",
                        name: "เดินชันเบา ๆ",
                        reps: "15–20 นาที",
                        isCardio: true,
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        dayLabel: "Day 2",
        title: "Lower Body",
        subtitle: "เซฟหลังล่าง",
        emoji: "🦵",
        category: "lower_body",
        color: colors.day2.start,
        colorEnd: colors.day2.end,
        groups: [
            {
                exercises: [
                    {
                        id: "d2_e1",
                        name: "Leg Press",
                        sets: 4,
                        reps: "10",
                        note: "หลังแนบพนัก",
                    },
                    {
                        id: "d2_e2",
                        name: "Seated Leg Curl",
                        sets: 3,
                        reps: "12",
                    },
                    {
                        id: "d2_e3",
                        name: "Glute Bridge",
                        sets: 3,
                        reps: "12",
                        note: "ไม่ต้องบาร์หนัก",
                    },
                    {
                        id: "d2_e4",
                        name: "Step-up เตี้ย ๆ",
                        sets: 3,
                        reps: "10/ข้าง",
                    },
                    {
                        id: "d2_e5",
                        name: "Calf Raise",
                        sets: 3,
                        reps: "15",
                    },
                    {
                        id: "d2_e6",
                        name: "เดิน",
                        reps: "20 นาที",
                        isCardio: true,
                    },
                ],
            },
        ],
    },
    {
        id: 3,
        dayLabel: "Day 3",
        title: "Cardio + Core",
        subtitle: "สายฟื้นฟู",
        emoji: "🫀",
        category: "cardio_core",
        color: colors.day3.start,
        colorEnd: colors.day3.end,
        groups: [
            {
                groupTitle: "🏃 คาร์ดิโอ",
                exercises: [
                    {
                        id: "d3_e1",
                        name: "เดินเร็ว หรือ ปั่นจักรยานเอน",
                        reps: "45 นาที",
                        isCardio: true,
                        note: "Recumbent bike",
                    },
                ],
            },
            {
                groupTitle: "🧱 Core แบบ McGill",
                exercises: [
                    {
                        id: "d3_e2",
                        name: "McGill Curl-up",
                        sets: 3,
                        reps: "10",
                    },
                    {
                        id: "d3_e3",
                        name: "Side Plank",
                        sets: 3,
                        reps: "30 วิ/ข้าง",
                    },
                    {
                        id: "d3_e4",
                        name: "Bird Dog",
                        sets: 3,
                        reps: "10/ข้าง",
                    },
                ],
            },
        ],
    },
    {
        id: 4,
        dayLabel: "Day 4",
        title: "Upper Pull",
        subtitle: "เซฟหลัง",
        emoji: "💪",
        category: "upper_pull",
        color: colors.day4.start,
        colorEnd: colors.day4.end,
        groups: [
            {
                exercises: [
                    {
                        id: "d4_e1",
                        name: "Lat Pulldown",
                        sets: 4,
                        reps: "10",
                    },
                    {
                        id: "d4_e2",
                        name: "Seated Row",
                        sets: 3,
                        reps: "10",
                        note: "พิงพนัก",
                    },
                    {
                        id: "d4_e3",
                        name: "Chest-supported Dumbbell Row",
                        sets: 3,
                        reps: "10",
                    },
                    {
                        id: "d4_e4",
                        name: "Face Pull",
                        sets: 3,
                        reps: "15",
                    },
                    {
                        id: "d4_e5",
                        name: "Cable Curl",
                        sets: 3,
                        reps: "12",
                    },
                    {
                        id: "d4_e6",
                        name: "เดิน",
                        reps: "20 นาที",
                        isCardio: true,
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        dayLabel: "Day 5",
        title: "Lower",
        subtitle: "กล้ามก้นแบบปลอดภัย",
        emoji: "🍑",
        category: "lower_glute",
        color: colors.day5.start,
        colorEnd: colors.day5.end,
        groups: [
            {
                exercises: [
                    {
                        id: "d5_e1",
                        name: "Hip Thrust",
                        sets: 4,
                        reps: "10",
                        note: "น้ำหนักกลาง",
                    },
                    {
                        id: "d5_e2",
                        name: "Bulgarian Split Squat",
                        sets: 3,
                        reps: "10/ข้าง",
                        note: "ถือดัมเบลเบา",
                    },
                    {
                        id: "d5_e3",
                        name: "Leg Extension",
                        sets: 3,
                        reps: "12",
                    },
                    {
                        id: "d5_e4",
                        name: "Cable Pull-through",
                        sets: 3,
                        reps: "12",
                        note: "เบา ๆ",
                    },
                    {
                        id: "d5_e5",
                        name: "เดินชันเบา",
                        reps: "15–20 นาที",
                        isCardio: true,
                    },
                ],
            },
        ],
    },
    {
        id: 6,
        dayLabel: "Day 6",
        title: "คาร์ดิโอเผาไขมัน",
        subtitle: "เลือก 1 อย่าง",
        emoji: "🔥",
        category: "cardio_fat_burn",
        color: colors.day6.start,
        colorEnd: colors.day6.end,
        groups: [
            {
                groupTitle: "🔥 เลือก 1 อย่าง",
                exercises: [
                    {
                        id: "d6_e1",
                        name: "เดิน 60 นาที",
                        isCardio: true,
                    },
                    {
                        id: "d6_e2",
                        name: "ปั่นจักรยาน",
                        isCardio: true,
                    },
                    {
                        id: "d6_e3",
                        name: "ว่ายน้ำ",
                        isCardio: true,
                        note: "ดีมากสำหรับหลัง",
                    },
                ],
            },
        ],
    },
    {
        id: 7,
        dayLabel: "Day 7",
        title: "Recovery",
        subtitle: "วันพักฟื้น",
        emoji: "🧘",
        category: "recovery",
        color: colors.day7.start,
        colorEnd: colors.day7.end,
        groups: [
            {
                exercises: [
                    {
                        id: "d7_e1",
                        name: "เดิน",
                        reps: "30 นาที",
                        isCardio: true,
                    },
                    {
                        id: "d7_e2",
                        name: "ยืดสะโพก / hamstring / hip flexor",
                    },
                    {
                        id: "d7_e3",
                        name: "Foam rolling",
                    },
                ],
            },
        ],
    },
];

/**
 * Get total exercise count for a given day
 */
export function getTotalExercises(day: WorkoutDay): number {
    return day.groups.reduce(
        (sum, group) => sum + group.exercises.length,
        0
    );
}

/**
 * Get all exercise IDs for a given day
 */
export function getAllExerciseIds(day: WorkoutDay): string[] {
    return day.groups.flatMap((group) =>
        group.exercises.map((ex) => ex.id)
    );
}

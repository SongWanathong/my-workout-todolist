# 🏋️ Workout Todo List - Implementation Plan

## 📱 Overview
แอพ Android ส่วนตัวสำหรับติดตามตารางเล่นเวท 7 วัน พร้อมระบบ Todo List เช็คท่าที่ทำเสร็จแล้ว

## 🛠️ Tech Stack
- **Framework**: React Native (Expo) - ใช้ Expo เพื่อความสะดวกในการ dev และ build APK
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand (เบา, ง่าย, เหมาะกับ local state)
- **Local Storage**: AsyncStorage (เก็บ progress ของแต่ละวัน)
- **Styling**: React Native StyleSheet + Linear Gradient
- **Icons**: @expo/vector-icons

---

## 📋 Features
1. **Weekly View** - ดูตาราง 7 วัน ในหน้า Home
2. **Day Detail** - กดเข้าแต่ละวันเพื่อดูท่าออกกำลังกาย
3. **Exercise Checklist** - เช็คท่าที่ทำเสร็จแล้ว (checkbox)
4. **Progress Tracking** - แสดง % ความสำเร็จของแต่ละวัน
5. **Weekly Reset** - รีเซ็ต progress ทุกสัปดาห์ (manual)
6. **Rest Timer** - จับเวลาพัก (optional)

---

## 📦 Phase 1: Project Setup & Data Model
### Tasks:
- [ ] Init Expo project ด้วย `npx create-expo-app`
- [ ] ติดตั้ง dependencies (zustand, async-storage, expo-router, etc.)
- [ ] สร้างโครงสร้างโฟลเดอร์
- [ ] สร้าง Data Model / Types สำหรับ workout plan
- [ ] สร้างไฟล์ข้อมูลตาราง workout (static data)

### Folder Structure:
```
src/
├── app/                    # Expo Router pages
│   ├── _layout.tsx         # Root layout
│   ├── index.tsx           # Home - Weekly view
│   └── day/[id].tsx        # Day detail page
├── components/             # Reusable components
│   ├── DayCard.tsx         # Card แสดงแต่ละวัน
│   ├── ExerciseItem.tsx    # รายการท่า + checkbox
│   ├── ProgressBar.tsx     # Progress bar
│   └── Header.tsx          # App header
├── data/
│   └── workoutPlan.ts      # ข้อมูลตาราง workout
├── store/
│   └── useWorkoutStore.ts  # Zustand store
├── types/
│   └── workout.ts          # TypeScript types
├── theme/
│   └── colors.ts           # Color palette
│   └── typography.ts       # Font styles
└── utils/
    └── storage.ts          # AsyncStorage helpers
```

### Data Types:
```typescript
type ExerciseCategory = 'upper_push' | 'lower_body' | 'cardio_core' | 'upper_pull' | 'lower_glute' | 'cardio_fat_burn' | 'recovery';

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: string; // "10" or "30 วิ/ข้าง" or "15–20 นาที"
  note?: string;
}

interface WorkoutDay {
  id: number;          // 1-7
  dayLabel: string;    // "Day 1"
  title: string;       // "Upper Push (ปลอดภัยหลัง)"
  emoji: string;       // "🟢"
  category: ExerciseCategory;
  exercises: Exercise[];
}

interface DayProgress {
  dayId: number;
  completedExercises: string[]; // exercise IDs
  lastUpdated: string;          // ISO date
}

interface WeekProgress {
  weekStartDate: string;
  days: DayProgress[];
}
```

---

## 📦 Phase 2: Home Screen (Weekly View)
### Tasks:
- [ ] สร้าง Home screen แสดง 7 วัน
- [ ] สร้าง DayCard component (แสดงชื่อวัน, ชื่อ workout, progress %)
- [ ] สร้าง ProgressBar component
- [ ] สร้าง Header component
- [ ] ใส่สี gradient สวย ๆ
- [ ] Navigation ไปหน้า Day Detail

### UI Concept:
- Header: "💪 My Workout Plan" + week indicator
- ScrollView แนวตั้งแสดง 7 DayCards
- แต่ละ Card แสดง: emoji + day label + title + progress bar + "X/Y เสร็จแล้ว"
- สีพื้นหลังแบบ gradient (dark theme)

---

## 📦 Phase 3: Day Detail Screen
### Tasks:
- [ ] สร้างหน้า Day Detail (day/[id].tsx)
- [ ] แสดงรายการท่าออกกำลังกายทั้งหมดของวันนั้น
- [ ] สร้าง ExerciseItem component พร้อม checkbox
- [ ] เชื่อมต่อ Zustand store เพื่อ track completion
- [ ] แสดง sets x reps และ notes
- [ ] Animation เมื่อเช็ค/อันเช็ค

### UI Concept:
- Header: Day title + back button
- FlatList ของ ExerciseItem
- แต่ละ ExerciseItem: checkbox + ชื่อท่า + sets/reps info + notes
- Bottom: progress summary + "🎉 เสร็จหมดแล้ว!" เมื่อทำครบ

---

## 📦 Phase 4: State Management & Persistence
### Tasks:
- [ ] สร้าง Zustand store
- [ ] เชื่อม AsyncStorage เพื่อเก็บ progress
- [ ] Implement toggle exercise completion
- [ ] Implement weekly reset
- [ ] Load saved progress on app start
- [ ] Auto-save เมื่อมีการเปลี่ยนแปลง

---

## 📦 Phase 5: Polish & Build
### Tasks:
- [ ] ปรับ UI / animations ให้สวยงาม
- [ ] เพิ่ม haptic feedback เมื่อเช็คท่า
- [ ] เพิ่ม confetti animation เมื่อทำครบวัน
- [ ] Test บน Android
- [ ] Build APK ด้วย `eas build`
- [ ] (Optional) เพิ่ม Rest Timer feature
- [ ] (Optional) เพิ่ม Dark/Light mode toggle

---

## 🏃 วิธี Run & Build

### Development:
```bash
npx expo start
# กด 'a' เพื่อเปิดบน Android emulator
```

### Build APK:
```bash
npx eas build -p android --profile preview
```

---

## 📅 Workout Data (7 Days)

### Day 1 – Upper Push (ปลอดภัยหลัง)
- Machine Chest Press – 4x10
- Incline Dumbbell Press (พิงพนัก) – 3x10
- Seated Shoulder Press (พนักพิง) – 3x10
- Lateral Raise – 3x15
- Rope Tricep Pushdown – 3x12
- เดินชันเบา ๆ 15–20 นาที

### Day 2 – Lower Body (เซฟหลังล่าง)
- Leg Press (หลังแนบพนัก) – 4x10
- Seated Leg Curl – 3x12
- Glute Bridge (ไม่ต้องบาร์หนัก) – 3x12
- Step-up เตี้ย ๆ – 3x10/ข้าง
- Calf Raise – 3x15
- เดิน 20 นาที

### Day 3 – Cardio + Core (สายฟื้นฟู)
- **คาร์ดิโอ**: เดินเร็ว 45 นาที หรือ ปั่นจักรยานเอน (recumbent bike)
- **Core แบบ McGill**:
  - McGill Curl-up – 3x10
  - Side Plank – 3x30 วิ/ข้าง
  - Bird Dog – 3x10/ข้าง

### Day 4 – Upper Pull (เซฟหลัง)
- Lat Pulldown – 4x10
- Seated Row (พิงพนัก) – 3x10
- Chest-supported Dumbbell Row – 3x10
- Face Pull – 3x15
- Cable Curl – 3x12
- เดิน 20 นาที

### Day 5 – Lower (กล้ามก้นแบบปลอดภัย)
- Hip Thrust น้ำหนักกลาง – 4x10
- Bulgarian Split Squat (ถือดัมเบลเบา) – 3x10/ข้าง
- Leg Extension – 3x12
- Cable Pull-through เบา ๆ – 3x12
- เดินชันเบา 15–20 นาที

### Day 6 – คาร์ดิโอเผาไขมัน
- เลือก 1: เดิน 60 นาที / ปั่นจักรยาน / ว่ายน้ำ (ดีมากสำหรับหลัง)

### Day 7 – Recovery
- เดิน 30 นาที
- ยืดสะโพก / hamstring / hip flexor
- Foam rolling

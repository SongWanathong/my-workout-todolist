import { useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { MedicationItem } from "../../src/components/MedicationItem";
import { ProgressBar } from "../../src/components/ProgressBar";
import { dailyMedications, getMedicationsByTime } from "../../src/data/medications";
import { useMedicationStore } from "../../src/store/useMedicationStore";
import { borderRadius, colors, spacing } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";
import { MedicationTime, medicationTimeLabels } from "../../src/types/medication";

// ลำดับการแสดง: เช้า → กลางวัน → เย็น → ก่อนนอน
const TIME_ORDER: MedicationTime[] = ["morning", "afternoon", "evening", "bedtime"];

export default function MedicationScreen() {
  const {
    initStore,
    toggleMedication,
    isMedicationTaken,
    getCompletedCount,
    isLoaded,
  } = useMedicationStore();

  useEffect(() => {
    initStore();
  }, []);

  if (!isLoaded) return null;

  const total = dailyMedications.length;
  const completed = getCompletedCount();
  const progress = total > 0 ? completed / total : 0;
  const allDone = completed === total && total > 0;
  const grouped = getMedicationsByTime(dailyMedications);

  // วันที่วันนี้ (แบบไทย)
  const today = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>💊 ยาประจำวัน</Text>
        <Text style={styles.dateText}>{today}</Text>
      </View>

      {/* Progress Summary */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>
            {allDone ? "🎉 กินยาครบแล้ววันนี้!" : `กินไปแล้ว ${completed}/${total} รายการ`}
          </Text>
          <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
        </View>
        <ProgressBar progress={progress} color={colors.accentOrange} height={8} />
      </View>

      {/* Medication List by Time */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {TIME_ORDER.map((time) => {
          const meds = grouped[time];
          if (!meds || meds.length === 0) return null;

          return (
            <View key={time} style={styles.timeGroup}>
              <Text style={styles.timeLabel}>{medicationTimeLabels[time]}</Text>
              {meds.map((med) => (
                <MedicationItem
                  key={med.id}
                  medication={med}
                  isTaken={isMedicationTaken(med.id)}
                  onToggle={() => toggleMedication(med.id)}
                />
              ))}
            </View>
          );
        })}

        {allDone && (
          <View style={styles.finishCard}>
            <Text style={styles.finishEmoji}>💪</Text>
            <Text style={styles.finishTitle}>ดีมาก!</Text>
            <Text style={styles.finishText}>
              คุณกินยาครบทุกมื้อวันนี้แล้ว{"\n"}พรุ่งนี้รายการจะรีเซ็ตให้อัตโนมัติ
            </Text>
          </View>
        )}

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  greeting: {
    ...typography.h1,
    marginBottom: 4,
  },
  dateText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  progressCard: {
    marginHorizontal: spacing.xl,
    marginVertical: spacing.md,
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  progressTitle: {
    ...typography.label,
    color: colors.textPrimary,
  },
  progressPercent: {
    ...typography.number,
    fontSize: 16,
    color: colors.accentOrange,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  timeGroup: {
    marginBottom: spacing.lg,
  },
  timeLabel: {
    ...typography.h3,
    color: colors.accentOrange,
    marginBottom: spacing.md,
  },
  finishCard: {
    backgroundColor: colors.bgCard,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: "center",
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  finishEmoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  finishTitle: {
    ...typography.h2,
    marginBottom: spacing.xs,
  },
  finishText: {
    ...typography.bodySmall,
    textAlign: "center",
    lineHeight: 22,
  },
});

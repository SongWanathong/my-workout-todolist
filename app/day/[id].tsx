import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ExerciseItem } from "../../src/components/ExerciseItem";
import { ProgressBar } from "../../src/components/ProgressBar";
import { getTotalExercises, workoutPlan } from "../../src/data/workoutPlan";
import { useWorkoutStore } from "../../src/store/useWorkoutStore";
import { borderRadius, colors, spacing } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function DayDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const dayId = parseInt(id as string);
  
  const day = workoutPlan.find((d) => d.id === dayId);
  const { toggleExercise, isExerciseCompleted, getCompletedCount, resetDay } = useWorkoutStore();

  if (!day) return null;

  const completedCount = getCompletedCount(day.id);
  const total = getTotalExercises(day);
  const progress = total > 0 ? completedCount / total : 0;
  const isFinished = completedCount === total && total > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>{day.dayLabel}</Text>
          <Text style={styles.headerSubtitle}>{day.title}</Text>
        </View>
        <TouchableOpacity 
          onPress={() => resetDay(day.id)}
          style={styles.resetButton}
        >
          <Ionicons name="refresh" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar Top */}
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color={day.color} height={8} />
        <View style={styles.progressTextRow}>
          <Text style={styles.progressStatus}>
            {isFinished ? "🎉 ทำครบแล้ว!" : `เสร็จไปแล้ว ${completedCount}/${total} ท่า`}
          </Text>
          <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {day.groups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.groupContainer}>
            {group.groupTitle && (
              <Text style={styles.groupTitle}>{group.groupTitle}</Text>
            )}
            {group.exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                isCompleted={isExerciseCompleted(day.id, exercise.id)}
                onToggle={() => toggleExercise(day.id, exercise.id)}
              />
            ))}
          </View>
        ))}
        
        {isFinished && (
          <View style={styles.finishCard}>
            <Text style={styles.finishEmoji}>🔥</Text>
            <Text style={styles.finishTitle}>สุดยอดไปเลย!</Text>
            <Text style={styles.finishText}>คุณออกกำลังกายของวันนี้เสร็จเรียบร้อยแล้ว</Text>
            <TouchableOpacity 
              style={[styles.backHomeBtn, { backgroundColor: day.color }]}
              onPress={() => router.back()}
            >
              <Text style={styles.backHomeBtnText}>กลับหน้าหลัก</Text>
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerTitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  headerSubtitle: {
    ...typography.h3,
    fontSize: 20,
  },
  resetButton: {
    padding: spacing.xs,
  },
  progressContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  progressStatus: {
    ...typography.bodySmall,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  progressPercent: {
    ...typography.bodySmall,
    fontWeight: "800",
    color: colors.accentGreen,
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  groupContainer: {
    marginBottom: spacing.lg,
  },
  groupTitle: {
    ...typography.h3,
    color: colors.accentCyan,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
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
    marginBottom: spacing.lg,
  },
  backHomeBtn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    width: "100%",
    alignItems: "center",
  },
  backHomeBtnText: {
    ...typography.label,
    fontSize: 16,
  },
});

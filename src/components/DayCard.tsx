import { LinearGradient } from "expo-linear-gradient";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getTotalExercises } from "../data/workoutPlan";
import { borderRadius, shadows, spacing } from "../theme/colors";
import { typography } from "../theme/typography";
import { WorkoutDay } from "../types/workout";
import { ProgressBar } from "./ProgressBar";

interface DayCardProps {
  day: WorkoutDay;
  completedCount: number;
  onPress: () => void;
}

const { width } = Dimensions.get("window");

export function DayCard({ day, completedCount, onPress }: DayCardProps) {
  const totalExercises = getTotalExercises(day);
  const progress = totalExercises > 0 ? completedCount / totalExercises : 0;
  const isCompleted = completedCount >= totalExercises && totalExercises > 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.touchable}
    >
      <LinearGradient
        colors={[day.color, day.colorEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {isCompleted && (
          <View style={styles.completedOverlay}>
            <Text style={styles.completedBadge}>✅ เสร็จ!</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={styles.emoji}>{day.emoji}</Text>
            <View style={styles.dayLabelContainer}>
              <Text style={styles.dayLabel}>{day.dayLabel}</Text>
            </View>
          </View>

          <Text style={styles.title}>{day.title}</Text>
          <Text style={styles.subtitle}>{day.subtitle}</Text>

          <View style={styles.progressSection}>
            <ProgressBar
              progress={progress}
              color="rgba(255, 255, 255, 0.9)"
              height={6}
            />
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                {completedCount}/{totalExercises} ท่า
              </Text>
              <Text style={styles.progressPercent}>
                {Math.round(progress * 100)}%
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.xl,
    ...shadows.card,
  },
  gradient: {
    borderRadius: borderRadius.xl,
    overflow: "hidden",
  },
  content: {
    padding: spacing.lg,
  },
  completedOverlay: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    zIndex: 10,
  },
  completedBadge: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  emoji: {
    fontSize: 32,
    marginRight: spacing.sm,
  },
  dayLabelContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 1,
  },
  title: {
    ...typography.h2,
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: spacing.md,
    fontWeight: "500",
  },
  progressSection: {
    marginTop: spacing.xs,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  progressText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
  },
  progressPercent: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "700",
  },
});

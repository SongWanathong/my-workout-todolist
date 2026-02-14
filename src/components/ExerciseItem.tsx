import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, spacing } from "../theme/colors";
import { typography } from "../theme/typography";
import { Exercise } from "../types/workout";

interface ExerciseItemProps {
  exercise: Exercise;
  isCompleted: boolean;
  onToggle: () => void;
}

export function ExerciseItem({
  exercise,
  isCompleted,
  onToggle,
}: ExerciseItemProps) {
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleToggle}
      style={[styles.container, isCompleted && styles.containerCompleted]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            onPress={handleToggle}
            style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
          >
            {isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text
              style={[styles.name, isCompleted && styles.textCompleted]}
              numberOfLines={2}
            >
              {exercise.name}
            </Text>
            
            <View style={styles.metaContainer}>
              {exercise.sets && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{exercise.sets} เซ็ต</Text>
                </View>
              )}
              {exercise.reps && (
                <View style={[styles.badge, styles.badgeSecondary]}>
                  <Text style={styles.badgeText}>{exercise.reps}</Text>
                </View>
              )}
            </View>

            {exercise.note && (
              <Text style={styles.note}>💡 {exercise.note}</Text>
            )}
          </View>
        </View>

        {exercise.isCardio && (
          <Ionicons name="flash" size={20} color={colors.accentOrange} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgCard,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  containerCompleted: {
    backgroundColor: "rgba(0, 214, 143, 0.05)",
    borderColor: "rgba(0, 214, 143, 0.3)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    marginTop: 2,
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: colors.accentGreen,
    borderColor: colors.accentGreen,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    ...typography.body,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  textCompleted: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "rgba(51, 102, 255, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeSecondary: {
    backgroundColor: "rgba(155, 89, 182, 0.15)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
  },
  note: {
    ...typography.caption,
    fontSize: 12,
    color: colors.accentYellow,
    marginTop: 4,
    textTransform: "none",
  },
});

import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { borderRadius, colors, spacing } from "../theme/colors";
import { typography } from "../theme/typography";
import { Medication } from "../types/medication";

interface MedicationItemProps {
  medication: Medication;
  isTaken: boolean;
  onToggle: () => void;
}

export function MedicationItem({
  medication,
  isTaken,
  onToggle,
}: MedicationItemProps) {
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleToggle}
      style={[styles.container, isTaken && styles.containerTaken]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            onPress={handleToggle}
            style={[styles.checkbox, isTaken && styles.checkboxChecked]}
          >
            {isTaken && <Ionicons name="checkmark" size={18} color="#fff" />}
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <View style={styles.nameRow}>
              {medication.emoji && (
                <Text style={styles.emoji}>{medication.emoji}</Text>
              )}
              <Text style={[styles.name, isTaken && styles.textTaken]}>
                {medication.name}
              </Text>
            </View>

            {medication.dosage && (
              <View style={styles.dosageBadge}>
                <Text style={styles.dosageText}>{medication.dosage}</Text>
              </View>
            )}

            {medication.note && (
              <Text style={styles.note}>💡 {medication.note}</Text>
            )}
          </View>
        </View>

        {isTaken && (
          <Text style={styles.takenLabel}>กินแล้ว ✅</Text>
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
  containerTaken: {
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
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  emoji: {
    fontSize: 18,
    marginRight: 6,
  },
  name: {
    ...typography.body,
    fontWeight: "700",
  },
  textTaken: {
    color: colors.textSecondary,
    textDecorationLine: "line-through",
  },
  dosageBadge: {
    backgroundColor: "rgba(255, 159, 67, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accentOrange,
  },
  note: {
    ...typography.caption,
    fontSize: 12,
    color: colors.accentYellow,
    marginTop: 2,
    textTransform: "none",
  },
  takenLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accentGreen,
  },
});

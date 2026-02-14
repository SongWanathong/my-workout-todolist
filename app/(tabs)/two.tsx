import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWorkoutStore } from "../../src/store/useWorkoutStore";
import { borderRadius, colors, spacing } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function SettingsScreen() {
  const { resetWeek } = useWorkoutStore();

  const handleReset = () => {
    Alert.alert(
      "รีเซ็ตข้อมูลทั้งหมด?",
      "ความคืบหน้าของการออกกำลังกายในสัปดาห์นี้จะถูกลบออกทั้งหมด",
      [
        { text: "ยกเลิก", style: "cancel" },
        { 
          text: "ยืนยันการรีเซ็ต", 
          style: "destructive",
          onPress: () => resetWeek()
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ตั้งค่า</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ข้อมูลแอป</Text>
        <TouchableOpacity style={styles.menuItem} onPress={handleReset}>
          <View style={styles.menuLeft}>
            <View style={[styles.iconContainer, { backgroundColor: "rgba(255, 107, 107, 0.1)" }]}>
              <Ionicons name="trash-outline" size={20} color={colors.accentRed} />
            </View>
            <Text style={[styles.menuText, { color: colors.accentRed }]}>รีเซ็ตความคืบหน้าสัปดาห์นี้</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>เกี่ยวกับ</Text>
        <View style={styles.menuItemStatic}>
          <View style={styles.menuLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="information-circle-outline" size={20} color={colors.accentBlue} />
            </View>
            <Text style={styles.menuText}>เวอร์ชันแอป</Text>
          </View>
          <Text style={styles.menuValue}>1.0.0</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>สร้างด้วย ❤️ เพื่อสุขภาพที่ดีของคุณ</Text>
      </View>
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
    paddingBottom: spacing.xl,
  },
  title: {
    ...typography.h1,
  },
  section: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    ...typography.caption,
    marginBottom: spacing.md,
    color: colors.textSecondary,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.bgSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItemStatic: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.bgSecondary,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  menuText: {
    ...typography.body,
    fontWeight: "600",
  },
  menuValue: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: spacing.xxl,
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: "none",
  },
});

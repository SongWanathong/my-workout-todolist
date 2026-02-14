import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DayCard } from "../../src/components/DayCard";
import { workoutPlan } from "../../src/data/workoutPlan";
import { useWorkoutStore } from "../../src/store/useWorkoutStore";
import { colors, spacing } from "../../src/theme/colors";
import { typography } from "../../src/theme/typography";

export default function HomeScreen() {
  const router = useRouter();
  const { initStore, getCompletedCount, isLoaded } = useWorkoutStore();

  useEffect(() => {
    initStore();
  }, []);

  if (!isLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>สวัสดีครับ 💪</Text>
          <Text style={styles.title}>Workout ของสัปดาห์นี้</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {workoutPlan.map((day) => (
          <DayCard
            key={day.id}
            day={day}
            completedCount={getCompletedCount(day.id)}
            onPress={() => router.push(`/day/${day.id}`)}
          />
        ))}
        <View style={{ height: spacing.xl }} />
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
    paddingBottom: spacing.md,
  },
  greeting: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    ...typography.h1,
  },
  scrollContent: {
    paddingTop: spacing.sm,
  },
});

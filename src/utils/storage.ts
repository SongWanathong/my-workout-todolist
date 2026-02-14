import AsyncStorage from "@react-native-async-storage/async-storage";
import { WeekProgress } from "../types/workout";

const STORAGE_KEY = "workout_progress";

export async function loadProgress(): Promise<WeekProgress | null> {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data) as WeekProgress;
        }
        return null;
    } catch (error) {
        console.error("Error loading progress:", error);
        return null;
    }
}

export async function saveProgress(progress: WeekProgress): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

export async function clearProgress(): Promise<void> {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Error clearing progress:", error);
    }
}

export const colors = {
    // Background
    bgPrimary: "#0F0F1A",
    bgSecondary: "#1A1A2E",
    bgCard: "#16213E",
    bgCardHover: "#1C2A4A",

    // Accent
    accentGreen: "#00D68F",
    accentBlue: "#3366FF",
    accentPurple: "#9B59B6",
    accentOrange: "#FF9F43",
    accentRed: "#FF6B6B",
    accentCyan: "#00D2FF",
    accentPink: "#FF6B9D",
    accentYellow: "#FECA57",

    // Text
    textPrimary: "#FFFFFF",
    textSecondary: "#A0A3BD",
    textMuted: "#6B7280",

    // Status
    success: "#00D68F",
    warning: "#FF9F43",
    error: "#FF6B6B",
    info: "#3366FF",

    // Borders
    border: "#2D2D44",
    borderLight: "#3D3D5C",

    // Day card gradients
    day1: { start: "#667eea", end: "#764ba2" }, // Upper Push - Purple blue
    day2: { start: "#f093fb", end: "#f5576c" }, // Lower Body - Pink red
    day3: { start: "#4facfe", end: "#00f2fe" }, // Cardio Core - Blue cyan
    day4: { start: "#43e97b", end: "#38f9d7" }, // Upper Pull - Green teal
    day5: { start: "#fa709a", end: "#fee140" }, // Lower Glute - Pink yellow
    day6: { start: "#a18cd1", end: "#fbc2eb" }, // Cardio Fat - Lavender pink
    day7: { start: "#ffecd2", end: "#fcb69f" }, // Recovery - Peach
} as const;

export const shadows = {
    card: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    cardSmall: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 999,
} as const;

import { StyleSheet } from "react-native";

export const typography = StyleSheet.create({
    h1: {
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.5,
        color: "#FFFFFF",
    },
    h2: {
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: -0.3,
        color: "#FFFFFF",
    },
    h3: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    body: {
        fontSize: 16,
        fontWeight: "400",
        color: "#FFFFFF",
        lineHeight: 24,
    },
    bodySmall: {
        fontSize: 14,
        fontWeight: "400",
        color: "#A0A3BD",
        lineHeight: 20,
    },
    caption: {
        fontSize: 12,
        fontWeight: "500",
        color: "#6B7280",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    number: {
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});

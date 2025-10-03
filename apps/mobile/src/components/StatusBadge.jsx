import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/utils/theme";

export default function StatusBadge({ 
  status, 
  type = "default",
  size = "medium" 
}) {
  const theme = useTheme();

  const getStatusColor = (status, type) => {
    if (type === "success" || status === "डिलीवर हो गया" || status === "पूरा") {
      return theme.colors.success;
    }
    if (type === "info" || status === "डिलीवरी में") {
      return theme.colors.info;
    }
    if (type === "warning") {
      return theme.colors.warning;
    }
    if (type === "error") {
      return theme.colors.error;
    }
    return theme.colors.primary;
  };

  const paddingValues = size === "small" 
    ? { paddingHorizontal: 6, paddingVertical: 2 }
    : { paddingHorizontal: 8, paddingVertical: 4 };

  const fontSize = size === "small" ? 10 : 11;
  const borderRadius = size === "small" ? 10 : 14;

  return (
    <View
      style={{
        backgroundColor: getStatusColor(status, type),
        borderRadius,
        ...paddingValues,
      }}
    >
      <Text
        style={{
          fontFamily: "Roboto_500Medium",
          fontSize,
          color: "white",
        }}
      >
        {status}
      </Text>
    </View>
  );
}
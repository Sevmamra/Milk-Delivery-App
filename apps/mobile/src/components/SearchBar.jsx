import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Search, Scan } from "lucide-react-native";
import { useTheme } from "@/utils/theme";

export default function SearchBar({ 
  placeholder = "Search", 
  value, 
  onChangeText, 
  showScanButton = false,
  onScanPress,
  style = {},
  variant = "default" // "default" | "outlined" | "filled"
}) {
  const theme = useTheme();

  const getSearchBarStyle = () => {
    const baseStyle = {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      ...style,
    };

    if (variant === "outlined") {
      return {
        ...baseStyle,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 20,
        backgroundColor: theme.isDark 
          ? "rgba(255, 255, 255, 0.05)" 
          : theme.colors.surface,
      };
    }

    if (variant === "filled") {
      return {
        ...baseStyle,
        backgroundColor: theme.isDark 
          ? "rgba(255, 255, 255, 0.1)" 
          : "rgba(0, 115, 51, 0.9)",
        borderRadius: 6,
      };
    }

    // Default style
    return {
      ...baseStyle,
      backgroundColor: theme.colors.input.background,
      borderRadius: 6,
    };
  };

  const getTextColor = () => {
    if (variant === "filled") {
      return "white";
    }
    return theme.colors.text.primary;
  };

  const getPlaceholderColor = () => {
    if (variant === "filled") {
      return "rgba(255, 255, 255, 0.9)";
    }
    return theme.colors.text.tertiary;
  };

  const getIconColor = () => {
    if (variant === "filled") {
      return "white";
    }
    return theme.colors.text.tertiary;
  };

  return (
    <View style={getSearchBarStyle()}>
      <Search color={getIconColor()} size={18} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={getPlaceholderColor()}
        value={value}
        onChangeText={onChangeText}
        style={{
          flex: 1,
          marginLeft: 8,
          fontFamily: "Roboto_400Regular",
          color: getTextColor(),
          fontSize: 14,
          fontStyle: variant === "outlined" ? "italic" : "normal",
        }}
      />
      {showScanButton && (
        <TouchableOpacity onPress={onScanPress}>
          <Scan color={getIconColor()} size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
}
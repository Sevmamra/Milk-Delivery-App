import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Crown, Truck, User } from "lucide-react-native";
import { useTheme } from "@/utils/theme";

export default function Index() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }

  const userTypes = [
    {
      type: "owner",
      title: "मालिक",
      subtitle: "डेयरी व्यवसाय प्रबंधक",
      description: "सभी डिलीवरी मैन और ग्राहकों को देखें, रिपोर्ट जेनरेट करें",
      icon: Crown,
      color: "#FFB020",
      route: "/(owner)",
    },
    {
      type: "delivery_man",
      title: "डिलीवरी मैन",
      subtitle: "दूध वितरक",
      description: "ग्राहकों की सूची देखें और दैनिक डिलीवरी रिकॉर्ड करें",
      icon: Truck,
      color: "#1485FF",
      route: "/(delivery)",
    },
    {
      type: "customer",
      title: "ग्राहक",
      subtitle: "दूध लेने वाला",
      description: "अपना दैनिक रिकॉर्ड और मासिक बिल देखें",
      icon: User,
      color: "#09B14B",
      route: "/(customer)",
    },
  ];

  const handleUserTypeSelect = (userType) => {
    router.push(userType.route);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 40,
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 40 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 36, color: "white" }}>🥛</Text>
          </View>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Roboto_700Bold",
              color: theme.colors.text.primary,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            दूध डिलीवरी ऐप
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Roboto_400Regular",
              color: theme.colors.text.secondary,
              textAlign: "center",
            }}
          >
            आप कौन हैं? अपनी भूमिका चुनें
          </Text>
        </View>

        {/* User Type Cards */}
        {userTypes.map((userType, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleUserTypeSelect(userType)}
            style={{
              backgroundColor: theme.colors.card.background,
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: theme.colors.border,
              shadowColor: theme.colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: userType.color + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <userType.icon size={24} color={userType.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Roboto_700Bold",
                    color: theme.colors.text.primary,
                    marginBottom: 2,
                  }}
                >
                  {userType.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Roboto_500Medium",
                    color: userType.color,
                  }}
                >
                  {userType.subtitle}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Roboto_400Regular",
                color: theme.colors.text.secondary,
                lineHeight: 20,
              }}
            >
              {userType.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

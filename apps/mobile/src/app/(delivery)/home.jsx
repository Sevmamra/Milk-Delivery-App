import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { MapPin, Bell, Users, Package, CheckCircle, Clock, TrendingUp } from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import StatusBadge from "@/components/StatusBadge";

export default function DeliveryHome() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }

  const stats = [
    { label: "आज डिलीवरी", value: "25", icon: Package, color: theme.colors.primary },
    { label: "कुल ग्राहक", value: "87", icon: Users, color: theme.colors.info },
    { label: "पूरी डिलीवरी", value: "23", icon: CheckCircle, color: theme.colors.success },
    { label: "बकाया", value: "2", icon: Clock, color: theme.colors.warning },
  ];

  const recentCustomers = [
    { id: 1, name: "सुनीता देवी", area: "शिव नगर", quantity: "1.0 लीटर", status: "पूरा", time: "9:30 AM" },
    { id: 2, name: "राम प्रसाद", area: "राम नगर", quantity: "1.5 लीटर", status: "पूरा", time: "9:45 AM" },
    { id: 3, name: "गीता शर्मा", area: "गीता कॉलोनी", quantity: "0.5 लीटर", status: "बकाया", time: "Pending" },
    { id: 4, name: "विनोद यादव", area: "सुभाष नगर", quantity: "2.0 लीटर", status: "बकाया", time: "Pending" },
  ];

  const handleCustomerPress = (customerId) => {
    router.push(`/(delivery)/customer/${customerId}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 26,
          paddingVertical: 21,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <View
          style={{
            marginTop: insets.top,
            marginHorizontal: 21,
            backgroundColor: theme.colors.primary,
            borderRadius: 10,
            padding: 21,
            marginBottom: 21,
          }}
        >
          {/* Location and Bell Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 31,
                  height: 31,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <MapPin color="white" size={18} />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 16,
                    color: "rgba(255, 255, 255, 0.7)",
                  }}
                >
                  आपका क्षेत्र
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto_500Medium",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  शिव नगर, राम नगर
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: 31,
                height: 31,
                borderRadius: 16,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bell color="white" size={18} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <SearchBar
            placeholder="ग्राहक का नाम खोजें"
            variant="filled"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 21,
            marginBottom: 21,
            justifyContent: "space-between",
          }}
        >
          {stats.map((stat, index) => (
            <View
              key={index}
              style={{
                width: "48%",
                backgroundColor: theme.colors.card.background,
                borderRadius: 8,
                padding: 16,
                marginBottom: 10,
                borderWidth: 1,
                borderColor: theme.colors.border,
                shadowColor: theme.colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: stat.color + "20",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  <stat.icon size={16} color={stat.color} />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Roboto_400Regular",
                    color: theme.colors.text.secondary,
                  }}
                >
                  {stat.label}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.text.primary,
                }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Today's Progress */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 20,
                color: theme.colors.text.primary,
              }}
            >
              आज की प्रगति
            </Text>
            <TouchableOpacity>
              <TrendingUp color={theme.colors.success} size={20} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: theme.isDark ? "#2A2A2A" : "#F5F6F8",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                }}
              >
                डिलीवरी पूरी: 23/25
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Roboto_500Medium",
                  color: theme.colors.success,
                }}
              >
                92%
              </Text>
            </View>
            <View
              style={{
                height: 8,
                backgroundColor: theme.isDark ? "#3A3A3A" : "#E5E7EB",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  width: "92%",
                  height: "100%",
                  backgroundColor: theme.colors.success,
                }}
              />
            </View>
          </View>
        </Card>

        {/* Recent Deliveries */}
        <Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 20,
                color: theme.colors.text.primary,
              }}
            >
              आज की डिलीवरी
            </Text>
            <TouchableOpacity onPress={() => router.push("/(delivery)/deliveries")}>
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 17,
                  color: theme.colors.success,
                  letterSpacing: 0.5,
                }}
              >
                सभी देखें
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {recentCustomers.map((customer, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleCustomerPress(customer.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  borderBottomWidth: index < recentCustomers.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.divider,
                }}
              >
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    backgroundColor: theme.isDark ? "#3A3A3A" : "#EAECEE",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Text style={{ fontSize: 16 }}>👤</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Roboto_500Medium",
                      fontSize: 16,
                      color: theme.colors.text.primary,
                      marginBottom: 2,
                    }}
                  >
                    {customer.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 12,
                      color: theme.colors.text.secondary,
                      marginBottom: 2,
                    }}
                  >
                    {customer.area} • {customer.quantity}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 11,
                      color: theme.colors.text.tertiary,
                    }}
                  >
                    {customer.time}
                  </Text>
                </View>

                <StatusBadge 
                  status={customer.status} 
                  type={customer.status === "पूरा" ? "success" : "warning"} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
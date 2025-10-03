import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Bell, Calendar, TrendingUp, Milk, CreditCard, Clock } from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";

export default function CustomerHome() {
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

  // Mock data - in real app this would come from API
  const customerData = {
    name: "सुनीता देवी",
    address: "मकान नंबर 123, शिव नगर",
    phone: "9876543213",
    deliveryMan: "सुरेश (Delivery Man 1)"
  };

  const monthlyStats = {
    totalQuantity: 28.5,
    totalAmount: 1710,
    deliveryDays: 19,
    avgDaily: 1.5,
    ratePerLiter: 60
  };

  const recentDeliveries = [
    { date: "2024-10-03", quantity: 1.0, amount: 60, time: "9:30 AM", status: "आज" },
    { date: "2024-10-02", quantity: 1.0, amount: 60, time: "9:25 AM", status: "कल" },
    { date: "2024-10-01", quantity: 1.5, amount: 90, time: "9:20 AM", status: "2 दिन पहले" },
  ];

  const handleViewHistory = () => {
    router.push("/(customer)/history");
  };

  const handleViewNotifications = () => {
    router.push("/(customer)/notifications");
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 16,
                  color: "rgba(255, 255, 255, 0.7)",
                }}
              >
                नमस्ते,
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 24,
                  color: "white",
                  marginBottom: 4,
                }}
              >
                {customerData.name}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 14,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                डिलीवरी मैन: {customerData.deliveryMan}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleViewNotifications}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bell color="white" size={20} />
            </TouchableOpacity>
          </View>

          {/* Today's Status */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Milk color="white" size={20} />
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 16,
                  color: "white",
                  marginLeft: 8,
                }}
              >
                आज का दूध: 1.0 लीटर
              </Text>
            </View>
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              डिलीवरी का समय: सुबह 9:30 बजे
            </Text>
          </View>
        </View>

        {/* Monthly Summary */}
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
                fontFamily: "Roboto_700Bold",
                fontSize: 20,
                color: theme.colors.text.primary,
              }}
            >
              इस महीने का सारांश
            </Text>
            <TouchableOpacity onPress={handleViewHistory}>
              <TrendingUp color={theme.colors.primary} size={20} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "48%", alignItems: "center", marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.primary,
                }}
              >
                {monthlyStats.totalQuantity}L
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                कुल दूध
              </Text>
            </View>

            <View style={{ width: "48%", alignItems: "center", marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.success,
                }}
              >
                ₹{monthlyStats.totalAmount}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                कुल राशि
              </Text>
            </View>

            <View style={{ width: "48%", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.info,
                }}
              >
                {monthlyStats.deliveryDays}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                दिन डिलीवरी
              </Text>
            </View>

            <View style={{ width: "48%", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.warning,
                }}
              >
                {monthlyStats.avgDaily}L
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                  textAlign: "center",
                }}
              >
                दैनिक औसत
              </Text>
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
                fontFamily: "Roboto_700Bold",
                fontSize: 20,
                color: theme.colors.text.primary,
              }}
            >
              हाल की डिलीवरी
            </Text>
            <TouchableOpacity onPress={handleViewHistory}>
              <Text
                style={{
                  fontFamily: "Roboto_500Medium",
                  fontSize: 16,
                  color: theme.colors.primary,
                }}
              >
                सभी देखें
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            {recentDeliveries.map((delivery, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  borderBottomWidth: index < recentDeliveries.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.divider,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: theme.colors.primary + "20",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Milk color={theme.colors.primary} size={20} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Roboto_700Bold",
                      fontSize: 16,
                      color: theme.colors.text.primary,
                      marginBottom: 2,
                    }}
                  >
                    {delivery.quantity} लीटर दूध
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 12,
                      color: theme.colors.text.secondary,
                      marginBottom: 2,
                    }}
                  >
                    {new Date(delivery.date).toLocaleDateString('hi-IN')} • {delivery.time}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto_500Medium",
                      fontSize: 12,
                      color: theme.colors.success,
                    }}
                  >
                    ₹{delivery.amount}
                  </Text>
                </View>

                <StatusBadge 
                  status={delivery.status} 
                  type={delivery.status === "आज" ? "info" : "success"} 
                  size="small"
                />
              </View>
            ))}
          </View>
        </Card>

        {/* Quick Actions */}
        <Card>
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 20,
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            त्वरित कार्य
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity
              onPress={handleViewHistory}
              style={{ alignItems: "center", flex: 1 }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: theme.colors.info + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Calendar color={theme.colors.info} size={24} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                महीने का चार्ट
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: theme.colors.success + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <CreditCard color={theme.colors.success} size={24} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                बिल डाउनलोड
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleViewNotifications} style={{ alignItems: "center", flex: 1 }}>
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: theme.colors.warning + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Bell color={theme.colors.warning} size={24} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                सूचनाएं
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
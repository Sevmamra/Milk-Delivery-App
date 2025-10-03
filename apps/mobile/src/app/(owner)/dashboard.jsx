import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { 
  Crown, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Download
} from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";

export default function OwnerDashboard() {
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
  const todayStats = {
    totalMilkDelivered: 285,
    totalRevenue: 17100,
    totalCustomers: 300,
    activeDeliveryMen: 3,
    completedDeliveries: 275,
    pendingDeliveries: 25,
  };

  const deliveryMenStats = [
    { 
      id: 1, 
      name: "सुरेश", 
      area: "शिव नगर, राम नगर", 
      customers: 87, 
      completed: 82, 
      pending: 5, 
      milkDelivered: 125,
      status: "सक्रिय"
    },
    { 
      id: 2, 
      name: "रमेश", 
      area: "गीता कॉलोनी, सुभाष नगर", 
      customers: 105, 
      completed: 98, 
      pending: 7, 
      milkDelivered: 87,
      status: "सक्रिय"
    },
    { 
      id: 3, 
      name: "मुकेश", 
      area: "इंदिरा नगर, नेहरू नगर", 
      customers: 108, 
      completed: 95, 
      pending: 13, 
      milkDelivered: 73,
      status: "सक्रिय"
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      type: "delivery",
      message: "सुरेश ने सुनीता देवी को 1.0L दूध डिलीवर किया",
      time: "2 मिनट पहले",
      icon: Package,
      color: theme.colors.success
    },
    {
      id: 2,
      type: "payment",
      message: "राम प्रसाद का ₹1,800 का मासिक बिल तैयार",
      time: "15 मिनट पहले",
      icon: DollarSign,
      color: theme.colors.info
    },
    {
      id: 3,
      type: "alert",
      message: "गीता शर्मा की आज डिलीवरी बाकी है",
      time: "1 घंटे पहले",
      icon: AlertCircle,
      color: theme.colors.warning
    },
  ];

  const handleGenerateMonthlyReport = () => {
    // Here you would generate monthly report
    console.log("Generating monthly report...");
  };

  const handleViewDeliveryMen = () => {
    router.push("/(owner)/delivery-men");
  };

  const handleViewReports = () => {
    router.push("/(owner)/reports");
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
        {/* Header */}
        <View
          style={{
            marginTop: insets.top,
            marginHorizontal: 21,
            backgroundColor: "#FFB020",
            borderRadius: 10,
            padding: 21,
            marginBottom: 21,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Crown color="white" size={24} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 16,
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                स्वागत है,
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto_700Bold",
                  fontSize: 24,
                  color: "white",
                }}
              >
                राज कुमार (मालिक)
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto_500Medium",
                fontSize: 16,
                color: "white",
                marginBottom: 4,
              }}
            >
              आज: {todayStats.completedDeliveries}/{todayStats.totalCustomers} डिलीवरी पूरी
            </Text>
            <Text
              style={{
                fontFamily: "Roboto_400Regular",
                fontSize: 14,
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              कुल दूध: {todayStats.totalMilkDelivered}L • आय: ₹{todayStats.totalRevenue}
            </Text>
          </View>
        </View>

        {/* Today's Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 21,
            marginBottom: 21,
            justifyContent: "space-between",
          }}
        >
          {[
            { label: "कुल दूध", value: `${todayStats.totalMilkDelivered}L`, icon: Package, color: theme.colors.primary },
            { label: "आज की आय", value: `₹${todayStats.totalRevenue}`, icon: DollarSign, color: theme.colors.success },
            { label: "पूरी डिलीवरी", value: todayStats.completedDeliveries, icon: CheckCircle, color: theme.colors.info },
            { label: "बकाया", value: todayStats.pendingDeliveries, icon: Clock, color: theme.colors.warning },
          ].map((stat, index) => (
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
                  fontSize: 20,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.text.primary,
                }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Men Performance */}
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
              डिलीवरी मैन प्रदर्शन
            </Text>
            <TouchableOpacity onPress={handleViewDeliveryMen}>
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

          {deliveryMenStats.map((deliveryMan, index) => (
            <View
              key={deliveryMan.id}
              style={{
                paddingVertical: 12,
                borderBottomWidth: index < deliveryMenStats.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.divider,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: theme.colors.info + "20",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Users color={theme.colors.info} size={20} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Roboto_700Bold",
                      fontSize: 16,
                      color: theme.colors.text.primary,
                    }}
                  >
                    {deliveryMan.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Roboto_400Regular",
                      fontSize: 12,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    {deliveryMan.area}
                  </Text>
                </View>
                <StatusBadge status={deliveryMan.status} type="success" size="small" />
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 52 }}>
                <Text style={{ fontSize: 11, color: theme.colors.text.tertiary }}>
                  पूरी: {deliveryMan.completed}/{deliveryMan.customers}
                </Text>
                <Text style={{ fontSize: 11, color: theme.colors.text.tertiary }}>
                  दूध: {deliveryMan.milkDelivered}L
                </Text>
                <Text style={{ fontSize: 11, color: theme.colors.warning }}>
                  बकाया: {deliveryMan.pending}
                </Text>
              </View>
            </View>
          ))}
        </Card>

        {/* Recent Activity */}
        <Card>
          <Text
            style={{
              fontFamily: "Roboto_700Bold",
              fontSize: 20,
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            हाल की गतिविधि
          </Text>

          {recentNotifications.map((notification, index) => (
            <View
              key={notification.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 12,
                borderBottomWidth: index < recentNotifications.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.divider,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: notification.color + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 12,
                }}
              >
                <notification.icon size={16} color={notification.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: "Roboto_500Medium",
                    fontSize: 14,
                    color: theme.colors.text.primary,
                    marginBottom: 2,
                  }}
                >
                  {notification.message}
                </Text>
                <Text
                  style={{
                    fontFamily: "Roboto_400Regular",
                    fontSize: 12,
                    color: theme.colors.text.tertiary,
                  }}
                >
                  {notification.time}
                </Text>
              </View>
            </View>
          ))}
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
              onPress={handleGenerateMonthlyReport}
              style={{ alignItems: "center", flex: 1 }}
            >
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
                <Download color={theme.colors.success} size={24} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                मासिक रिपोर्ट
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleViewReports}
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
                <TrendingUp color={theme.colors.info} size={24} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                ट्रेंड देखें
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignItems: "center", flex: 1 }}>
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
                <Calendar color={theme.colors.warning} size={24} />
              </View>
              <Text
                style={{
                  fontFamily: "Roboto_400Regular",
                  fontSize: 12,
                  color: theme.colors.text.primary,
                  textAlign: "center",
                }}
              >
                बिल जेनरेट करें
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
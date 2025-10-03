import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { MapPin, Phone, Filter } from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import StatusBadge from "@/components/StatusBadge";

export default function DeliveryCustomers() {
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

  const customers = [
    {
      id: 1,
      name: "सुनीता देवी",
      address: "मकान नंबर 123, शिव नगर",
      area: "शिव नगर",
      phone: "9876543213",
      usualQuantity: "1.0 लीटर",
      todayStatus: "पूरा",
      lastDelivery: "आज 9:30 AM",
    },
    {
      id: 2,
      name: "राम प्रसाद",
      address: "मकान नंबर 456, राम नगर",
      area: "राम नगर",
      phone: "9876543214",
      usualQuantity: "1.5 लीटर",
      todayStatus: "पूरा",
      lastDelivery: "आज 9:45 AM",
    },
    {
      id: 3,
      name: "गीता शर्मा",
      address: "मकान नंबर 789, गीता कॉलोनी",
      area: "गीता कॉलोनी",
      phone: "9876543215",
      usualQuantity: "0.5 लीटर",
      todayStatus: "बकाया",
      lastDelivery: "कल 10:15 AM",
    },
    {
      id: 4,
      name: "विनोद यादव",
      address: "मकान नंबर 321, सुभाष नगर",
      area: "सुभाष नगर",
      phone: "9876543216",
      usualQuantity: "2.0 लीटर",
      todayStatus: "बकाया",
      lastDelivery: "कल 8:30 AM",
    },
    {
      id: 5,
      name: "सुशीला देवी",
      address: "मकान नंबर 654, इंदिरा नगर",
      area: "इंदिरा नगर",
      phone: "9876543217",
      usualQuantity: "1.0 लीटर",
      todayStatus: "पूरा",
      lastDelivery: "आज 10:00 AM",
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCustomerPress = (customerId) => {
    router.push(`/(delivery)/customer/${customerId}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style={theme.isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 21,
          paddingBottom: 20,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Roboto_700Bold",
              color: theme.colors.text.primary,
              flex: 1,
            }}
          >
            मेरे ग्राहक
          </Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.primary + "20",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Filter color={theme.colors.primary} size={20} />
          </TouchableOpacity>
        </View>

        <SearchBar
          placeholder="ग्राहक का नाम या क्षेत्र खोजें"
          variant="outlined"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 21,
            paddingVertical: 16,
            justifyContent: "space-around",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Roboto_700Bold",
                color: theme.colors.text.primary,
              }}
            >
              {customers.length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto_400Regular",
                color: theme.colors.text.secondary,
              }}
            >
              कुल ग्राहक
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Roboto_700Bold",
                color: theme.colors.success,
              }}
            >
              {customers.filter(c => c.todayStatus === "पूरा").length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto_400Regular",
                color: theme.colors.text.secondary,
              }}
            >
              आज पूरे हुए
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: "Roboto_700Bold",
                color: theme.colors.warning,
              }}
            >
              {customers.filter(c => c.todayStatus === "बकाया").length}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Roboto_400Regular",
                color: theme.colors.text.secondary,
              }}
            >
              बकाया
            </Text>
          </View>
        </View>

        {/* Customer List */}
        <View style={{ paddingHorizontal: 21 }}>
          {filteredCustomers.map((customer, index) => (
            <Card
              key={customer.id}
              onPress={() => handleCustomerPress(customer.id)}
              marginHorizontal={0}
              marginBottom={12}
            >
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: theme.isDark ? "#3A3A3A" : "#EAECEE",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>👤</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Roboto_700Bold",
                        color: theme.colors.text.primary,
                        flex: 1,
                      }}
                    >
                      {customer.name}
                    </Text>
                    <StatusBadge 
                      status={customer.todayStatus} 
                      type={customer.todayStatus === "पूरा" ? "success" : "warning"} 
                      size="small"
                    />
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                    <MapPin color={theme.colors.text.tertiary} size={14} />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Roboto_400Regular",
                        color: theme.colors.text.secondary,
                        marginLeft: 4,
                      }}
                    >
                      {customer.address}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                    <Phone color={theme.colors.text.tertiary} size={14} />
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Roboto_400Regular",
                        color: theme.colors.text.secondary,
                        marginLeft: 4,
                      }}
                    >
                      {customer.phone}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_500Medium",
                        color: theme.colors.primary,
                      }}
                    >
                      सामान्य: {customer.usualQuantity}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "Roboto_400Regular",
                        color: theme.colors.text.tertiary,
                      }}
                    >
                      {customer.lastDelivery}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
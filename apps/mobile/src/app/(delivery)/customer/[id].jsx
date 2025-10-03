import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { ArrowLeft, Phone, MapPin, Calendar, Save, Plus } from "lucide-react-native";
import { useTheme } from "@/utils/theme";
import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";

export default function CustomerDetail() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [quantity, setQuantity] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!loaded && !error) {
    return null;
  }

  // Mock customer data - in real app this would come from API
  const customer = {
    id: parseInt(id),
    name: "सुनीता देवी",
    address: "मकान नंबर 123, शिव नगर",
    area: "शिव नगर",
    phone: "9876543213",
    usualQuantity: 1.0,
    ratePerLiter: 60.0,
  };

  // Mock monthly delivery data
  const deliveries = [
    { date: "2024-10-01", quantity: 1.0, amount: 60.0 },
    { date: "2024-10-02", quantity: 1.0, amount: 60.0 },
    { date: "2024-10-03", quantity: 1.0, amount: 60.0 },
  ];

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const renderCalendar = () => {
    const days = [];
    const today = new Date().getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const delivery = deliveries.find(d => d.date === dateStr);
      const isToday = day === today;
      const isSelected = dateStr === selectedDate;
      
      days.push(
        <TouchableOpacity
          key={day}
          onPress={() => setSelectedDate(dateStr)}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            margin: 2,
            backgroundColor: isSelected 
              ? theme.colors.primary 
              : delivery 
                ? theme.colors.success + "20" 
                : isToday 
                  ? theme.colors.warning + "20" 
                  : "transparent",
            borderWidth: isToday ? 2 : 0,
            borderColor: theme.colors.warning,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: delivery ? "Roboto_700Bold" : "Roboto_400Regular",
              color: isSelected 
                ? "white" 
                : delivery 
                  ? theme.colors.success 
                  : theme.colors.text.primary,
            }}
          >
            {day}
          </Text>
          {delivery && (
            <Text
              style={{
                fontSize: 8,
                fontFamily: "Roboto_400Regular",
                color: isSelected ? "white" : theme.colors.success,
                position: "absolute",
                bottom: 2,
              }}
            >
              {delivery.quantity}L
            </Text>
          )}
        </TouchableOpacity>
      );
    }
    
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {days}
      </View>
    );
  };

  const handleSaveDelivery = async () => {
    if (!quantity || parseFloat(quantity) <= 0) {
      Alert.alert("गलती", "कृपया मान्य मात्रा दर्ज करें");
      return;
    }

    try {
      // Here you would make API call to save delivery
      Alert.alert(
        "सफल",
        `${customer.name} के लिए ${quantity} लीटर दूध की डिलीवरी रिकॉर्ड हो गई है।\n\nग्राहक को सूचना भेज दी गई है।`,
        [
          {
            text: "ठीक है",
            onPress: () => {
              setQuantity("");
              router.back();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert("गलती", "डिलीवरी सेव करने में समस्या हुई");
    }
  };

  const selectedDelivery = deliveries.find(d => d.date === selectedDate);
  const totalQuantity = deliveries.reduce((sum, d) => sum + d.quantity, 0);
  const totalAmount = deliveries.reduce((sum, d) => sum + d.amount, 0);

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.primary + "20",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <ArrowLeft color={theme.colors.primary} size={20} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Roboto_700Bold",
              color: theme.colors.text.primary,
              flex: 1,
            }}
          >
            {customer.name}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <MapPin color={theme.colors.text.tertiary} size={16} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Roboto_400Regular",
              color: theme.colors.text.secondary,
              marginLeft: 8,
            }}
          >
            {customer.address}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Phone color={theme.colors.text.tertiary} size={16} />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Roboto_400Regular",
              color: theme.colors.text.secondary,
              marginLeft: 8,
            }}
          >
            {customer.phone}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Monthly Summary */}
        <Card>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Roboto_700Bold",
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            इस महीने का सारांश
          </Text>
          
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.primary,
                }}
              >
                {totalQuantity.toFixed(1)}L
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                }}
              >
                कुल दूध
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
                ₹{totalAmount}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                }}
              >
                कुल राशि
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: "Roboto_700Bold",
                  color: theme.colors.info,
                }}
              >
                {deliveries.length}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.secondary,
                }}
              >
              दिन
              </Text>
            </View>
          </View>
        </Card>

        {/* Calendar */}
        <Card>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Roboto_700Bold",
              color: theme.colors.text.primary,
              marginBottom: 16,
            }}
          >
            महीने का कैलेंडर
          </Text>
          
          {renderCalendar()}
          
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.success + "40", marginRight: 4 }} />
              <Text style={{ fontSize: 10, color: theme.colors.text.tertiary }}>डिलीवरी हुई</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: theme.colors.warning, marginRight: 4 }} />
              <Text style={{ fontSize: 10, color: theme.colors.text.tertiary }}>आज</Text>
            </View>
          </View>
        </Card>

        {/* Selected Date Info */}
        {selectedDelivery ? (
          <Card>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto_700Bold",
                color: theme.colors.text.primary,
                marginBottom: 16,
              }}
            >
              {new Date(selectedDate).toLocaleDateString('hi-IN')} की डिलीवरी
            </Text>
            
            <View style={{ backgroundColor: theme.colors.success + "20", borderRadius: 8, padding: 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ fontSize: 14, fontFamily: "Roboto_500Medium", color: theme.colors.text.primary }}>
                  मात्रा:
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "Roboto_700Bold", color: theme.colors.success }}>
                  {selectedDelivery.quantity} लीटर
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 14, fontFamily: "Roboto_500Medium", color: theme.colors.text.primary }}>
                  राशि:
                </Text>
                <Text style={{ fontSize: 14, fontFamily: "Roboto_700Bold", color: theme.colors.success }}>
                  ₹{selectedDelivery.amount}
                </Text>
              </View>
            </View>
          </Card>
        ) : (
          <Card>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Roboto_700Bold",
                color: theme.colors.text.primary,
                marginBottom: 16,
              }}
            >
              {new Date(selectedDate).toLocaleDateString('hi-IN')} के लिए डिलीवरी जोड़ें
            </Text>
            
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Roboto_500Medium",
                  color: theme.colors.text.primary,
                  marginBottom: 8,
                }}
              >
                दूध की मात्रा (लीटर में)
              </Text>
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                placeholder={`सामान्य: ${customer.usualQuantity} लीटर`}
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  fontSize: 16,
                  fontFamily: "Roboto_400Regular",
                  color: theme.colors.text.primary,
                  backgroundColor: theme.colors.surface,
                }}
              />
            </View>

            {quantity && (
              <View style={{ backgroundColor: theme.colors.primary + "20", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                  <Text style={{ fontSize: 14, fontFamily: "Roboto_500Medium", color: theme.colors.text.primary }}>
                    मात्रा:
                  </Text>
                  <Text style={{ fontSize: 14, fontFamily: "Roboto_700Bold", color: theme.colors.primary }}>
                    {quantity} लीटर
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 14, fontFamily: "Roboto_500Medium", color: theme.colors.text.primary }}>
                    राशि:
                  </Text>
                  <Text style={{ fontSize: 14, fontFamily: "Roboto_700Bold", color: theme.colors.primary }}>
                    ₹{(parseFloat(quantity || 0) * customer.ratePerLiter).toFixed(2)}
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={handleSaveDelivery}
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 12,
                paddingVertical: 16,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Save color="white" size={20} style={{ marginRight: 8 }} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto_700Bold",
                  color: "white",
                }}
              >
                डिलीवरी सेव करें
              </Text>
            </TouchableOpacity>
          </Card>
        )}
      </ScrollView>
    </KeyboardAvoidingAnimatedView>
  );
}
import { Tabs } from "expo-router";
import { Home, Users, Calendar, User } from "lucide-react-native";
import { useTheme } from "@/utils/theme";

export default function DeliveryTabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBar.background,
          borderTopWidth: 1,
          borderTopColor: theme.colors.tabBar.border,
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        tabBarActiveTintColor: theme.colors.tabBar.active,
        tabBarInactiveTintColor: theme.colors.tabBar.inactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Roboto_400Regular",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "होम",
          tabBarIcon: ({ color, size }) => <Home color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: "ग्राहक",
          tabBarIcon: ({ color, size }) => <Users color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{
          title: "डिलीवरी",
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "प्रोफाइल",
          tabBarIcon: ({ color, size }) => <User color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="customer/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

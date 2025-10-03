import { Tabs } from "expo-router";
import { Home, Users, BarChart3, FileText, Settings } from "lucide-react-native";
import { useTheme } from "@/utils/theme";

export default function OwnerTabLayout() {
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
        name="dashboard"
        options={{
          title: "डैशबोर्ड",
          tabBarIcon: ({ color, size }) => <Home color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="delivery-men"
        options={{
          title: "डिलीवरी मैन",
          tabBarIcon: ({ color, size }) => <Users color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "रिपोर्ट",
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: "ग्राहक",
          tabBarIcon: ({ color, size }) => <FileText color={color} size={20} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "सेटिंग्स",
          tabBarIcon: ({ color, size }) => <Settings color={color} size={20} />,
        }}
      />
    </Tabs>
  );
}
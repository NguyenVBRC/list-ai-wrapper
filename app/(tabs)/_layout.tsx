import { Tabs } from "expo-router";
import {
  BookOpen,
  Chrome as Home,
  Settings,
  ShoppingCart,
} from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF9500",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: -3 },
        },
        headerStyle: {
          shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: { width: 0, height: 1 },
          elevation: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: "Recipe Search",
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <BookOpen color={color} size={size} />
          ),
          headerTitle: "My Recipes",
        }}
      />
      <Tabs.Screen
        name="shopping-list"
        options={{
          title: "Shopping",
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart color={color} size={size} />
          ),
          headerTitle: "Shopping List",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
          headerTitle: "Settings",
        }}
      />
    </Tabs>
  );
}

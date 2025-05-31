import {
  ChevronRight,
  Globe,
  Heart,
  Info,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react-native";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Switch
              trackColor={{ false: "#E5E5EA", true: "#4CD964" }}
              thumbColor={
                Platform.OS === "ios"
                  ? "#FFFFFF"
                  : notifications
                  ? "#FFFFFF"
                  : "#F4F4F4"
              }
              ios_backgroundColor="#E5E5EA"
              onValueChange={() => setNotifications(!notifications)}
              value={notifications}
            />
          </View>

          <View style={[styles.settingItem, styles.settingItemBorder]}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              trackColor={{ false: "#E5E5EA", true: "#4CD964" }}
              thumbColor={
                Platform.OS === "ios"
                  ? "#FFFFFF"
                  : darkMode
                  ? "#FFFFFF"
                  : "#F4F4F4"
              }
              ios_backgroundColor="#E5E5EA"
              onValueChange={() => setDarkMode(!darkMode)}
              value={darkMode}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingRow}>
              <Heart size={20} color="#FF9500" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Favorite Recipes</Text>
            </View>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemBorder]}
          >
            <View style={styles.settingRow}>
              <Globe size={20} color="#FF9500" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>Language</Text>
            </View>
            <View style={styles.settingValue}>
              <Text style={styles.settingValueText}>English</Text>
              <ChevronRight size={20} color="#C7C7CC" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Support</Text>

        <View style={styles.settingsGroup}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingRow}>
              <ShieldCheck
                size={20}
                color="#FF9500"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemBorder]}
          >
            <View style={styles.settingRow}>
              <MessageSquareText
                size={20}
                color="#FF9500"
                style={styles.settingIcon}
              />
              <Text style={styles.settingLabel}>Contact Us</Text>
            </View>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemBorder]}
          >
            <View style={styles.settingRow}>
              <Info size={20} color="#FF9500" style={styles.settingIcon} />
              <Text style={styles.settingLabel}>About</Text>
            </View>
            <ChevronRight size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333333",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  settingsGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingItemBorder: {
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333333",
  },
  settingValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingValueText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#8E8E93",
    marginRight: 4,
  },
  footer: {
    alignItems: "center",
    marginVertical: 32,
  },
  version: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#8E8E93",
  },
});

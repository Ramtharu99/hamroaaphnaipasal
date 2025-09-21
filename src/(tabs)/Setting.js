import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";

import Profile from "../screens/Profile";

const icons = {
  Profile: require("../../assets/images/profile.png"),
};

const settingsTabs = [
  "Store Information",
  "Policies",
  "Marketing & Social",
  "Transactions",
  "Operations",
  "Security",
  "Customization",
  "Promotions",
  "Tickets",
  "Manage Staff",
];

const Setting = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>⚙️ Settings</Text>
        <Pressable onPress={() => navigation.navigate("Profile")}>
          <Image source={icons.Profile} style={styles.profileImage} />
        </Pressable>
      </View>

      {/* Settings Options */}
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {settingsTabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.option}
            onPress={() => navigation.navigate(tab)}
          >
            <Text style={styles.optionText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  option: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default Setting;

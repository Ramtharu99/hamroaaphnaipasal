import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoreInformation from "../screens/StoreInformation";
import Policies from "../screens/Policies";
import MarketingAndSocial from "../screens/MarketingAndSocial";
import Transactions from "../screens/Transactions";
import Operations from "../screens/Operations";
import Security from "../screens/Security";

const settingsTabs = [
  "Store Information",
  "Policies",
  "Marketing & Social",
  "Transactions",
  "Operations",
  "Security",
];

const Setting = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [showDropUp, setShowDropUp] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Store Information":
        return <StoreInformation />;
      case "Policies":
        return <Policies />;
      case "Marketing & Social":
        return <MarketingAndSocial />;
      case "Transactions":
        return <Transactions />;
      case "Operations":
        return <Operations />;
      case "Security":
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {settingsTabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                onPress={() => {
                  setActiveTab(tab);
                  setShowDropUp(true);
                }}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}

            {/* More Tab */}
            <TouchableOpacity
              style={styles.tabButton}
              onPress={() => setShowDropUp(true)}
            >
              <Text style={styles.tabText}>More</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Drop-Up Modal */}
      <Modal
        visible={showDropUp}
        animationType="slide"
        transparent
        onRequestClose={() => setShowDropUp(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropUp(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.dropUpContainer}>
          {/* If a tab is active → show its component */}
          {activeTab ? (
            <>
              <Text style={styles.dropUpTitle}>{activeTab}</Text>
              {renderTabContent()}
            </>
          ) : (
            <>
              <Text style={styles.dropUpTitle}>More Settings</Text>
              {["Customization", "Promotions", "Tickets", "Manage Staff"].map(
                (option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropUpItem}
                    onPress={() => {
                      setActiveTab(option);
                      setShowDropUp(false);
                    }}
                  >
                    <Text style={styles.dropUpText}>{option}</Text>
                  </TouchableOpacity>
                )
              )}
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F7F8FA" 
  },
  tabContainer: { 
    flexDirection: "row", 
    marginBottom: 12, 
    padding: 8 
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  activeTab: { 
    backgroundColor: "#1BB83A", 
    borderColor: "#1BB83A" 
  },
  tabText: { 
    fontSize: 14, 
    color: "#333" 
  },
  activeTabText: { 
    color: "#fff", 
    fontWeight: "bold" 
  },

  overlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.3)" 
  },
  dropUpContainer: {
    backgroundColor: "#EEEEEE",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "70%",
  },
  dropUpTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  },
  dropUpItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropUpText: { 
    fontSize: 15, 
    color: "#333" 
  },
});

export default Setting;

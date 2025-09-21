import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import logout from "../../assets/images/logout.png";

const Profile = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  // Dummy user data
  const user = {
    name: "Sanjog khatri",
    email: "sanjog@example.com",
    phone: "+977 9812345678",
    address: "Kathmandu, Nepal",
    avatar: "https://i.pravatar.cc/150?img=3", 
  };

  const handlerProfileEdit = () => {
    console.log("Profile edit button clicked!")
  }

  const handleLogout = () => {
    console.log("logout successfully!")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header with profile image + name */}
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        {/* Info Section */}
        {/* <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>📱 Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>🏠 Address</Text>
            <Text style={styles.value}>{user.address}</Text>
          </View>
        </View> */}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={handlerProfileEdit}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
            {/* <Image source={logout} style={styles.buttonIcon} /> */}
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7EEE6",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 15,
    color: "#555",
    width: "100%",
  },
  actions: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#1BB83A",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: "#E63946",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Profile;

import React, { useState, useEffect } from 'react';
import {
  BackHandler,
  Alert,
  ScrollView,
  Text,
  RefreshControl,
  View,
  StyleSheet,
} from 'react-native';
import CommerceCard from '../components/CommerceCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import revenue from '../../assets/images/revenue.png';
import order from '../../assets/images/order.png';
import inventory from '../../assets/images/inventory.png';
import customer from '../../assets/images/people.png';
import Product from '../components/Products';

const DashBoard = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Hold on!',
        'Are you sure you want to exit?',
        [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true }
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.heading}>Overview of your e-commerce performance</Text>
        <View style={styles.cardRow}>
          <CommerceCard
            cardColor="#C8E6C9"
            imageSource={revenue}
            title="Total Sales"
            value="$10,000"
            percentage="+5%"
            isNegative={false}
          />
          <CommerceCard
            cardColor="#BBDEFB"
            imageSource={order}
            title="Total Orders"
            value="150"
            percentage="-2%"
            isNegative={true}
          />
        </View>
        <View style={styles.cardRow}>
          <CommerceCard
            cardColor="#FFF9C4"
            imageSource={inventory}
            title="Inventory"
            value="300"
            percentage="+10%"
            isNegative={false}
          />
          <CommerceCard
            cardColor="#F0F4C3"
            imageSource={customer}
            title="Customers"
            value="85%"
            percentage="-5%"
            isNegative={true}
          />
        </View>
        {/* Product Component */}
        <View>
          <Product />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EEE6',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default DashBoard;

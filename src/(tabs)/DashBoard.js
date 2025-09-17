import React, { useState, useEffect } from 'react';
import { BackHandler, Alert, ScrollView, Text, RefreshControl } from 'react-native';
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
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Hold on!',
        'Are you sure you want to exit?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: true }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); 
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#E7EEE6', paddingTop: 16 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 12, fontWeight: 'bold' }}>
          Overview of your e-commerce performance
        </Text>
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
        <CommerceCard
          cardColor="#fff"
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
      </SafeAreaView>
      <Product />
    </ScrollView>
  );
};

export default DashBoard;

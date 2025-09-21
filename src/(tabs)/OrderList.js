import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const orders = [
  {
    id: '1',
    customer: 'John Doe',
    email: 'johndoe@example.com',
    date: '23-11-23',
    status: 'Fulfilled',
    amount: '$25.00',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    email: 'janesmith@example.com',
    date: '23-11-22',
    status: 'Pending',
    amount: '$15.00',
  },
  {
    id: '3',
    customer: 'Robert Johnson',
    email: 'robertj@example.com',
    date: '23-11-21',
    status: 'Processing',
    amount: '$35.00',
  },
  {
    id: '4',
    customer: 'Emily Davis',
    email: 'emilydavis@example.com',
    date: '23-11-20',
    status: 'Fulfilled',
    amount: '$45.00',
  },
  {
    id: '5',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
  {
    id: '6',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
  {
    id: '7',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
  {
    id: '8',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
  {
    id: '9',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
  {
    id: '10',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
  {
    id: '11',
    customer: 'Michael Brown',
    email: 'michaelb@example.com',
    date: '23-11-19',
    status: 'Canceled',
    amount: '$55.00',
  },
];

const getStatusColor = status => {
  switch (status) {
    case 'Fulfilled':
      return '#22c55e';
    case 'Pending':
      return '#facc15';
    case 'Processing':
      return '#3b82f6';
    case 'Canceled':
      return '#ef4444';
    default:
      return '#d1d5db';
  }
};

const OrderItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.orderId}>{item.id}</Text>
    <View style={styles.customer}>
      <Text style={styles.customerName}>{item.customer}</Text>
      <Text style={styles.email}>{item.email.length > 18 ? item.email.slice(0, 8) + "***"  : item.email}</Text>
    </View>
    <Text style={styles.date}>{item.date}</Text>
    <View style={styles.statusContainer}>
      <Text
        style={[
          styles.status,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        {item.status.slice(0, 4)}
      </Text>
    </View>
    <Text style={styles.amount}>{item.amount}</Text>
  </View>
);

const ListHeader = () => (
  <View style={styles.headerRow}>
    <Text style={styles.headerCell}>OrderID</Text>
    <Text style={styles.headerCell}>Customer</Text>
    <Text style={styles.headerCell}>Date</Text>
    <Text style={styles.headerCell}>Status</Text>
    <Text style={[styles.headerCell, { textAlign: 'right' }]}>Amount</Text>
  </View>
);

const OrdersList = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const backAction = () => {
      if(navigation.canGoBack()){
        navigation.goBack();
        return true;
      }
      return false
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => backHandler.remove()
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📦 Recent Orders</Text>
        <Text style={styles.subText}>
          Latest customer orders from your store
        </Text>
      </View>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E7EEE6',
    paddingBottom: 70,
  },
  header: {
    marginBottom: 14,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    marginBottom: 6,
    width: '100%',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#374151',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  orderId: {
    flex: 1,
    fontWeight: 'bold',
    color: '#3b82f6',
    fontSize: 15,
  },
  customer: {
    flex: 2,
    flexDirection: 'column',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
  },
  email: {
    fontSize: 12,
    color: '#6b7280',
  },
  date: {
    flex: 1,
    color: '#374151',
    fontSize: 14,
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
  },
  status: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 12,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
    overflow: 'hidden',
  },
  amount: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#16a34a',
  },
});

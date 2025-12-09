import React, { useState, useEffect } from 'react';
import {
  BackHandler,
  Alert,
  Text,
  View,
  StyleSheet,
  SectionList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ECommerceCard from '../components/CommerceCard';
import CustomHeader from '../components/CustomHeader';
import {
  TOP_PRODUCTS,
  INVENTORY_STATUS,
  TRAFFIC_SOURCES,
  ProductCard,
  InventoryCard,
  TrafficCard,
  styles as productStyles,
} from '../components/Products';
import colors from '../constants/colors';

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
        { cancelable: true },
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const sections = [
    {
      title: '🔥 Top Products',
      subHeader: 'Best selling products this month',
      data: TOP_PRODUCTS,
      type: 'product',
    },
    {
      title: '📦 Inventory Status',
      subHeader: 'Products with low stock levels',
      data: INVENTORY_STATUS,
      type: 'inventory',
    },
    {
      title: '🌏 Traffic Sources',
      subHeader: 'Where your visitors are coming from',
      data: TRAFFIC_SOURCES,
      type: 'traffic',
    },
  ];

  const renderSectionHeader = ({ section: { title, subHeader } }) => (
    <View style={productStyles.sectionHeaderContainer}>
      <Text style={productStyles.header}>{title}</Text>
      <Text style={productStyles.subHeader}>{subHeader}</Text>
    </View>
  );

  const renderItem = ({ item, section }) => {
    switch (section.type) {
      case 'product':
        return <ProductCard {...item} />;
      case 'inventory':
        return <InventoryCard {...item} />;
      case 'traffic':
        return <TrafficCard {...item} />;
      default:
        return null;
    }
  };

  const keyExtractor = (item, index) => item.id || index.toString();

  const ListHeader = () => (
    <View style={styles.listHeaderContainer}>
      <Text style={styles.heading}>
        Overview of your e-commerce performance
      </Text>

      <View style={styles.cardRow}>
        <ECommerceCard
          cardColor="#C8E6C9"
          icon="cash-outline"
          title="Total Sales"
          value="$10,000"
          percentage="+5%"
          isNegative={false}
        />
        <ECommerceCard
          cardColor="#BBDEFB"
          icon="cart-outline"
          title="Total Orders"
          value="150"
          percentage="-2%"
          isNegative={true}
        />
      </View>

      <View style={styles.cardRow}>
        <ECommerceCard
          cardColor="#FFF9C4"
          icon="cube-outline"
          title="Inventory"
          value="300"
          percentage="+10%"
          isNegative={false}
        />
        <ECommerceCard
          cardColor="#F0F4C3"
          icon="people-outline"
          title="Customers"
          value="85%"
          percentage="-5%"
          isNegative={true}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <CustomHeader title="Dashboard" leftType="avatar" />
      <View style={styles.contentContainer}>
        <SectionList
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          stickySectionHeadersEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  listHeaderContainer: {
    marginBottom: 10,
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

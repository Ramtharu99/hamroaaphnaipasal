import React, { useEffect, useState } from 'react';
import SalesLine from '../components/SalesLine';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeeklyRevenue from '../components/WeeklyRevenue';
import { BackHandler, RefreshControl, ScrollView } from 'react-native';

const Analysis = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;  
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E7EEE6', padding: 4 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SalesLine />
        <WeeklyRevenue />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Analysis;

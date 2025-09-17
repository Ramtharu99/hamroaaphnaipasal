import React, { useState } from 'react';
import SalesLine from '../components/SalesLine';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeeklyRevenue from '../components/WeeklyRevenue';
import { RefreshControl, ScrollView } from 'react-native';

const Analysis = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
        setRefreshing(false)
    }, 1500)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E7EEE6', padding: 4 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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

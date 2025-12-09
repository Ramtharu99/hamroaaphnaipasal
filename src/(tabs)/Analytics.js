import React, { useEffect, useState } from 'react';
import SalesLine from '../components/SalesLine';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import WeeklyRevenue from '../components/WeeklyRevenue';
import { BackHandler, RefreshControl, ScrollView, View } from 'react-native';

import colors from '../constants/colors';

const Analysis = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'left', 'right']}>
      <CustomHeader title="Analytics" leftType="avatar" />
      <View style={{ flex: 1, padding: 4 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SalesLine />
          <WeeklyRevenue />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Analysis;

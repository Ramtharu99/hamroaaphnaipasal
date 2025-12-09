import React from 'react';
import { View } from 'react-native';
import TopTabNavigator from './topTabNavigator/TopNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

import colors from '../constants/colors';

const Products = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      edges={['top', 'left', 'right']}>
      <CustomHeader title="Products" leftType="avatar" />
      <View style={{ flex: 1 }}>
        <TopTabNavigator />
      </View>
    </SafeAreaView>
  );
};

export default Products;

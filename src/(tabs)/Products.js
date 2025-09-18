import React from 'react';
import TopTabNavigator from './topTabNavigator/TopNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

const Products = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    > 
      <TopTabNavigator />
    </SafeAreaView>
  );
};

export default Products;

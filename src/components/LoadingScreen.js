import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import logo from '../../assets/images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoaderScreen = ({ navigation }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const widthInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    const anim = Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    });

    anim.start(async() => {

      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        navigation.replace('DashBoard'); 
        
      }else{
        navigation.replace('Role'); 
      }
    });

    return () => anim.stop();
  }, [animation, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.title}>Hamro Aaphnai Pasal</Text>

      <View style={styles.loaderWrapper}>
        <View style={styles.loaderBackground}>
          <Animated.View
            style={[
              styles.loaderFill,
              { width: widthInterpolate },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7EEE6',
    paddingHorizontal: 20,
  },
  logo: {
    width: 143,
    height: 64,
  },
  title: {
    fontSize: 28,
    marginTop: 32,
    color: '#062534',
    fontWeight: '600',
    textAlign: 'center',
  },
  loaderWrapper: {
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  loaderBackground: {
    width: 330,
    height: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#1BB83A',
  },
});

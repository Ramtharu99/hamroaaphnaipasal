import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');
const chartHeight = 220;
const barWidth = 30;

const SalesOverview = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animatedValues = useRef(
    Array(12)
      .fill(0)
      .map(() => new Animated.Value(0)),
  ).current;

  const monthlySalesData = [
    4000, 3000, 5000, 4500, 4000, 6000, 5500, 6500, 7000, 7500, 8000, 8500,
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animate bars sequentially
    animatedValues.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: monthlySalesData[index],
        duration: 800,
        delay: index * 100,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  const maxValue = Math.max(...monthlySalesData);

  return (
    <Animated.View style={[styles.chartContainer, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Sales Overview</Text>
      <Text style={styles.subtitle}>
        Monthly sales performance showing growth trends
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chart}>
          {monthlySalesData.map((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            return (
              <View key={index} style={styles.barWrapper}>
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      height: animatedValues[index].interpolate({
                        inputRange: [0, maxValue],
                        outputRange: [0, barHeight],
                      }),
                    },
                  ]}
                >
                  <Text style={styles.barLabel}>
                    ${(value / 1000).toFixed(1)}k
                  </Text>
                </Animated.View>
                <Text style={styles.barMonth}>
                  {
                    [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ][index]
                  }
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default SalesOverview;

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 20,
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#10B981',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: chartHeight,
    paddingBottom: 20,
  },
  barWrapper: {
    width: barWidth,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  bar: {
    width: barWidth,
    backgroundColor: '#10B981',
    borderRadius: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  barMonth: {
    marginTop: 6,
    fontSize: 12,
    color: '#065F46',
    fontWeight: '500',
  },
});

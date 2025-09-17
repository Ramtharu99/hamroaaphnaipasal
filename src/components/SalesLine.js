import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const chartHeight = 200;
const chartWidth = width - 40;

const SalesOverview = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const monthlySalesData = [
    4000, 3000, 5000, 4500, 4000, 6000, 5500, 6500, 7000, 7500, 8000, 8500,
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const maxValue = Math.max(...monthlySalesData);

  return (
    <Animated.View style={[styles.chartContainer, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Sales Overview</Text>
      <Text style={styles.subtitle}>
        Monthly sales performance showing growth trends
      </Text>

      <View style={styles.chart}>
        {monthlySalesData.map((value, index) => {
          const barHeight = (value / maxValue) * chartHeight;
          return (
            <Animated.View
              key={index}
              style={[
                styles.bar,
                {
                  height: barHeight,
                  transform: [
                    {
                      scaleY: fadeAnim,
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.barLabel}>${value / 1000}k</Text>
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.labels}>
        {[
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
        ].map((label, index) => (
          <Text key={index} style={styles.labelText}>
            {label}
          </Text>
        ))}
      </View>
    </Animated.View>
  );
};

export default SalesOverview;


const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 20,
    backgroundColor: '#E7EEE6',
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: chartHeight,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bar: {
    width: chartWidth / 15,
    backgroundColor: 'rgba(0,128,0,0.7)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 2,
  },
  barLabel: {
    fontSize: 10,
    color: '#fff',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 10,
    color: '#666',
  },
});



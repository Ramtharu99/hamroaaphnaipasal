import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';

const WeeklyRevenuePie = ({ navigation }) => {
  const weeklyRevenueData = [
    { day: 'Mon', value: 2500, color: '#f87171' },
    { day: 'Tue', value: 1000, color: '#34d399' },
    { day: 'Wed', value: 1000, color: '#60a5fa' },
    { day: 'Thu', value: 400, color: '#fbbf24' },
    { day: 'Fri', value: 500, color: '#a78bfa' },
    { day: 'Sat', value: 450, color: '#f472b6' },
    { day: 'Sun', value: 4800, color: '#facc15' },
  ];

  const totalValue = weeklyRevenueData.reduce(
    (acc, item) => acc + item.value,
    0,
  );

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Revenue Pie Chart</Text>
      <Text style={styles.subtitle}>Revenue distribution per day</Text>

      {/* Pie chart as a donut */}
      <View style={styles.pieWrapper}>
        {weeklyRevenueData.map((item, index) => {
          const angle = (item.value / totalValue) * 360;
          return (
            <View
              key={index}
              style={[
                styles.pieSlice,
                {
                  backgroundColor: item.color,
                  transform: [{ rotate: `${angle * index}deg` }],
                },
              ]}
            />
          );
        })}
        <View style={styles.pieCenter} />
      </View>

      {/* Labels */}
      <View style={styles.labelsContainer}>
        {weeklyRevenueData.map((item, index) => (
          <View key={index} style={styles.labelRow}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={styles.labelText}>
              {item.day}: {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 20 },

  pieWrapper: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  pieSlice: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  pieCenter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    position: 'absolute',
  },

  labelsContainer: {
    marginTop: 10,
  },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  colorBox: { width: 16, height: 16, marginRight: 6, borderRadius: 4 },
  labelText: { fontSize: 14, color: '#111827' },
});

export default WeeklyRevenuePie;

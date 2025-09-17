import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const chartHeight = 200;

const WeeklyRevenue = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const weeklyRevenueData = [2500, 1000, 1000, 400, 500, 450, 4800];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxValue = Math.max(...weeklyRevenueData);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.title}>Weekly Revenue</Text>
      <Text style={styles.subtitle}>
        Revenue breakdown by day of the week
      </Text>

      <View style={styles.chart}>
        {weeklyRevenueData.map((value, index) => {
          const barHeight = (value / maxValue) * chartHeight;
          return (
            <View key={index} style={styles.barWrapper}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    height: barHeight,
                    transform: [{ scaleY: fadeAnim }],
                  },
                ]}
              />
              <Text style={styles.label}>{labels[index]}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 20,
    backgroundColor: "#E7EEE6",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: chartHeight,
    width: "100%",
    alignSelf: "center",
  },
  barWrapper: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    marginHorizontal: 2,
  },
  bar: {
    width: 20,
    backgroundColor: "rgba(0,128,0,0.7)",
    borderRadius: 6,
  },
  label: {
    marginTop: 5,
    fontSize: 10,
    color: "#666",
  },
});

export default WeeklyRevenue;

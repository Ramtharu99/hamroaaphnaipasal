// WeeklyRevenueLineChart.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { CartesianChart, Line, StackedArea } from 'victory-native';
import { LinearGradient, vec } from '@shopify/react-native-skia';

const WeeklyRevenueLineChart = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const weeklyRevenueData = [
    { day: 'Mon', revenue: 2500 },
    { day: 'Tue', revenue: 1000 },
    { day: 'Wed', revenue: 1000 },
    { day: 'Thu', revenue: 400 },
    { day: 'Fri', revenue: 500 },
    { day: 'Sat', revenue: 450 },
    { day: 'Sun', revenue: 4800 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Revenue</Text>
      <Text style={styles.subtitle}>Revenue distribution per day</Text>

      {/* IMPORTANT: this wrapper must be position: 'relative' so absolute overlays align */}
      <View style={{ height: 320, marginVertical: 20, position: 'relative' }}>
        <CartesianChart
          data={weeklyRevenueData}
          xKey="day"
          yKeys={['revenue']}
          padding={20}
          domainPadding={{ top: 10 }}
          xAxis={{ lineWidth: 0, labelOffset: 6 }}
          yAxis={[{ lineWidth: 1, labelOffset: 6 }]}
        >
          {({ points, chartBounds }) => {
            const pts = points.revenue || [];

            return (
              <>
                {/* Gradient filled area under the line */}
                <StackedArea
                  points={[pts]}
                  y0={chartBounds.bottom}
                  curveType="natural"
                  animate={{ type: 'spring', stiffness: 100 }}
                  areaOptions={() => ({
                    // Single area, children is a Skia gradient used to fill area
                    children: (
                      <LinearGradient
                        start={vec(0, chartBounds.top)}
                        end={vec(0, chartBounds.bottom)}
                        colors={['#56aefb', '#56aefb20']}
                      />
                    ),
                  })}
                />

                {/* Line stroke on top */}
                <Line
                  points={pts}
                  stroke="#2563eb"
                  strokeWidth={3}
                  curveType="natural"
                  animate={{ type: 'spring', stiffness: 100 }}
                />

                {/* Transparent pressable hotspots — one per point */}
                {pts.map((p, i) => (
                  <Pressable
                    key={`pt-${i}`}
                    onPress={() =>
                      setSelectedIndex(prev => (prev === i ? null : i))
                    }
                    style={{
                      position: 'absolute',
                      left: p.x - 16,
                      top: p.y - 16,
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                    }}
                  />
                ))}

                {/* Dot marker + tooltip */}
                {selectedIndex !== null && pts[selectedIndex] && (
                  <>
                    {/* marker */}
                    <View
                      pointerEvents="none"
                      style={[
                        styles.marker,
                        {
                          left: pts[selectedIndex].x - 6,
                          top: pts[selectedIndex].y - 6,
                        },
                      ]}
                    />

                    {/* tooltip */}
                    <View
                      pointerEvents="none"
                      style={[
                        styles.tooltip,
                        {
                          left: Math.max(4, pts[selectedIndex].x - 44),
                          top: pts[selectedIndex].y - 60,
                        },
                      ]}
                    >
                      <Text style={styles.tooltipDay}>
                        {weeklyRevenueData[selectedIndex].day}
                      </Text>
                      <Text style={styles.tooltipValue}>
                        ₹
                        {weeklyRevenueData[
                          selectedIndex
                        ].revenue.toLocaleString()}
                      </Text>
                    </View>
                  </>
                )}
              </>
            );
          }}
        </CartesianChart>
      </View>
    </View>
  );
};

export default WeeklyRevenueLineChart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  subtitle: { fontSize: 12, color: '#666', marginBottom: 10 },

  tooltip: {
    position: 'absolute',
    backgroundColor: '#111827',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 88,
  },
  tooltipText: { color: '#fff', fontSize: 12 },
  tooltipDay: { color: '#fff', fontSize: 11, opacity: 0.9 },
  tooltipValue: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },

  marker: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2563eb',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
});

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';

const ProductCard = ({ title, value, change, sold }) => (
  <View style={styles.card}>
    <View style={styles.row}>

      {/* Left column */}
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sold}>{sold}</Text>
      </View>
      
      {/* Right column */}
      <View style={styles.rightColumn}>
        <Text style={styles.value}>{value}</Text>
        <Text style={change < 0 ? styles.negative : styles.positive}>
          {change}%
        </Text>
      </View>
    </View>
  </View>
);

// Inventory Card
const InventoryCard = ({ title, current, target }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const percent = Math.min(current / target, 1);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percent,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progress,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.percentText}>{current}/{target}</Text>
      </View>
      <Text style={styles.percentLabel}>{Math.round(percent * 100)}% of target</Text>
    </View>
  );
};

// Traffic Card
const TrafficCard = ({ source, visitors, percentage }) => {
  const progress = useRef(new Animated.Value(0)).current;
  const percent = Math.min(percentage / 100, 1);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percent,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [percent]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{source}</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.trafficProgress,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.percentText}>{percentage}%</Text>
      </View>
      <Text style={styles.percentLabel}>{visitors} visitors</Text>
    </View>
  );
};

const Products = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Top Products</Text>
        <Text>Best selling products this month</Text>
        <ProductCard
          title="Wireless Headphones"
          value="$12,540"
          change={15}
          sold="1254 sold"
        />
        <ProductCard
          title="Smart Watch"
          value="$9,820"
          change={8}
          sold="982 sold"
        />
        <ProductCard
          title="Bluetooth Speaker"
          value="$7,540"
          change={12}
          sold="754 sold"
        />
        <ProductCard
          title="Fitness Tracker"
          value="$6,210"
          change={5}
          sold="621 sold"
        />
        <ProductCard
          title="USB-C Charger"
          value="$2,710"
          change={3}
          sold="543 sold"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Inventory Status</Text>
        <Text>Products with low stock levels</Text>
        <InventoryCard title="Wireless Earbuds" current={12} target={50} />
        <InventoryCard title="Phone Case" current={8} target={30} />
        <InventoryCard title="Screen Protector" current={5} target={20} />
        <InventoryCard title="Charging Cable" current={15} target={40} />
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Traffic Sources</Text>
        <Text>Where your visitors are coming from</Text>
        <TrafficCard source="Direct" visitors="12,345" percentage={40} />
        <TrafficCard source="Organic Search" visitors="9,876" percentage={30} />
        <TrafficCard source="Social Media" visitors="6,789" percentage={20} />
        <TrafficCard source="Referral" visitors="3,456" percentage={10} />
      </View>
    </ScrollView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#E7EEE6',
    paddingBottom: 80 
  },
  section: { 
    marginBottom: 20,
  },
  header: {
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  card: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: { 
    flexDirection: 'column', 
    alignItems: 'flex-start', 
    flex: 1 
  },
  rightColumn: { 
    flexDirection: 'column', 
    alignItems: 'flex-end' 
  },
  title: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  sold: { 
    color: '#666', 
    fontSize: 14 
  },
  value: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  positive: { 
    color: 'green', 
    backgroundColor: "#C8E6C9",
    fontSize: 14, 
    padding: 1.5
  },
  negative: { 
    color: 'red',
    backgroundColor: "#FFCDD2",
    fontSize: 14,
    padding: 2
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
    marginRight: 8,
  },
  progress: {
    height: 8,
    backgroundColor: '#1BB83A',
    borderRadius: 4,
  },
  trafficProgress: {
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  percentText: {
    fontSize: 12,
    color: '#666',
    minWidth: 40,
    textAlign: 'right',
  },
  percentLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});


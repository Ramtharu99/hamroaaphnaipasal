import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ECommerceCard = ({
  cardColor,
  imageSource,
  title,
  value,
  percentage,
  isNegative,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: cardColor || '#fff' }]}>
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <Image source={imageSource} style={styles.image} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text
        style={[
          styles.percentage,
          isNegative ? styles.negative : styles.positive,
        ]}
      >
        {percentage}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: '#1BB83A',
    fontWeight: '600',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  percentage: {
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  positive: {
    color: '#2ecc71',
  },
  negative: {
    color: '#e74c3c',
  },
});

export default ECommerceCard;

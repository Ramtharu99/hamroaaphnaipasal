import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ECommerceCard = ({
  cardColor,
  icon,
  title,
  value,
  percentage,
  isNegative,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: cardColor || '#fff' }]}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        <View
          style={[
            styles.iconWrapper,
            {
              backgroundColor: isNegative
                ? 'rgba(229, 57, 53, 0.12)'
                : 'rgba(27, 184, 58, 0.12)',
            },
          ]}
        >
          <Icon
            name={icon}
            size={25}
            color={isNegative ? '#E53935' : '#1BB83A'}
          />
        </View>
      </View>

      {/* Value */}
      <Text style={styles.value}>{value}</Text>

      {/* Percentage Badge */}
      <View
        style={[
          styles.badge,
          isNegative ? styles.negativeBadge : styles.positiveBadge,
        ]}
      >
        <Text style={isNegative ? styles.negative : styles.positive}>
          {percentage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    width: '48%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#111',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  positiveBadge: {
    backgroundColor: '#C8E6C9',
  },
  negativeBadge: {
    backgroundColor: '#FFCDD2',
  },
  positive: {
    color: '#1BB83A',
    fontSize: 13,
    fontWeight: '600',
  },
  negative: {
    color: '#E53935',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default ECommerceCard;

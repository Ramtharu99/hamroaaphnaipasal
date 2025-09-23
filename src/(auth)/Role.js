import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// assets
import admin from '../../assets/images/admin.png';
import people from '../../assets/images/people.png';
import forward from '../../assets/images/forward.png';

const Role = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { id: 1, label: 'Owner', icon: admin },
    { id: 2, label: 'Staff', icon: people },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Choose your account type to continue
        </Text>
        <Text style={styles.selectText}>Select your role</Text>

        {/* Roles container */}
        <View style={styles.rolesContainer}>
          {roles.map(role => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleBox,
                selectedRole === role.id && styles.roleSelected,
              ]}
              onPress={() => setSelectedRole(role.id)}
              activeOpacity={0.8}
            >
              <Image source={role.icon} style={styles.roleIcon} />
              <Text style={styles.roleLabel}>{role.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={[
            styles.continueBtn,
            !selectedRole && styles.continueBtnDisabled,
          ]}
          disabled={!selectedRole}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Continue</Text>
          <Image source={forward} style={styles.forwardIcon} />
        </TouchableOpacity>

        {/* Footer link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account? {' '}
            <Text
              style={styles.signupText}
              onPress={() => navigation.push('SignUp')}
            >
              Signup here{' '}
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EEE6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 18,
    textAlign: 'center',
  },
  selectText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 18,
    color: '#111',
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  roleBox: {
    flex: 1,
    height: 108,
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  roleSelected: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  roleIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  roleLabel: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  continueBtnDisabled: {
    backgroundColor: '#A7F3D0',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  forwardIcon: {
    height: 25,
    width: 25,
    tintColor: '#fff',
    resizeMode: 'contain',
  },
  footer: {
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#374151',
  },
  signupText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
});

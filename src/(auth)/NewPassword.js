import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Checkbox from 'expo-checkbox';

// assets
import back from '../../assets/images/back.png';
import eye from '../../assets/images/eye.png';
import eyeOff from '../../assets/images/eye-off.png';
import { updatePassword } from '../store/api';

const SetNewPassword = ({ navigation, route }) => {
  const { email, code } = route.params;

  const initialValues = { newPassword: '', confirmPassword: '' };
  const [form, setForm] = useState(initialValues);
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = field => value => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { newPassword, confirmPassword } = form;

    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!isChecked) {
      setError('Confirm you are not a robot');
      setLoading(false);
      return;
    }

    try {
      const payload = { email, code, newPassword };
      const result = await updatePassword(payload);

      if (result.success) {
        navigation.navigate('Role');
        setLoading(false);
      } else {
        setError('Invalid credential');
        setLoading(false);
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter strong password</Text>

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Image source={back} style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to login </Text>
        </TouchableOpacity>

        {/* New Password */}
        <View style={styles.inputContainer}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="New password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              value={form.newPassword}
              onChangeText={handleChange('newPassword')}
              style={[styles.inputField, error && { borderColor: 'red' }]}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Image
                source={showPassword ? eye : eyeOff}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirm password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showConfirmPassword}
              value={form.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              style={[styles.inputField, error && { borderColor: 'red' }]}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(prev => !prev)}
            >
              <Image
                source={showConfirmPassword ? eye : eyeOff}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? '#1BB83A' : undefined}
          />
          <Text style={styles.rememberText}>I am not a robot</Text>
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.continueBtn} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : (
            <Text style={styles.continueText}>Reset Password</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}> Signup here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SetNewPassword;

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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 18,
    textAlign: 'center',
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backIcon: { height: 18, width: 18, tintColor: '#6B7280' },
  backButtonText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderLeftWidth: 5,
    borderLeftColor: '#DC2626',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: { width: '100%', marginBottom: 10 },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  label: { fontSize: 14, color: '#000', marginVertical: 10 },
  inputField: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 15,
    borderColor: '#1BB83A',
    borderWidth: 1,
    width: '100%',
    paddingRight: 40,
    color: '#000',
  },
  eyeButton: { position: 'absolute', right: 12, top: 12 },
  eyeIcon: {
    width: 25,
    height: 25,
    tintColor: '#6B7280',
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  rememberText: { fontSize: 12, color: '#000', marginLeft: 8 },
  continueBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1BB83A',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  continueText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 4,
  },
  footerText: { fontSize: 14, color: '#374151' },
  signupText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
});

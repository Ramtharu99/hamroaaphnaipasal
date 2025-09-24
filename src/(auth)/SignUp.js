// SignUp.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import back from '../../assets/images/back.png';
import { registerUser } from '../store/api';
import google from '../../assets/images/google.png';
import eye from '../../assets/images/eye.png';
import eyeOff from '../../assets/images/eye-off.png';

const SignUp = ({ navigation }) => {
  const [form, setForm] = useState({
    site_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaChecked: false,
    accept_term: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = field => value => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.site_name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!form.captchaChecked) {
      Alert.alert('Error', 'Please verify you are not a robot');
      return;
    }
    if (!form.accept_term) {
      Alert.alert('Error', 'You must accept the terms and conditions');
      return;
    }

    const payload = {
      site_name: form.site_name,
      email: form.email,
      password: form.password,
      accept_term: form.accept_term,
    };

    setLoading(true);

    try {
      const result = await registerUser(payload);
      if (result.success) {
        console.log("Success", result.message)
        Alert.alert("Success", result.message)
        navigation.navigate('Role');
      } else {
        console.log("Error", result.message)
        Alert.alert('Signup Failed', result.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Signup error:', err);
      Alert.alert('Signup Failed', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoodleSignup = () => {

  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Sign up to your Store Owner account</Text>

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Image source={back} style={styles.backIcon} />
          <Text style={styles.backButtonText}>Back to sign in</Text>
        </TouchableOpacity>

        {/* Site Name */}
        <Text style={styles.label}>Site Name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Your site name"
          placeholderTextColor="gray"
          value={form.site_name}
          onChangeText={handleChange('site_name')}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="example@gmail.com"
          placeholderTextColor="gray"
          value={form.email}
          onChangeText={handleChange('email')}
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.inputField, { color: '#000' }]}
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={handleChange('password')}
            placeholder="**********"
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Image
              source={showPassword ? eye : eyeOff}
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.inputField, { color: '#000' }]}
            secureTextEntry={!showConfirmPassword}
            value={form.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            placeholder="**********"
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(prev => !prev)}
          >
            <Image
              source={showConfirmPassword ? eye : eyeOff}
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </View>

        {/* Captcha */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={form.captchaChecked}
            onValueChange={handleChange('captchaChecked')}
            color={form.captchaChecked ? '#1BB83A' : undefined}
          />
          <Text style={styles.checkboxText}>I am not a robot</Text>
        </View>

        {/* Terms */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={form.accept_term}
            onValueChange={handleChange('accept_term')}
            color={form.accept_term ? '#1BB83A' : undefined}
          />
          <Text style={styles.checkboxText}>
            I agree to the{' '}
            <Text style={{ textDecorationLine: 'underline' }}>
              terms and conditions
            </Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="gray" />
          ) : (
            <Text style={styles.continueText}>Sign Up</Text>
          )}
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={handleGoodleSignup}
          >
            <Image
              source={google}
              style={{ width: 25, height: 25, marginRight: 10 }}
              resizeMode="contain"
            />
            <Text style={styles.socialText}>Sign up with Google</Text>
          </TouchableOpacity>
        </View>

        {/* footer link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signupText}>Sign In here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D9D9D9',
  },
  dividerText: {
    fontSize: 12,
    color: '#6B7280',
    marginHorizontal: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backIcon: { width: 18, height: 18, tintColor: '#6B7280' },
  backButtonText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  label: { fontSize: 14, color: '#000', marginVertical: 8 },
  inputField: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 15,
    borderColor: '#1BB83A',
    borderWidth: 1,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  eyeButton: { position: 'absolute', right: 12, top: 12 },
  continueBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1BB83A',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  continueText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
    flexWrap: 'wrap',
    flex: 1,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    gap: 5,
    borderWidth: 1,
    borderColor: '#1BB83A',
  },
  socialText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#374151',
  },
  signupText: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
});

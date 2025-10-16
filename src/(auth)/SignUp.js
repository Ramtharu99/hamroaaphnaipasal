import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import google from '../../assets/images/google.png';
import { registerUser } from '../store/api';
import { useRoute } from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { googleClientId } from '../store/config';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUp = ({ navigation }) => {
  const router = useRoute();
  const selectedRole = router.params?.role;

  const [form, setForm] = useState({
    site_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaChecked: false,
    accept_term: false,
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = field => value => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !form.site_name ||
      !form.email ||
      !form.password
    ) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!form.captchaChecked) {
      setError('Please verify you are not a robot');
      setLoading(false);
      return;
    }
    if (!form.accept_term) {
      setError('You must accept the terms and conditions');
      setLoading(false);
      return;
    }

    const payload = {
      site_name: form.site_name,
      email: form.email,
      password: form.password,
      accept_term: form.accept_term,
      role: selectedRole === 1 ? 'Owner' : selectedRole === 2 ? 'Staff' : null,
    };

    try {
      const result = await registerUser(payload);
      if (result.success) {
        navigation.navigate('Role');
        setLoading(false)
      } else {
        setError(result.message || 'Invalid credential');
        setLoading(false)
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleClientId.clientId,
      offlineAccess: false,
    });
  }, []);

  const handleGoogleSignup = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices({
    //     showPlayServicesUpdateDialog: true,
    //   });

    //   const userInfo = await GoogleSignin.signIn();

    //   const email = userInfo.user.email;
    //   const password = userInfo.user.id;

    //   const roleLabel =
    //     selectedRole === 1 ? 'Owner' : selectedRole === 2 ? 'Staff' : null;

    //   const payload = {
    //     site_name: email,
    //     email,
    //     password,
    //     accept_term: true,
    //     role: roleLabel,
    //   };

    //   const result = await registerUser(payload);

    //   if (result.success) {
    //     setError('');
    //     navigation.navigate('Role');
    //   } else {
    //     setError(result.message || 'Google sign-up failed');
    //   }
    // } catch (error) {
    //   console.log('Google Sign-Up Error:', error);
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     setError('Google sign-up cancelled by user');
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     setError('Google sign-up already in progress');
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     setError('Google Play Services not available or outdated');
    //   } else {
    //     setError('Google sign-up failed');
    //   }
    // }

    Alert.alert('Info', 'Google sign-up is currently disabled in the demo app.');
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
          <Icon name="arrow-left" size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back to sign in</Text>
        </TouchableOpacity>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          {/* Site Name */}
          <Text style={styles.label}>Site Name</Text>
          <TextInput
            style={[styles.inputField, error && { borderColor: 'red' }]}
            placeholder="Your site name"
            placeholderTextColor="gray"
            value={form.site_name}
            onChangeText={handleChange('site_name')}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.inputField, error && { borderColor: 'red' }]}
            placeholder="example@gmail.com"
            placeholderTextColor="gray"
            value={form.email}
            onChangeText={handleChange('email')}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.inputField, error && { borderColor: 'red' }]}
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
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          {/* <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.inputField, error && { borderColor: 'red' }]}
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
                style={{ height: 25, width: 25, tintColor: '#6B7280' }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View> */}

          {/* Captcha */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={form.captchaChecked}
              onValueChange={handleChange('captchaChecked')}
              color={form.captchaChecked ? '#1BB83A' : undefined}
              style={{ height: 20, width: 20 }}
            />
            <Text style={styles.checkboxText}>I am not a robot</Text>
          </View>

          {/* Terms */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={form.accept_term}
              onValueChange={handleChange('accept_term')}
              color={form.accept_term ? '#1BB83A' : undefined}
              style={{ height: 20, width: 20 }}
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
            style={[styles.continueBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.continueText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialBtn, googleLoading && { opacity: 0.7 }]}
              onPress={handleGoogleSignup}
            >
              <Image
                source={google}
                style={{ width: 25, height: 25, marginRight: 5 }}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signupText}>Sign In here</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
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
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
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
    width: '100%',
    color: '#000',
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
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  continueText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    width: '100%',
  },
  checkboxText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 8,
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
    marginTop: 18,
    marginBottom: 4,
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

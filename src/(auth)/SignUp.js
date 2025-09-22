import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import back from '../../assets/images/back.png';
import google from '../../assets/images/google.png';
import eye from '../../assets/images/eye.png';
import eyeOff from '../../assets/images/eye-off.png';
import { registerUser } from '../store/api';

const SignUp = ({ navigation }) => {
  const initialValue = {
    sitename: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaChecked: false,
    acceptTerms: false,   
  };

  const [form, setForm] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = field => value => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.sitename ||
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
    if (!form.acceptTerms) {
      Alert.alert('Error', 'You must accept the terms and conditions');
      return;
    }

    const payload = {
      site_name: form.sitename.concat('.hamroaaphnaipasl.com'),
      email: form.email,
      password: form.password,
      accept_term: true, 
    };

    console.log('Signup payload:', payload);
    setLoading(true);

    try {
      const result = await registerUser(payload);
      console.log('Signup response:', result);

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('SignIn') },
      ]);
    } catch (err) {
      console.log('Signup error:', err);
      let errorMessage = 'Signup failed';
      if (err && err.message) errorMessage = err.message;
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Sign up to your Store Owner account</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Image
            source={back}
            style={{ height: 18, width: 18, tintColor: '#6B7280' }}
          />
          <Text style={styles.backButtonText}>Back to sign in</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          {/* Site Name */}
          <Text style={styles.label}>Site Name</Text>
          <TextInput
            placeholder="Your site name"
            style={styles.inputField}
            placeholderTextColor="gray"
            value={form.sitename}
            onChangeText={handleChange('sitename')}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            style={styles.inputField}
            value={form.email}
            placeholderTextColor="gray"
            onChangeText={handleChange('email')}
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="**********"
              style={[styles.inputField, { color: '#000' }]}
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={handleChange('password')}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Image
                source={showPassword ? eye : eyeOff}
                style={{ width: 25, height: 25 }}
                tintColor="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="**********"
              style={[styles.inputField, { color: '#000' }]}
              secureTextEntry={!showConfirmPassword}
              value={form.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(prev => !prev)}
            >
              <Image
                source={showConfirmPassword ? eye : eyeOff}
                style={{ width: 25, height: 25 }}
                tintColor="#6B7280"
              />
            </TouchableOpacity>
          </View>

          {/* Captcha Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={form.captchaChecked}
              onValueChange={handleChange('captchaChecked')}
              color={form.captchaChecked ? '#1BB83A' : undefined}
            />
            <Text style={styles.checkboxText}>I am not a robot</Text>
          </View>

          {/* Terms & Conditions Checkbox */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={form.acceptTerms}
              onValueChange={handleChange('acceptTerms')}
              color={form.acceptTerms ? '#1BB83A' : undefined}
            />
            <Text style={styles.checkboxText}>
              I agree to the{' '}
              <Text
                style={{ textDecorationLine: 'underline' }}
              >
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

          {/* Google Sign Up */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialBtn}>
              <Image
                source={google}
                style={{ height: 25, width: 25 }}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signupText}>SignIn here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

// Styles remain unchanged
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
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  inputContainer: { width: '100%', marginBottom: 10 },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  label: { fontSize: 14, color: '#000', marginVertical: 8 },
  inputField: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 15,
    borderColor: '#1BB83A',
    borderWidth: 1,
    width: '100%',
    paddingRight: 40,
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
  socialText: { fontSize: 14, color: '#374151', fontWeight: '600' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 4,
    flex: 1,
    flexWrap: 'wrap',
  },
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

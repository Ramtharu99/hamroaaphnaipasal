import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import back from '../../assets/images/back.png';
import { requestPasswordReset } from '../store/api';

const ForgotPassword = ({ navigation }) => {
  const initialValue = { email: '' };
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState(initialValue);

  const handleChange = field => value => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const sendOtp = async () => {
    if (!form.email) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    if (!isChecked) {
      Alert.alert('Error', 'Please confirm you are not a robot');
      return;
    }

    try {
      const payload = { email: form.email, captchaChecked: isChecked };
      const result = await requestPasswordReset(payload);

      console.log('Password reset request result:', result);

      if (result.success) {
        Alert.alert('Success', 'OTP sent to your email!', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('VerifyOtp', { email: form.email }),
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subTitle}>Enter valid email to receive OTP</Text>

        {/* back button */}
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

        {/* input field */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            value={form.email}
            onChangeText={handleChange('email')}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* checkbox */}
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? '#1BB83A' : undefined}
            />
            <Text style={styles.robotText}>I am not a robot</Text>
          </View>

          <TouchableOpacity style={styles.resetPassword} onPress={sendOtp}>
            <Text style={styles.resetText}>Reset password</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity
              style={{ flexShrink: 1 }}
              onPress={() => navigation.navigate('SignUp')}
            >
              <Text style={styles.footerLink}> Signup here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E7EEE6',
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
  subTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: 'bold',
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
  backButtonText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
    color: '#000',
  },
  label: { fontSize: 14, color: '#000' },
  inputField: {
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    fontSize: 15,
    borderColor: '#1BB83A',
    borderWidth: 1,
    width: '100%',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
  },
  resetPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1BB83A',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    marginTop: 10,
    marginBottom: 16,
  },
  resetText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  footerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: { fontSize: 14, color: '#374151', flexShrink: 1 },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    flexShrink: 1,
    flexWrap: 'wrap',
    textDecorationLine: 'underline',
  },
  robotText: { fontSize: 12, color: '#000', marginLeft: 4 },
});

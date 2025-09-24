import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import { useState, useRef } from 'react';
import back from '../../assets/images/back.png';
import { verifyOTP } from '../store/api';
import { useRoute } from '@react-navigation/native';

const VerifyOtp = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const route = useRoute();

  const handleSubmit = async () => {
    const otpCode = otp.join('').trim();
    const email = route.params.email?.trim().toLowerCase();

    if (!email) {
      Alert.alert('Error', 'Email not found. Go back and try again.');
      return;
    }

    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter all 6 digits of the OTP');
      return;
    }

    try {
      console.log('Verifying OTP for email:', email, 'with code:', otpCode);
      const payload = { email, code: Number(otpCode) };
      const result = await verifyOTP(payload);
      console.log('OTP verification result:', result);

      if (result.success) {
        Alert.alert('Success', 'OTP verified successfully!', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('SetNewPassword', {
                email,
                code: Number(otpCode),
              }),
          },
        ]);
      } else {
        Alert.alert('Error', result.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      Alert.alert('Error', error.message || 'OTP verification failed');
    }
  };

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < otp.length - 1) inputRefs.current[index + 1].focus();
      if (!text && index > 0) inputRefs.current[index - 1].focus();
    }
  };

  const resendOtp = () => {
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subTitle}>
          Enter the 6-digit OTP sent to your email
        </Text>

        {/* Back button */}
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

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={text => handleChange(text, index)}
              placeholder="0"
              placeholderTextColor="gray"
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit}>
          <Text style={styles.verifyText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive OTP? </Text>
          <TouchableOpacity onPress={resendOtp}>
            <Text style={styles.footerLink}> Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOtp;

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
  subTitle: {
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
    marginBottom: 32,
  },
  backButtonText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 50,
    borderWidth: 1,
    borderColor: '#1BB83A',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#1BB83A',
    paddingVertical: 14,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
  },
  verifyText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { fontSize: 14, color: '#374151' },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

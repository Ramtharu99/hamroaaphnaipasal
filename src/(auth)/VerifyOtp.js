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

const VerifyOtp = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleSubmit = async () => {
    if (!otp) {
      Alert.alert('Error', 'Enter otp');
    }

    const payload = {
      otp,
    };
    console.log('OTP code', payload);
    try {
      const result = await verifyOTP(payload);
      console.log('OTP verified', result);
      Alert.alert('Success', 'OTP verified', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Ok', onPress: () => navigation.navigate('NewPassword') },
      ]);
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Error', 'verification failed');
    }
  };

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      setFieldValue('otp', newOtp.join(''));

      if (text && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
      if (!text && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const resendotp = () => {
    console.log("Resend OTP")
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subTitle}>
          Enter the 6-digit OTP sent to your email
        </Text>

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

        {/* OTP inputs */}
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

        {/* verify button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit}>
          <Text style={styles.verifyText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* footer link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive OTP? </Text>
          <TouchableOpacity onPress={resendotp}>
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
  backButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
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
  verifyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#374151',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  errorMessage: {
    color: '#EF4444',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

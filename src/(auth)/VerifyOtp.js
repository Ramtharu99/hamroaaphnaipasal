import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { OTP } from '../store/api';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VerifyOtp = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  const route = useRoute();


  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage(''); 
    const otpCode = otp.join('').trim();
    const email = route.params.email?.trim().toLowerCase();

    if (!email) {
      setError('Email is missing');
      setLoading(false);
      return;
    }

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits of the OTP');
      setLoading(false);
      return;
    }

    try {
      const payload = { email, code: Number(otpCode) };
      const result = await OTP(payload);

      if (result.success) {
        setError('');
        navigation.navigate('SetNewPassword', { email, code: Number(otpCode) });
      } else {
        setError(result.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      setError('');
      setSuccessMessage(''); 

      if (text && index < otp.length - 1) inputRefs.current[index + 1].focus();
      if (!text && index > 0) inputRefs.current[index - 1].focus();
    }
  };

  const resendOtp = async () => {
    const email = route.params.email?.trim().toLowerCase();
    if (!email) {
      setError('Email is missing');
      return;
    }

    setLoading(true);
    setSuccessMessage(''); 
    try {
      const payload = { email, resend: true }; 
      const result = await OTP(payload);

      if (result.success) {
        setError('');
        setSuccessMessage('OTP resent successfully');
        setOtp(['', '', '', '', '', '']); 
        setCountdown(30);
      } else {
        setError(result.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
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
          <Icon name="arrow-left" size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back to sign in</Text>
        </TouchableOpacity>

        {/* Input Container */}
        <View style={styles.inputContainer}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}
          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>✅ {successMessage}</Text>
            </View>
          ) : null}

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[styles.otpInput, error && { borderColor: 'red' }]}
                keyboardType="numeric"
                maxLength={1}
                value={value}
                onChangeText={text => handleChange(text, index)}
                placeholder="0"
                placeholderTextColor="gray"
                editable={!loading}
              />
            ))}
          </View>
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.verifyButton, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.verifyText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive OTP? </Text>
          <TouchableOpacity
            onPress={resendOtp}
            disabled={loading || countdown > 0}
          >
            <Text
              style={[
                styles.footerLink,
                (loading || countdown > 0) && { opacity: 0.7 },
              ]}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend'}
            </Text>
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
    marginBottom: 20,
  },
  backButtonText: { fontSize: 14, color: '#6B7280', marginLeft: 4 },
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
  successBox: {
    backgroundColor: '#D1FAE5',
    borderLeftWidth: 5,
    borderLeftColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    color: '#047857',
    fontSize: 14,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
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
    color: '#000',
  },
  verifyButton: {
    backgroundColor: '#1BB83A',
    paddingVertical: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  verifyText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: { fontSize: 14, color: '#374151' },
  footerLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#3851DD',
  },
});

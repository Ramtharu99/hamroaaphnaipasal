import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import back from '../../assets/images/back.png';
import { requestPasswordReset } from '../store/api';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = ({ navigation }) => {
  const initialValue = { email: '' };
  const [isChecked, setIsChecked] = useState(false);
  const [form, setForm] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = field => value => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const sendOtp = async () => {
    setLoading(true);
    if (!form.email) {
      setError('Email is reuired');
      setLoading(false);
      return;
    }
    if (!isChecked) {
      setError('Please verify you are not a robot');
      setLoading(false);
      return;
    }

    try {
      const payload = { email: form.email, captchaChecked: isChecked };
      const result = await requestPasswordReset(payload);

      if (result.success) {
        navigation.navigate('VerifyOtp', { email: form.email });
      } else {
        setError('Invalid Credential');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
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
          <Icon name="arrow-left" size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back to sign in</Text>
        </TouchableOpacity>

        {/* input field */}
        <View style={styles.inputContainer}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            value={form.email}
            onChangeText={handleChange('email')}
            style={[styles.inputField, error && { borderColor: 'red' }]}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="gray"
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

          <TouchableOpacity
            style={styles.resetPassword}
            onPress={sendOtp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="gray" />
            ) : (
              <Text style={styles.resetText}>Reset password</Text>
            )}
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
  label: { fontSize: 14, color: '#000', marginBottom: 6 },
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

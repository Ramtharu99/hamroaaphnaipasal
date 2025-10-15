import { useContext, useEffect, useState } from 'react';
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
import google from '../../assets/images/google.png';
import { loginUser } from '../store/api';
import { useRoute } from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { googleClientId } from '../store/config';
import { AuthContext } from './authContex';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SignIn = ({ navigation }) => {
  const initialValues = {
    email: '',
    password: '',
  };
  
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRoute();
  const selectedRole = router.params?.role;
  const {login} = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);

    if (!form.email || !form.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!isChecked) {
      setError('Please check the checkbox');
      setLoading(false);
      return;
    }

    try {
      const roleLabel = selectedRole === 1 ? 'Owner' : selectedRole === 2 ? 'Staff' : null;

      const payload = {
        email: form.email,
        password: form.password,
        role: roleLabel,
        rememberMe: isChecked,
      };

      const result = await loginUser(payload);

      if (result.access_token) {
        await login(result.access_token);
        setError('');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      console.log('Login error', err);
      setError('Invalid credentials');
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


  // signin with google
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();
      const email = userInfo.user.email;
      const password = userInfo.user.id;

      const roleLabel =
        selectedRole === 1 ? 'Owner' : selectedRole === 2 ? 'Staff' : null;

      const payload = {
        email,
        password,
        role: roleLabel,
        rememberMe: true,
      };

      const result = await loginUser(payload);

      if (result.success) {
        setError('');
        navigation.reset({ index: 0, routes: [{ name: 'DashBoard' }] });
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.log('Google Sign-In Error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Google sign-in cancelled by user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Google sign-in already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play Services not available or outdated');
      } else {
        setError('Google sign-in failed');
      }
    } 
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>LogIn</Text>
        <Text style={styles.subtitle}>Sign in to your Store Owner account</Text>

        {/* Back button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Role')}
        >
          <Icon name="arrow-left" size={20} color="#6B7280" />
          <Text style={styles.backButtonText}>Back to role selection</Text>
        </TouchableOpacity>

        {/* input Fields */}
        <View style={styles.inputContainer}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor={'gray'}
            style={[styles.inputField, error && { borderColor: 'red' }]}
            value={form.email}
            onChangeText={text => {
              setForm(prev => ({ ...prev, email: text }));
              setError('');
            }}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={'gray'}
              style={[styles.inputField, error && { borderColor: 'red' }]}
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={text => {
                setForm(prev => ({ ...prev, password: text }));
                setError('');
              }}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
            </TouchableOpacity>
          </View>

          {/* remember me and forgot password */}
          <View style={styles.rememberMeAndForgot}>
            <View style={styles.rememberMe}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#1BB83A' : undefined}
                style={{ height: 20, width: 20 }}
              />
              <Text style={styles.rememberText}>Remember me </Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* sign in button */}
          <TouchableOpacity
            style={[styles.continueBtn, loading && {opacity: 0.7}]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size='small' color="gray" />
            ) : (
              <Text style={styles.continueText}>Sign in</Text>
            )}
          </TouchableOpacity>

          {/* divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          {/* social buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleGoogleSignIn}
            >
              <Image
                source={google}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Signup link inside card */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Signup here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

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
  backButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginVertical: 8,
  },
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
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
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
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  rememberMeAndForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
    marginBottom: 10,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 8,
  },
  forgotText: {
    fontSize: 12,
    color: '#3851DD',
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
    textDecorationLine: 'underline',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '600',
  },
});

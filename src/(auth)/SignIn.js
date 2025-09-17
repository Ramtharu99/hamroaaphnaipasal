import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useFormik } from 'formik';
import { loginValidation } from '../../validation/formvalidation';
import back from '../../assets/images/back.png';
import google from '../../assets/images/google.png';
import eye from '../../assets/images/eye.png';
import eyeOff from '../../assets/images/eye-off.png';

const SignIn = ({ navigation }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit: values => {
      navigation.navigate('DashBoard');
    },
  });

  const handleGoodleSignIn = () => {};

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
          <Image
            source={back}
            style={{ height: 18, width: 18, tintColor: '#6B7280' }}
          />
          <Text style={styles.backButtonText}>Back to role selection</Text>
        </TouchableOpacity>

        {/* input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor={'gray'}
            style={styles.inputField}
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={'gray'}
              style={[styles.inputField, {color: "#000"}]}
              secureTextEntry={!showPassword}
              value={values.password}
              onChangeText={handleChange('password')}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(prev => !prev)}
            >
              <Image
                source={showPassword ? eye : eyeOff}
                style={{ width: 25, height: 25 }}
                tintColor={'#6B7280'}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {touched.password && errors.password && (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          )}

          {/* remember me and forgot password */}
          <View style={styles.rememberMeAndForgot}>
            <View style={styles.rememberMe}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#1BB83A' : undefined}
              />
              <Text style={styles.rememberText}>Remember me</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {/* sign in button */}
          <TouchableOpacity style={styles.continueBtn} onPress={handleSubmit}>
            <Text style={styles.continueText}>Sign in</Text>
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
              onPress={handleGoodleSignIn}
            >
              <Image
                source={google}
                style={{ width: 25, height: 25 }}
                resizeMode="contain"
              />
              <Text style={styles.socialText}>Google</Text>
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
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
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
  errorMessage: {
    color: 'red',
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'left',
    fontSize: 12,
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

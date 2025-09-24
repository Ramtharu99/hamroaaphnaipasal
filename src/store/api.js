import { config } from './config';
import AsyncStorage  from "@react-native-async-storage/async-storage"

export async function registerUser(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site_name: data.site_name,
        email: data.email,
        password: data.password,
        accept_term: data.accept_term,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
}

export async function loginUser(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role,
        rememberMe: data.rememberMe,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    if (result.access_token) {
      await AsyncStorage.setItem('access_token', result.access_token)
    }
    return result;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
}

export async function requestPasswordReset(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        captchaChecked: data.captchaChecked,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Password reset request failed: ${response.statusText}`,
      );
    }

    const result = await response.json();
    // Return the entire data object which contains user info
    return {
      message: result.message,
      data: result.data,
      success: result.success,
    };
  } catch (error) {
    console.error('Password reset error:', error.message);
    throw error;
  }
}

// for forgeting password otp verification 
export async function verifyOTP(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        code: Number(data.code),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `OTP verification failed: ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('OTP verification error:', error.message);
    throw error;
  }
}

export async function updatePassword(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/confirm-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        code: Number(data.code),
        password: data.newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Password reset failed: ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Password reset error:', error.message);
    throw error;
  }
}

export async function verify2FAOTP(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: data.user_id,
        otp: data.otp,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'OTP verification failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('OTP verification error:', error.message);
    throw error;
  }
}

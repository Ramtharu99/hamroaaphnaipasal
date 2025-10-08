import { config } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const token = AsyncStorage.getItem('access_token');

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
    // console.error('Registration error:', error.message);
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
      await AsyncStorage.setItem('access_token', result.access_token);
    }
    return result;
  } catch (error) {
    // console.error('Login error:', error.message);
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
    // console.error('Password reset error:', error.message);
    throw error;
  }
}

// for forgeting password otp verification
export async function OTP(data) {
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
    // console.error('Password reset error:', error.message);
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
    // console.error('OTP verification error:', error.message);
    throw error;
  }
}

// Fetch shop details
export async function getShopDetails() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/show`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch shop details');

    const result = await response.json();
    const userData = result.data?.[0] || {};

    return {
      email: userData.email || '',
      site_name: userData.site_name || '',
      shop_domain: `${userData.site_name || ''}.hamroaaphnaipasal.com`,
    };
  } catch (error) {
    console.error('Error fetching shop details:', error.message);
    throw error;
  }
}

// ✅ Fetch Company Details
export async function getCompanyDetails() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch company details');

    const result = await response.json();
    const data = result.data?.company_details || {};

    return {
      companyInfo: {
        siteTitle: data.site_title || '',
        contactNumber: data.contact_number || '',
        contactAddress: data.contact_address || '',
        contactEmail: data.contact_email || '',
        about: data.about || '',
        siteLogo: data.site_logo
          ? `${config.apiBaseUrl}/storage/${data.site_logo}`
          : null,
      },
      businessRegistration: {
        registeredBusinessName: data.business_name || '',
        registeredAddress: data.business_address || '',
        registeredPhone: data.business_phone || '',
        panNumber: data.business_PAN || '',
        bankName: data.business_bank_account || '',
        accountNumber: data.business_account_number || '',
        accountName: data.business_account_name || '',
        branch: data.business_account_branch || '',
        registrationDoc: data.business_registration_document || null,
        agreementDoc: data.business_agreement_document || null,
      },
    };
  } catch (error) {
    console.error('Error fetching company details:', error.message);
    throw error;
  }
}

// ✅ Update Company Info
export async function updateCompanyInfo(data, siteLogo) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const formData = new FormData();
    formData.append('site_title', data.siteTitle || '');
    formData.append('contact_number', data.contactNumber || '');
    formData.append('contact_address', data.contactAddress || '');
    formData.append('contact_email', data.contactEmail || '');
    formData.append('about', data.about || '');
    if (siteLogo) formData.append('site_logo', siteLogo);

    const response = await fetch(`${config.apiBaseUrl}/update-details`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to update company information');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating company info:', error);
    throw error;
  }
}

// ✅ Update Business Registration
export async function updateBusinessRegistration(data, registrationDoc, agreementDoc) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const formData = new FormData();
    Object.entries({
      business_name: data.registeredBusinessName,
      business_address: data.registeredAddress,
      business_phone: data.registeredPhone,
      business_PAN: data.panNumber,
      business_bank_account: data.bankName,
      business_account_number: data.accountNumber,
      business_account_name: data.accountName,
      business_account_branch: data.branch,
    }).forEach(([key, value]) => formData.append(key, value || ''));

    if (registrationDoc) formData.append('registration_doc', registrationDoc);
    if (agreementDoc) formData.append('agreement_doc', agreementDoc);

    const response = await fetch(`${config.apiBaseUrl}/update-mybusinessdetails`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to update business registration');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating business registration:', error);
    throw error;
  }
}

// ✅ Fetch Domain Details
export async function getDomainDetails() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/get-domain`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch domain details');
    const result = await response.json();
    return result.data || {};
  } catch (error) {
    console.error('Error fetching domain details:', error);
    throw error;
  }
}

// ✅ Update Domain
export async function updateDomain(domainName) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainName || !domainRegex.test(domainName)) {
      throw new Error('Invalid domain name.');
    }

    const formData = new FormData();
    formData.append('domain_name', domainName);

    const response = await fetch(`${config.apiBaseUrl}/update-domain`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to update domain');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating domain:', error);
    throw error;
  }
}
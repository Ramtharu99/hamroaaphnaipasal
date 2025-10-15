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
export async function updateBusinessRegistration(
  data,
  registrationDoc,
  agreementDoc,
) {
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

    const response = await fetch(
      `${config.apiBaseUrl}/update-mybusinessdetails`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      },
    );

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

// ----------------- Privacy Policy -----------------
export async function getReturnPolicy() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/return-policy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to fetch return policy');
    }

    const result = await response.json();
    console.log('Return Policy API response:', result); // Debug log

    // Handle nested response structure
    const returnPolicy =
      result.data?.company_details?.return_policy ||
      result.data?.return_policy ||
      result.return_policy ||
      '';

    return {
      return_policy: returnPolicy,
    };
  } catch (error) {
    console.error('Error fetching return policy:', error.message);
    throw error;
  }
}

export async function updatePrivacyPolicy(content) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    if (!content) throw new Error('Privacy policy content cannot be empty');

    const formData = new FormData();
    formData.append('privacy_policy', content);

    const response = await fetch(`${config.apiBaseUrl}/update-privacy-policy`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to update privacy policy');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Privacy policy updated successfully',
    };
  } catch (error) {
    console.error('Error updating privacy policy:', error.message);
    throw error;
  }
}

// ----------------- Return Policy -----------------
export async function getPrivacyPolicy() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/privacy-policy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to fetch privacy policy');
    }

    const result = await response.json();
    console.log('Privacy Policy API response:', result); // Debug log

    // Handle nested response structure
    const privacyPolicy =
      result.data?.company_details?.privacy_policy ||
      result.data?.privacy_policy ||
      result.privacy_policy ||
      '';

    return {
      privacy_policy: privacyPolicy,
    };
  } catch (error) {
    console.error('Error fetching privacy policy:', error.message);
    throw error;
  }
}

export async function updateReturnPolicy(content) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    if (!content) throw new Error('Return policy content cannot be empty');

    const formData = new FormData();
    formData.append('return_policy', content);

    const response = await fetch(`${config.apiBaseUrl}/update-return-policy`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to update return policy');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Return policy updated successfully',
    };
  } catch (error) {
    console.error('Error updating return policy:', error.message);
    throw error;
  }
}

// ----------------- Terms & Conditions -----------------
export async function getTermsAndConditions() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(
      `${config.apiBaseUrl}/terms-condition?_=${Date.now()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(
        errorData.message || 'Failed to fetch terms and conditions',
      );
    }

    const result = await response.json();
    console.log('Raw API response:', result);

    // Correct the path to access terms_condition
    const termsCondition =
      result.data?.company_details?.terms_condition ||
      result.terms_condition ||
      '';

    console.log('Extracted terms:', termsCondition);

    return {
      terms_condition: termsCondition,
    };
  } catch (error) {
    console.error('Error fetching terms and conditions:', error.message);
    throw error;
  }
}

export async function updateTermsAndConditions(content) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    if (
      !content ||
      content === '<p><br></p>' ||
      content === 'Write your terms and conditions here...'
    ) {
      throw new Error('Terms and conditions content cannot be empty');
    }

    const formData = new FormData();
    formData.append('terms_condition', content);

    const response = await fetch(
      `${config.apiBaseUrl}/update-terms-condition`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      if (errorData.status === 'error' && errorData.errors) {
        const errorMessages = Object.entries(errorData.errors)
          .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
          .join('; ');
        throw new Error(
          errorMessages || 'Failed to update terms and conditions',
        );
      }
      throw new Error(
        errorData.message || 'Failed to update terms and conditions',
      );
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Terms and conditions updated successfully',
    };
  } catch (error) {
    console.error('Error updating terms and conditions:', error.message);
    throw error;
  }
}

// ----------------- Social Links API Functions -----------------
export async function getSocialLinks() {
  const token = await AsyncStorage.getItem('access_token');

  try {
    const response = await fetch(`${config.apiBaseUrl}/sociallinks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to fetch social links');
    }

    const result = await response.json();

    // Extract social links from the company details
    if (result.data && result.data.company_details) {
      const {
        facebook_link,
        insta_link,
        youtube_link,
        pininterest_link,
        whatsapp,
        tiktok_link,
      } = result.data.company_details;

      return {
        facebook_link: facebook_link || '',
        insta_link: insta_link || '',
        youtube_link: youtube_link || '',
        pininterest_link: pininterest_link || '',
        whatsapp: whatsapp || '',
        tiktok_link: tiktok_link || '',
      };
    }

    return {};
  } catch (error) {
    console.error('Error fetching social links:', error.message);
    throw error;
  }
}

export async function updateSocialLinks(data) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    if (!data) throw new Error('Social links data cannot be empty');

    const response = await fetch(`${config.apiBaseUrl}/update-sociallinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.message || 'Failed to update social links');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Social links updated successfully',
    };
  } catch (error) {
    console.error('Error updating social links:', error.message);
    throw error;
  }
}

// ----------------- Get FAQs -----------------
export async function getFAQs() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/faq`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch FAQs');
    }

    const result = await response.json();

    // The API returns {status: "success", data: {faqs: [...]}}
    // So we need to return result.data which contains the faqs array
    return result.data || {};
  } catch (error) {
    console.error('Error fetching FAQs:', error.message);
    throw error;
  }
}

// ----------------- Add FAQ -----------------
export async function addFAQ({ question, answer }) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/add-faq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, answer }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to add FAQ');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'FAQ added successfully',
    };
  } catch (error) {
    console.error('Error adding FAQ:', error.message);
    throw error;
  }
}

// ----------------- Update FAQ -----------------
export async function updateFAQ(id, { question, answer }) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/update-faq/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question, answer }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update FAQ');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'FAQ updated successfully',
    };
  } catch (error) {
    console.error('Error updating FAQ:', error.message);
    throw error;
  }
}

// ----------------- Delete FAQ -----------------
export async function deleteFAQ(id) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    const response = await fetch(`${config.apiBaseUrl}/delete-faq/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete FAQ');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'FAQ deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting FAQ:', error.message);
    throw error;
  }
}

// ----------------- Security Settings API -----------------
export async function getSecuritySettings() {
  const token = await AsyncStorage.getItem('access_token');
  try {
    console.log('Fetching security settings with token:', token); // Debug token
    const response = await fetch(`${config.apiBaseUrl}/security-settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Get error response:', errorData); // Debug error
      throw new Error(errorData.message || 'Failed to fetch security settings');
    }

    const result = await response.json();
    console.log('Get response:', result); // Debug response
    return result.data || result;
  } catch (error) {
    console.error('Error fetching security settings:', error.message, {
      errorData: error,
    });
    throw error;
  }
}

export async function updateSecuritySettings(settings) {
  const token = await AsyncStorage.getItem('access_token');
  try {
    console.log('API Base URL:', config.apiBaseUrl); 
    console.log(
      'Updating security settings with payload:',
      settings,
      'and token:',
      token,
    ); // Debug payload and token
    const response = await fetch(
      `${config.apiBaseUrl}/update-security-settings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Update error response:', errorData); // Detailed error logging
      throw new Error(
        errorData.message || 'Failed to update security settings',
      );
    }

    const result = await response.json();
    console.log('Update response:', result); // Debug response
    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Security settings updated successfully',
    };
  } catch (error) {
    console.error('Error updating security settings:', error.message, {
      errorData: error,
    });
    throw error;
  }
}

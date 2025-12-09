import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
  RefreshControl,
  Image,
  BackHandler,
  Alert,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../constants/colors';
import * as ImagePicker from 'react-native-image-picker';
import CustomHeader from '../components/CustomHeader';
import backButton from '../../assets/images/arrow-back.png';
import {
  getShopDetails,
  getCompanyDetails,
  updateCompanyInfo,
  updateBusinessRegistration,
  getDomainDetails,
  updateDomain,
} from '../store/api';

const StoreInformation = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({
    shopDetails: false,
    companyInfo: false,
    businessReg: false,
    domainSettings: false,
  });

  const [shopDetails, setShopDetails] = useState({
    siteName: '',
    shopDomain: '',
    email: '',
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    logo: null,
    about: '',
  });

  const [businessReg, setBusinessReg] = useState({
    registeredBusinessName: '',
    registeredPhoneNumber: '',
    registeredAddress: '',
    bankName: '',
    panNumber: '',
    accountName: '',
    accountNumber: '',
    branch: '',
    registrationDoc: null,
    agreementDoc: null,
  });

  const [domainSettings, setDomainSettings] = useState({
    currentDomain: '',
    status: '',
    expiryDate: '',
  });

  const [refreshing, setRefreshing] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchAllDetails();
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Fetch all details
  const fetchAllDetails = async () => {
    try {
      setLoading(true);
      const shopData = await getShopDetails();
      setShopDetails({
        siteName: shopData?.site_name || '',
        shopDomain: shopData?.shop_domain || '',
        email: shopData?.email || '',
      });

      const companyData = await getCompanyDetails();
      const companyInfoData = companyData?.companyInfo || {};
      const businessRegData = companyData?.businessRegistration || {};

      setCompanyInfo({
        companyName: companyInfoData?.siteTitle || '',
        email: companyInfoData?.contactEmail || '',
        phone: companyInfoData?.contactNumber || '',
        address: companyInfoData?.contactAddress || '',
        website: companyInfoData?.website || '',
        logo: companyInfoData?.siteLogo || null,
        about: companyInfoData?.about || '',
      });

      setBusinessReg({
        registeredBusinessName: businessRegData?.registeredBusinessName || '',
        registeredPhoneNumber: businessRegData?.registeredPhone || '',
        registeredAddress: businessRegData?.registeredAddress || '',
        bankName: businessRegData?.bankName || '',
        panNumber: businessRegData?.panNumber || '',
        accountName: businessRegData?.accountName || '',
        accountNumber: businessRegData?.accountNumber || '',
        branch: businessRegData?.branch || '',
        registrationDoc: businessRegData?.registrationDoc || null,
        agreementDoc: businessRegData?.agreementDoc || null,
      });

      const domainData = await getDomainDetails();
      setDomainSettings({
        currentDomain: domainData?.domain_name || shopData?.shop_domain || '',
        status: domainData?.status || 'Active',
        expiryDate: domainData?.expiry_date || '',
      });
    } catch (error) {
      console.error('Error fetching details:', error?.message || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDetails();
  }, []);

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const showPopup = message => {
    setPopupMessage(message);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000);
  };

  // Image Upload
  const handleLogoUpload = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        return;
      }
      const uri = response.assets?.[0]?.uri;
      if (uri)
        setCompanyInfo(prev => ({
          ...prev,
          logo: { uri, name: 'logo.jpg', type: 'image/jpeg' },
        }));
    });
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  // -------------------- Validation --------------------
  const validateCompanyInfo = () => {
    if (!companyInfo.companyName.trim()) {
      Alert.alert('Validation Error', 'Site name is required');
      return false;
    }
    if (!companyInfo.email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return false;
    }
    if (!companyInfo.phone.trim()) {
      Alert.alert('Validation Error', 'Phone number is required');
      return false;
    }
    return true;
  };

  const validateBusinessReg = () => {
    if (!businessReg.registeredBusinessName.trim()) {
      Alert.alert('Validation Error', 'Business Name is required');
      return false;
    }
    if (!businessReg.registeredAddress.trim()) {
      Alert.alert('Validation Error', 'Registered Address is required');
      return false;
    }
    if (!businessReg.panNumber.trim()) {
      Alert.alert('Validation Error', 'PAN Number is required');
      return false;
    }
    return true;
  };

  const validateDomain = () => {
    if (!domainSettings.currentDomain.trim()) {
      Alert.alert('Validation Error', 'Domain name is required');
      return false;
    }
    return true;
  };

  // -------------------- Handlers --------------------
  const handleSaveCompanyInfo = async () => {
    if (!validateCompanyInfo()) return;

    try {
      setLoading(true);
      const result = await updateCompanyInfo(
        {
          siteTitle: companyInfo.companyName,
          contactEmail: companyInfo.email,
          contactNumber: companyInfo.phone,
          contactAddress: companyInfo.address,
          website: companyInfo.website,
          about: companyInfo.about,
        },
        companyInfo.logo,
      );
      showPopup(result.message || 'Company information updated successfully!');
      await fetchAllDetails();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBusinessRegistration = async () => {
    if (!validateBusinessReg()) return;

    try {
      setLoading(true);
      const result = await updateBusinessRegistration(
        {
          registeredBusinessName: businessReg.registeredBusinessName,
          registeredPhone: businessReg.registeredPhoneNumber,
          registeredAddress: businessReg.registeredAddress,
          bankName: businessReg.bankName,
          panNumber: businessReg.panNumber,
          accountName: businessReg.accountName,
          accountNumber: businessReg.accountNumber,
          branch: businessReg.branch,
        },
        businessReg.registrationDoc,
        businessReg.agreementDoc,
      );
      showPopup(
        result.message || 'Business registration updated successfully!',
      );
      await fetchAllDetails();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDomain = async () => {
    if (!validateDomain()) return;

    try {
      setLoading(true);
      await updateDomain(domainSettings.currentDomain);
      showPopup('Domain updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };



  // ... (existing code)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Popup */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>{popupMessage}</Text>
          </View>
        </View>
      </Modal>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        {/* Header */}
        <CustomHeader title="Store Information" leftType="back" />
        {/* Content */}
        {!loading && (
          <View style={styles.contentWrapper}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {/* ... content ... */}
              <View style={styles.section}>
                {/* SHOP DETAILS */}
                <View style={styles.subSection}>
                  <Pressable
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('shopDetails')}
                  >
                    <Text style={styles.subSectionTitle}>Shop Details</Text>
                    <Text style={styles.toggleIcon}>
                      {expandedSections.shopDetails ? '-' : '+'}
                    </Text>
                  </Pressable>
                  {expandedSections.shopDetails && (
                    <View>
                      {['siteName', 'shopDomain', 'email'].map(key => (
                        <View key={key} style={styles.itemRow}>
                          <Text style={styles.itemTitle}>
                            {key === 'siteName'
                              ? 'Site Name'
                              : key === 'shopDomain'
                                ? 'Shop Domain'
                                : 'Email'}
                          </Text>
                          <TextInput
                            style={styles.input}
                            value={shopDetails[key]}
                            onChangeText={text =>
                              setShopDetails(prev => ({ ...prev, [key]: text }))
                            }
                            placeholder={`Enter ${key}`}
                            placeholderTextColor="gray"
                            keyboardType={
                              key === 'email' ? 'email-address' : 'default'
                            }
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                {/* COMPANY INFO (Simplified for brevity in diff, but retaining logic) */}
                <View style={styles.subSection}>
                  <Pressable
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('companyInfo')}
                  >
                    <Text style={styles.subSectionTitle}>Company Detail</Text>
                    <Text style={styles.toggleIcon}>
                      {expandedSections.companyInfo ? '-' : '+'}
                    </Text>
                  </Pressable>
                  {expandedSections.companyInfo && (
                    <View style={styles.companyCard}>
                      {[
                        'companyName',
                        'email',
                        'phone',
                        'address',
                        'website',
                        'about',
                      ].map(key => (
                        <View key={key} style={styles.fieldGroup}>
                          <Text style={styles.fieldLabel}>{key}</Text>
                          <TextInput
                            style={styles.inputField}
                            value={companyInfo[key]}
                            placeholder={`Enter ${key}`}
                            placeholderTextColor="gray"
                            onChangeText={text =>
                              setCompanyInfo(prev => ({ ...prev, [key]: text }))
                            }
                          />
                        </View>
                      ))}
                      <Pressable
                        style={styles.uploadBox}
                        onPress={handleLogoUpload}
                      >
                        <Text style={styles.uploadText}>Upload Logo</Text>
                      </Pressable>
                      <Pressable
                        style={[
                          styles.submitButton,
                          loading && styles.buttonDisabled,
                        ]}
                        onPress={handleSaveCompanyInfo}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.submitButtonText}>
                            Save Company Info
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  )}
                </View>
                {/* BUSINESS REG (Simplified) */}
                <View style={styles.subSection}>
                  <Pressable
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('businessReg')}
                  >
                    <Text style={styles.subSectionTitle}>
                      Business Registration
                    </Text>
                    <Text style={styles.toggleIcon}>
                      {expandedSections.businessReg ? '-' : '+'}
                    </Text>
                  </Pressable>
                  {expandedSections.businessReg && (
                    <View style={styles.companyCard}>
                      {/* Fields mapped */}
                      {[
                        {
                          key: 'registeredBusinessName',
                          label: 'Business Name',
                        },
                        { key: 'registeredPhoneNumber', label: 'Phone' },
                        { key: 'registeredAddress', label: 'Address' },
                        { key: 'bankName', label: 'Bank Name' },
                        { key: 'panNumber', label: 'PAN Number' },
                        { key: 'accountName', label: 'Account Name' },
                        { key: 'accountNumber', label: 'Account Number' },
                        { key: 'branch', label: 'Branch' },
                      ].map(field => (
                        <View key={field.key} style={styles.fieldGroup}>
                          <Text style={styles.fieldLabel}>{field.label}</Text>
                          <TextInput
                            style={styles.inputField}
                            value={businessReg[field.key]}
                            placeholder={`Enter ${field.label}`}
                            placeholderTextColor="gray"
                            onChangeText={text =>
                              setBusinessReg(prev => ({
                                ...prev,
                                [field.key]: text,
                              }))
                            }
                          />
                        </View>
                      ))}
                      <Pressable
                        style={[
                          styles.submitButton,
                          loading && styles.buttonDisabled,
                        ]}
                        onPress={handleSaveBusinessRegistration}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.submitButtonText}>
                            Save Business Registration
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  )}
                </View>

                {/* DOMAIN (Simplified) */}
                <View style={styles.subSection}>
                  <Pressable
                    style={styles.sectionHeader}
                    onPress={() => toggleSection('domainSettings')}
                  >
                    <Text style={styles.subSectionTitle}>Domain Settings</Text>
                    <Text style={styles.toggleIcon}>
                      {expandedSections.domainSettings ? '-' : '+'}
                    </Text>
                  </Pressable>
                  {expandedSections.domainSettings && (
                    <View style={styles.companyCard}>
                      <Text style={styles.fieldLabel}>Domain Name</Text>
                      <TextInput
                        style={styles.inputField}
                        value={domainSettings.currentDomain}
                        placeholderTextColor="gray"
                        onChangeText={text =>
                          setDomainSettings(prev => ({
                            ...prev,
                            currentDomain: text,
                          }))
                        }
                        placeholder="Enter your domain"
                        autoCapitalize="none"
                      />
                      <Pressable
                        style={[
                          styles.submitButton,
                          loading && styles.buttonDisabled,
                        ]}
                        onPress={handleSaveDomain}
                        disabled={loading}
                      >
                        {loading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.submitButtonText}>
                            Show Domain Details
                          </Text>
                        )}
                      </Pressable>
                    </View>
                  )}
                </View>

              </View>
            </ScrollView>
          </View>
        )}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StoreInformation;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 35 },
  section: {
    backgroundColor: '#fff', // Changed to white for better contrast slightly? Or keep grey
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    marginTop: 8,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  // ... other styles
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
  },
  // ...
});

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
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  // Refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchAllDetails();
    setTimeout(() => setRefreshing(false), 1500);
  };

  // Fetch all details
  const fetchAllDetails = async () => {
    try {
      const shopData = await getShopDetails();
      setShopDetails({
        siteName: shopData?.site_name || '',
        shopDomain: shopData?.shop_domain || '',
        email: shopData?.email || '',
      });

      const companyData = await getCompanyDetails();
      const companyInfoData = companyData?.companyInfo || {};
      const businessRegData = companyData?.businessRegistration || {};

      // Safely map company info
      setCompanyInfo({
        companyName: companyInfoData?.siteTitle || '',
        email: companyInfoData?.contactEmail || '',
        phone: companyInfoData?.contactNumber || '',
        address: companyInfoData?.contactAddress || '',
        website: companyInfoData?.website || '',
        logo: companyInfoData?.siteLogo || null,
        about: companyInfoData?.about || '',
      });

      // Safely map business registration
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
      console.error('Error fetching details:', error.message);
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

  const handleLogoUpload = () => {
    showPopup('Logo upload not implemented yet.');
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

  // Handlers for saving
  const handleSaveShopDetails = () =>
    showPopup('Shop details saved successfully!');

  const handleSaveCompanyInfo = async () => {
    try {
      await updateCompanyInfo(
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
      showPopup('Company information updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSaveBusinessRegistration = async () => {
    try {
      await updateBusinessRegistration(
        businessReg,
        businessReg.registrationDoc,
        businessReg.agreementDoc,
      );
      showPopup('Business registration updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSaveDomain = async () => {
    try {
      await updateDomain(domainSettings.currentDomain);
      showPopup('Domain updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Popup */}
      <Modal transparent visible={popupVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>{popupMessage}</Text>
          </View>
        </View>
      </Modal>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={backButton} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>Store Information</Text>
        </View>

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
                <Pressable
                  style={[styles.submitButton]}
                  onPress={handleSaveShopDetails}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* COMPANY INFO */}
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
                    <Text style={styles.fieldLabel}>
                      {key === 'companyName'
                        ? 'Company Name'
                        : key === 'email'
                        ? 'Email'
                        : key === 'phone'
                        ? 'Phone'
                        : key === 'address'
                        ? 'Address'
                        : key === 'website'
                        ? 'Website'
                        : 'About'}
                    </Text>
                    <TextInput
                      style={styles.inputField}
                      value={companyInfo[key]}
                      onChangeText={text =>
                        setCompanyInfo(prev => ({ ...prev, [key]: text }))
                      }
                      placeholder={`Enter ${key}`}
                      placeholderTextColor="gray"
                    />
                  </View>
                ))}
                <Pressable style={styles.uploadBox} onPress={handleLogoUpload}>
                  <Text style={styles.uploadText}>Upload Logo</Text>
                </Pressable>
                <Pressable
                  style={styles.submitButton}
                  onPress={handleSaveCompanyInfo}
                >
                  <Text style={styles.submitButtonText}>Save Company Info</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* BUSINESS REGISTRATION */}
          <View style={styles.subSection}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => toggleSection('businessReg')}
            >
              <Text style={styles.subSectionTitle}>Business Registration</Text>
              <Text style={styles.toggleIcon}>
                {expandedSections.businessReg ? '-' : '+'}
              </Text>
            </Pressable>
            {expandedSections.businessReg && (
              <View style={styles.companyCard}>
                {[
                  { key: 'registeredBusinessName', label: 'Business Name' },
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
                        setBusinessReg(prev => ({ ...prev, [field.key]: text }))
                      }
                    />
                  </View>
                ))}
                <Pressable
                  style={styles.submitButton}
                  onPress={handleSaveBusinessRegistration}
                >
                  <Text style={styles.submitButtonText}>
                    Save Business Registration
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* DOMAIN SETTINGS */}
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
                  style={styles.submitButton}
                  onPress={handleSaveDomain}
                >
                  <Text style={styles.submitButtonText}>Update Domain</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreInformation;

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 35 },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    marginTop: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#E6F0EC',
    position: 'relative',
  },
  backButton: { padding: 10, zIndex: 1 },
  backIcon: { height: 20, width: 20 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  subSection: { marginBottom: 12 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#DDECE5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  subSectionTitle: { fontWeight: '600', fontSize: 16 },
  toggleIcon: { fontSize: 16, fontWeight: '600' },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C5D4CC',
  },
  itemTitle: { flex: 1, fontSize: 14, color: '#333' },
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  submitButton: {
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    marginTop: 12,
    paddingVertical: 10,
  },
  submitButtonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popupContainer: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  popupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  uploadText: { color: '#666', fontSize: 14 },
  companyCard: { padding: 8 },
  fieldGroup: { marginBottom: 10 },
  fieldLabel: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    height: 40,
  },
});

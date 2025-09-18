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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';
import backButton from '../../assets/images/arrow-back.png';

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
};

const StoreInformation = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({
    shopDetails: false,
    companyInfo: false,
    businessReg: false,
    domainSettings: false,
  });

  const [shopDetails, setShopDetails] = useState({
    siteName: 'Hamro Aaphnai Pasal',
    shopDomain: 'www.hamroaaphnaipasal.com',
    email: 'sanju@gmail.com',
    address: 'Kathmandu, Nepal',
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyTitle: '',
    siteTitle: '',
    contactAddress: '',
    contactNumber: '',
    contactEmail: '',
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
  });

  const [domainSettings, setDomainSettings] = useState({
    currentDomain: 'www.hamroaaphnaipasal.com',
    status: 'Active',
    expiryDate: '2026-09-04',
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const showToast = message => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  useEffect(() => {
    const backAction = () => {
      if(navigation.canGoBack()){
        navigation.goBack()
        return true
      }
      return false
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)
    return () => backHandler.remove();
  }, [])

  const handleShoppingDetails = () => {
    showToast('Shop Details saved successfully!');
  };

  const handleCompanyInfo = () => {
    showToast('Company Information saved successfully!');
  };

  const handleBusinessRegistration = () => {
    showToast('Business Registration saved successfully!');
  };

  const handleDomainSettings = () => {
    showToast('Domain Settings saved successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
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
          {/* Shop Details Section */}
          <View style={styles.subSection}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => toggleSection('shopDetails')}
              accessibilityLabel="Toggle Shop Details section"
            >
              <Text style={styles.subSectionTitle}>Shop Details</Text>
              <Text style={styles.toggleIcon}>{expandedSections.shopDetails ? '-' : '+'}</Text>
            </Pressable>
            {expandedSections.shopDetails && (
              <View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Site Name</Text>
                  <TextInput
                    style={styles.input}
                    value={shopDetails.siteName}
                    onChangeText={text =>
                      setShopDetails(prev => ({ ...prev, siteName: text }))
                    }
                    placeholder="Enter Site Name"
                    placeholderTextColor="gray"
                    accessibilityLabel="Site Name input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Shop Domain</Text>
                  <TextInput
                    style={styles.input}
                    value={shopDetails.shopDomain}
                    onChangeText={text =>
                      setShopDetails(prev => ({ ...prev, shopDomain: text }))
                    }
                    placeholder="Enter Shop Domain"
                    placeholderTextColor="gray"
                    accessibilityLabel="Shop Domain input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={shopDetails.email}
                    onChangeText={text =>
                      setShopDetails(prev => ({ ...prev, email: text }))
                    }
                    placeholder="Enter Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    accessibilityLabel="Email input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Address</Text>
                  <TextInput
                    style={styles.input}
                    value={shopDetails.address}
                    onChangeText={text =>
                      setShopDetails(prev => ({ ...prev, address: text }))
                    }
                    placeholder="Enter Address"
                    placeholderTextColor="gray"
                    accessibilityLabel="Address input"
                  />
                </View>
                <Pressable
                  style={[styles.itemRow, styles.submitButton]}
                  onPress={handleShoppingDetails}
                  accessibilityLabel="Submit Shop Details"
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Company Information Section */}
          <View style={styles.subSection}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => toggleSection('companyInfo')}
              accessibilityLabel="Toggle Company Information section"
            >
              <Text style={styles.subSectionTitle}>Company Information</Text>
              <Text style={styles.toggleIcon}>{expandedSections.companyInfo ? '-' : '+'}</Text>
            </Pressable>
            {expandedSections.companyInfo && (
              <View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Company Title</Text>
                  <TextInput
                    style={styles.input}
                    value={companyInfo.companyTitle}
                    onChangeText={text =>
                      setCompanyInfo(prev => ({ ...prev, companyTitle: text }))
                    }
                    placeholder="Enter Company Title"
                    placeholderTextColor="gray"
                    accessibilityLabel="Company Title input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Site Title</Text>
                  <TextInput
                    style={styles.input}
                    value={companyInfo.siteTitle}
                    onChangeText={text =>
                      setCompanyInfo(prev => ({ ...prev, siteTitle: text }))
                    }
                    placeholder="Enter Site Title"
                    placeholderTextColor="gray"
                    accessibilityLabel="Site Title input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Contact Address</Text>
                  <TextInput
                    style={styles.input}
                    value={companyInfo.contactAddress}
                    onChangeText={text =>
                      setCompanyInfo(prev => ({ ...prev, contactAddress: text }))
                    }
                    placeholder="Enter Contact Address"
                    placeholderTextColor="gray"
                    accessibilityLabel="Contact Address input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Contact Number</Text>
                  <TextInput
                    style={styles.input}
                    value={companyInfo.contactNumber}
                    onChangeText={text =>
                      setCompanyInfo(prev => ({ ...prev, contactNumber: text }))
                    }
                    placeholder="Enter Contact Number"
                    placeholderTextColor="gray"
                    keyboardType="phone-pad"
                    accessibilityLabel="Contact Number input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Contact Email</Text>
                  <TextInput
                    style={styles.input}
                    value={companyInfo.contactEmail}
                    onChangeText={text =>
                      setCompanyInfo(prev => ({ ...prev, contactEmail: text }))
                    }
                    placeholder="Enter Contact Email"
                    placeholderTextColor="gray"
                    keyboardType="email-address"
                    accessibilityLabel="Contact Email input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>About</Text>
                  <TextInput
                    style={styles.input}
                    value={companyInfo.about}
                    onChangeText={text =>
                      setCompanyInfo(prev => ({ ...prev, about: text }))
                    }
                    placeholder="Enter About Info"
                    placeholderTextColor="gray"
                    multiline
                    numberOfLines={3}
                    accessibilityLabel="About input"
                  />
                </View>
                <Pressable
                  style={[styles.itemRow, styles.submitButton]}
                  onPress={handleCompanyInfo}
                  accessibilityLabel="Submit Company Information"
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Business Registration Section */}
          <View style={styles.subSection}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => toggleSection('businessReg')}
              accessibilityLabel="Toggle Business Registration section"
            >
              <Text style={styles.subSectionTitle}>Business Registration</Text>
              <Text style={styles.toggleIcon}>{expandedSections.businessReg ? '-' : '+'}</Text>
            </Pressable>
            {expandedSections.businessReg && (
              <View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Registered Business Name</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.registeredBusinessName}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, registeredBusinessName: text }))
                    }
                    placeholder="Enter Business Name"
                    placeholderTextColor="gray"
                    accessibilityLabel="Registered Business Name input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Registered Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.registeredPhoneNumber}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, registeredPhoneNumber: text }))
                    }
                    placeholder="Enter Phone Number"
                    placeholderTextColor="gray"
                    keyboardType="phone-pad"
                    accessibilityLabel="Registered Phone Number input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Registered Address</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.registeredAddress}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, registeredAddress: text }))
                    }
                    placeholder="Enter Address"
                    placeholderTextColor="gray"
                    accessibilityLabel="Registered Address input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Bank Name</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.bankName}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, bankName: text }))
                    }
                    placeholder="Enter Bank Name"
                    placeholderTextColor="gray"
                    accessibilityLabel="Bank Name input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>PAN Number</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.panNumber}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, panNumber: text }))
                    }
                    placeholder="Enter PAN Number"
                    placeholderTextColor="gray"
                    accessibilityLabel="PAN Number input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Account Name</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.accountName}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, accountName: text }))
                    }
                    placeholder="Enter Account Name"
                    placeholderTextColor="gray"
                    accessibilityLabel="Account Name input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Account Number</Text>
                  <TextInput
                    style={styles.input}
                    value={businessReg.accountNumber}
                    onChangeText={text =>
                      setBusinessReg(prev => ({ ...prev, accountNumber: text }))
                    }
                    placeholder="Enter Account Number"
                    placeholderTextColor="gray"
                    accessibilityLabel="Account Number input"
                  />
                </View>
                <Pressable
                  style={[styles.itemRow, styles.submitButton]}
                  onPress={handleBusinessRegistration}
                  accessibilityLabel="Submit Business Registration"
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Domain Settings Section */}
          <View style={styles.subSection}>
            <Pressable
              style={styles.sectionHeader}
              onPress={() => toggleSection('domainSettings')}
              accessibilityLabel="Toggle Domain Settings section"
            >
              <Text style={styles.subSectionTitle}>Domain Settings</Text>
              <Text style={styles.toggleIcon}>{expandedSections.domainSettings ? '-' : '+'}</Text>
            </Pressable>
            {expandedSections.domainSettings && (
              <View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Current Domain</Text>
                  <TextInput
                    style={styles.input}
                    value={domainSettings.currentDomain}
                    onChangeText={text =>
                      setDomainSettings(prev => ({ ...prev, currentDomain: text }))
                    }
                    placeholder="Enter Current Domain"
                    placeholderTextColor="gray"
                    accessibilityLabel="Current Domain input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Status</Text>
                  <TextInput
                    style={styles.input}
                    value={domainSettings.status}
                    onChangeText={text =>
                      setDomainSettings(prev => ({ ...prev, status: text }))
                    }
                    placeholder="Enter Status (Active/Inactive)"
                    placeholderTextColor="gray"
                    accessibilityLabel="Status input"
                  />
                </View>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    value={domainSettings.expiryDate}
                    onChangeText={text =>
                      setDomainSettings(prev => ({ ...prev, expiryDate: text }))
                    }
                    placeholder="Enter Expiry Date (YYYY-MM-DD)"
                    placeholderTextColor="gray"
                    accessibilityLabel="Expiry Date input"
                  />
                </View>
                <Pressable
                  style={[styles.itemRow, styles.submitButton]}
                  onPress={handleDomainSettings}
                  accessibilityLabel="Submit Domain Settings"
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 35,
  },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    padding:12,
    marginBottom: 8,
    marginTop: 8
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
  paddingVertical: 12,
  backgroundColor: '#E6F0EC',
  position: 'relative',
},
  backButton: {
    padding: 10,
    zIndex: 1
  },
  backIcon: {
    height: 20,
    width: 20,
  },
 headerTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#333',
  position: 'absolute',
  left: 0,
  right: 0,
  textAlign: 'center',
},
  subSection: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#DDECE5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  subSectionTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  toggleIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C5D4CC',
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
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
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toast: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
  },
  toastContainer: {
    paddingHorizontal: 12,
  },
  toastText1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  toastText2: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default StoreInformation;
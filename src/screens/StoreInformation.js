import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const StoreInformation = ({ navigation }) => {
  const [expandedSections, setExpandedSections] = useState({
    shopDetails: false,
    companyInfo: false,
    businessReg: false,
    domainSettings: false,
  });

  //  default shopping details state
  const [shopDetails, setShopDetails] = useState({
    siteName: 'Hamro Aaphnai Pasal',
    shopDomain: 'www.hamroaaphnaipasal.com',
    email: 'sanju@gmail.com',
    address: 'Kathmandu, Nepal',
  });

  // Default company state
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
    status: 'Active' || 'Inactive',
    expiryDate: '2026-09-04',
  });

  const toggleSection = section => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleShoppingDetails = () => {
    console.log('Shopping Details Submitted:', shopDetails);
  };

  const handleCompanyInfo = () => {
    console.log('Company Information Submitted:', companyInfo);
  };

  const handleBusinessRegistration = () => {
    console.log('Business Registration Submitted:', businessReg);
  };

  const handleDomainSettings = () => {
    console.log('Domain Settings Submitted:', domainSettings);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: 10 , width: 100}}
      >
        <Text>
          <Text style={{ fontSize: 25 }}>←</Text>Go Back
        </Text>
      </TouchableOpacity>
      <View style={styles.section}>
        {/* Shop Details Section */}
        <View style={styles.subSection}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('shopDetails')}
          >
            <Text style={styles.subSectionTitle}>Shop Details</Text>
            <Text>{expandedSections.shopDetails ? '-' : '+'}</Text>
          </TouchableOpacity>
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
                  editable={false}
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
                  editable={false}
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
                  editable={false}
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
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={[styles.itemRow, styles.submitButton]}
                onPress={handleShoppingDetails}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Company Information Section */}
        <View style={styles.subSection}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('companyInfo')}
          >
            <Text style={styles.subSectionTitle}>Company Information</Text>
            <Text>{expandedSections.companyInfo ? '-' : '+'}</Text>
          </TouchableOpacity>
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
                />
              </View>
              <TouchableOpacity
                style={[styles.itemRow, styles.submitButton]}
                onPress={handleCompanyInfo}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Business Registration Section */}
        <View style={styles.subSection}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('businessReg')}
          >
            <Text style={styles.subSectionTitle}>Business Registration</Text>
            <Text>{expandedSections.businessReg ? '-' : '+'}</Text>
          </TouchableOpacity>
          {expandedSections.businessReg && (
            <View>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>Registered Business Name</Text>
                <TextInput
                  style={styles.input}
                  value={businessReg.registeredBusinessName}
                  onChangeText={text =>
                    setBusinessReg(prev => ({
                      ...prev,
                      registeredBusinessName: text,
                    }))
                  }
                  placeholder="Enter Business Name"
                />
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>Registered Phone Number</Text>
                <TextInput
                  style={styles.input}
                  value={businessReg.registeredPhoneNumber}
                  onChangeText={text =>
                    setBusinessReg(prev => ({
                      ...prev,
                      registeredPhoneNumber: text,
                    }))
                  }
                  placeholder="Enter Phone Number"
                />
              </View>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>Registered Address</Text>
                <TextInput
                  style={styles.input}
                  value={businessReg.registeredAddress}
                  onChangeText={text =>
                    setBusinessReg(prev => ({
                      ...prev,
                      registeredAddress: text,
                    }))
                  }
                  placeholder="Enter Address"
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
                />
              </View>
              <TouchableOpacity
                style={[styles.itemRow, styles.submitButton]}
                onPress={handleBusinessRegistration}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Domain Settings Section */}
        <View style={styles.subSection}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('domainSettings')}
          >
            <Text style={styles.subSectionTitle}>Domain Settings</Text>
            <Text>{expandedSections.domainSettings ? '-' : '+'}</Text>
          </TouchableOpacity>
          {expandedSections.domainSettings && (
            <View>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>Current Domain</Text>
                <TextInput
                  style={styles.input}
                  value={domainSettings.currentDomain}
                  onChangeText={text =>
                    setDomainSettings(prev => ({
                      ...prev,
                      currentDomain: text,
                    }))
                  }
                  editable={false}
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
                  editable={false}
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
                  editable={false}
                />
              </View>
              <TouchableOpacity
                style={[styles.itemRow, styles.submitButton]}
                onPress={handleDomainSettings}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    margin: 8,
    padding: 12,
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
});

export default StoreInformation;

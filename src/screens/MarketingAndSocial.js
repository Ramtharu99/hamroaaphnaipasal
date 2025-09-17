import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const socialIcons = {
  Facebook: require('../../assets/images/facebook.png'),
  Instagram: require('../../assets/images/instagram.png'),
  YouTube: require('../../assets/images/youtube.png'),
  WhatsApp: require('../../assets/images/whatsapp.png'),
  TikTok: require('../../assets/images/tik-tok.png'),
};


const initialSocialData = [
  {
    title: 'Facebook',
    value: 'https://www.facebook.com/',
    icon: socialIcons.Facebook,
  },
  {
    title: 'Instagram',
    value: 'https://www.instagram.com/',
    icon: socialIcons.Instagram,
  },
  {
    title: 'YouTube',
    value: 'https://www.youtube.com/',
    icon: socialIcons.YouTube,
  },
  {
    title: 'WhatsApp',
    value: 'https://www.web.whatsapp.com/',
    icon: socialIcons.WhatsApp,
  },
  {
    title: 'TikTok',
    value: 'https://www.tiktok.com/',
    icon: socialIcons.TikTok,
  },
];

// Initial FAQ data
const initialFAQData = [
  {
    sn: 1,
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, MasterCard, PayPal.',
    createdAt: '2025-07-06 06:25:37',
    updatedAt: '2025-07-06 06:25:37',
  },
];

const MarketingAndSocial = ({ navigation }) => {
  const [socialData, setSocialData] = useState(initialSocialData);
  const [newSocial, setNewSocial] = useState('');
  const [faqData, setFaqData] = useState(initialFAQData);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });
  const [expandedSections, setExpandedSections] = useState({
    social: false,
    faq: false,
  });

  const toggleSection = section => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addSocialMedia = () => {
    if (!newSocial) return;
    const icon = socialIcons[newSocial] || null;
    setSocialData([...socialData, { title: newSocial, value: '', icon }]);
    setNewSocial('');
  };

  const updateSocialMedia = (index, value) => {
    const newData = [...socialData];
    newData[index].value = value;
    setSocialData(newData);
  };

  const deleteSocialMedia = index => {
    const newData = [...socialData];
    newData.splice(index, 1);
    setSocialData(newData);
  };

  const addFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) return;
    const newFaq = {
      sn: faqData.length + 1,
      question: newFAQ.question,
      answer: newFAQ.answer,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    setFaqData([...faqData, newFaq]);
    setNewFAQ({ question: '', answer: '' });
  };

  const deleteFAQ = index => {
    const newData = [...faqData];
    newData.splice(index, 1);
    setFaqData(newData.map((item, i) => ({ ...item, sn: i + 1 })));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F8FA' }}>
      <ScrollView
        contentContainerStyle={{ padding: 8 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Go Back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Text>
            <Text style={{ fontSize: 25 }}>← </Text>Go Back
          </Text>
        </TouchableOpacity>

        {/* Social Media Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('social')}
          >
            <Text style={styles.sectionTitle}>Social Media</Text>
            <Text>{expandedSections.social ? '-' : '+'}</Text>
          </TouchableOpacity>

          {expandedSections.social && (
            <>
              {socialData.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemLeft}>
                    {item.icon && (
                      <Image source={item.icon} style={styles.icon} />
                    )}
                    <Text style={styles.itemTitle}>{item.title}</Text>
                  </View>
                  <TextInput
                    value={item.value}
                    onChangeText={text => updateSocialMedia(index, text)}
                    style={styles.input}
                    placeholder="Enter URL"
                  />
                  <TouchableOpacity onPress={() => deleteSocialMedia(index)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={styles.addSocialContainer}>
                <TextInput
                  placeholder="Add Social Media"
                  style={styles.input}
                  value={newSocial}
                  onChangeText={setNewSocial}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addSocialMedia}
                >
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => toggleSection('faq')}
          >
            <Text style={styles.sectionTitle}>FAQ Management</Text>
            <Text>{expandedSections.faq ? '-' : '+'}</Text>
          </TouchableOpacity>

          {expandedSections.faq && (
            <>
              <View style={styles.faqHeader}>
                <TextInput
                  placeholder="New Question"
                  style={[styles.searchInput, { flex: 1, marginRight: 8 }]}
                  value={newFAQ.question}
                  onChangeText={text =>
                    setNewFAQ(prev => ({ ...prev, question: text }))
                  }
                />
                <TextInput
                  placeholder="New Answer"
                  style={[styles.searchInput, { flex: 1, marginRight: 8 }]}
                  value={newFAQ.answer}
                  onChangeText={text =>
                    setNewFAQ(prev => ({ ...prev, answer: text }))
                  }
                />
                <TouchableOpacity style={styles.addFAQButton} onPress={addFAQ}>
                  <Text style={styles.addButtonText}>+ Add FAQ</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>SN</Text>
                <Text style={styles.headerText}>Question</Text>
                <Text style={styles.headerText}>Answer</Text>
                <Text style={styles.headerText}>Created</Text>
                <Text style={styles.headerText}>Updated</Text>
                <Text style={styles.headerText}>Action</Text>
              </View>

              {faqData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.cell}>{item.sn}</Text>
                  <Text style={styles.cell}>{item.question}</Text>
                  <Text style={styles.cell}>{item.answer}</Text>
                  <Text style={styles.cell}>{item.createdAt}</Text>
                  <Text style={styles.cell}>{item.updatedAt}</Text>
                  <TouchableOpacity onPress={() => deleteFAQ(index)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  goBackButton: { padding: 10,width: 150 },
  section: {
    backgroundColor: '#E6F0EC',
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#DDECE5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  sectionTitle: {
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
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemTitle: { fontSize: 14, color: '#333', marginLeft: 8 },
  icon: { width: 20, height: 20, resizeMode: 'contain' },
  input: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  deleteText: { color: 'red', marginLeft: 8 },
  addSocialContainer: { flexDirection: 'row', marginTop: 12 },
  addButton: {
    backgroundColor: '#1BB83A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 8,
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  faqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  addFAQButton: {
    backgroundColor: '#1BB83A',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    justifyContent: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: { flex: 1, fontWeight: '600', color: '#666' },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  cell: { flex: 1, color: '#333' },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
  },
});

export default MarketingAndSocial;

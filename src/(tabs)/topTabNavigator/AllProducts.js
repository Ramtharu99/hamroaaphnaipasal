import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast, { BaseToast } from 'react-native-toast-message';

const AllProducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
    stock: '',
  });
  const [backConfirmVisible, setBackConfirmVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setProducts(prev => [...prev]);
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = [
        {
          id: '1',
          name: 'Smartphone X',
          price: '$499.99',
          imageUrl:
            'https://images.pexels.com/photos/603022/pexels-photo-603022.jpeg',
          description: 'Latest model with 5G support',
          stock: '150',
        },
        {
          id: '2',
          name: 'Wireless Earbuds',
          price: '$89.99',
          imageUrl: 'https://via.placeholder.com/100',
          description: 'Noise-canceling earbuds',
          stock: '300',
        },
        {
          id: '3',
          name: 'Laptop Pro',
          price: '$1299.99',
          imageUrl: 'https://via.placeholder.com/100',
          description: 'High-performance laptop',
          stock: '75',
        },
        {
          id: '4',
          name: 'Smart Watch',
          price: '$199.99',
          imageUrl: 'https://via.placeholder.com/100',
          description: 'Fitness tracking watch',
          stock: '200',
        },
      ];
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const handleDelete = index => {
    setProducts(prev => prev.filter((_, i) => i !== index));
    showToast('Product deleted successfully!');
  };

  const handleEdit = index => {
    setEditIndex(index);
    setNewProduct({ ...products[index] });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (editIndex !== null) {
      setProducts(prev => {
        const newProducts = [...prev];
        newProducts[editIndex] = newProduct;
        return newProducts;
      });
      showToast('Product updated successfully!');
    } else {
      setProducts(prev => [
        ...prev,
        { ...newProduct, id: (prev.length + 1).toString() },
      ]);
      showToast('Product added successfully!');
    }
    setModalVisible(false);
    setEditIndex(null);
    setNewProduct({
      name: '',
      price: '',
      imageUrl: '',
      description: '',
      stock: '',
    });
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

  const customToast = props => (
    <BaseToast
      {...props}
      style={styles.toast}
      contentContainerStyle={styles.toastContent}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  );

  const confirmBack = () => {
    navigation.goBack();
    setBackConfirmVisible(false);
  };

  const cancelBack = () => {
    setBackConfirmVisible(false);
  };

  const renderProductItem = ({ item, index }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.cardText}>Name: {item.name}</Text>
          <Text style={styles.cardText}>Price: {item.price}</Text>
          <Text style={styles.cardText}>Description: {item.description}</Text>
          <Text style={styles.cardText}>Stock: {item.stock}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEdit(index)}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(index)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {/* Back Button */}
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Back Confirmation Modal */}
          <Modal
            transparent={true}
            visible={backConfirmVisible}
            onRequestClose={() => setBackConfirmVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.confirmModalContent}>
                <Text style={styles.confirmModalTitle}>Confirm Navigation</Text>
                <Text style={styles.confirmModalText}>
                  Are you sure you want to go back? Unsaved changes may be lost.
                </Text>
                <View style={styles.confirmModalActions}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={confirmBack}
                  >
                    <Text style={styles.buttonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={cancelBack}
                  >
                    <Text style={styles.buttonText}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Products</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setEditIndex(null);
                setNewProduct({
                  name: '',
                  price: '',
                  imageUrl: '',
                  description: '',
                  stock: '',
                });
                setModalVisible(true);
              }}
            >
              <Text style={styles.addButtonText}>+ Add New</Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search product name..."
            value={filterText}
            onChangeText={setFilterText}
            placeholderTextColor="#6B7280"
          />

          {/* categories and attribute section */}

          {/* Products List */}
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            ListFooterComponent={
              <Text style={styles.pagination}>
                Showing {filteredProducts.length} of {products.length} products
              </Text>
            }
          />

          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  {editIndex !== null ? 'Edit Product' : 'Add Product'}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={newProduct.name}
                  onChangeText={text =>
                    setNewProduct(prev => ({ ...prev, name: text }))
                  }
                  placeholderTextColor="#6B7280"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price (e.g., $499.99)"
                  value={newProduct.price}
                  onChangeText={text =>
                    setNewProduct(prev => ({ ...prev, price: text }))
                  }
                  placeholderTextColor="#6B7280"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Image URL"
                  value={newProduct.imageUrl}
                  onChangeText={text =>
                    setNewProduct(prev => ({ ...prev, imageUrl: text }))
                  }
                  placeholderTextColor="#6B7280"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  value={newProduct.description}
                  onChangeText={text =>
                    setNewProduct(prev => ({ ...prev, description: text }))
                  }
                  placeholderTextColor="#6B7280"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChangeText={text =>
                    setNewProduct(prev => ({ ...prev, stock: text }))
                  }
                  placeholderTextColor="#6B7280"
                />
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Toast Component */}
          <Toast config={{ success: customToast }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  cardText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
    borderColor: 'gray',
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
  },

  actionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  pagination: {
    textAlign: 'center',
    marginTop: 10,
    color: '#6B7280',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmModalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  confirmModalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 10,
  },
  confirmModalText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 15,
  },
  confirmModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  toast: {
    borderLeftWidth: 0,
    height: 60,
    width: '90%',
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
  toastContent: {
    paddingHorizontal: 15,
  },
  toastText1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  toastText2: {
    fontSize: 14,
    color: '#FFF',
  },
  smallButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  smallButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  childrenBox: {
    marginTop: 8,
    backgroundColor: '#F3F4F6',
    padding: 8,
    borderRadius: 6,
    zIndex: 50,
  },
  childItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
});

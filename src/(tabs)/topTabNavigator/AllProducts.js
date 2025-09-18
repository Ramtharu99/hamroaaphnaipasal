import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
  Modal,
  SafeAreaView,
} from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

const AllProducts = () => {
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
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
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
    <SafeAreaView style={styles.container}>
      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search product name..."
        placeholderTextColor="#6B7280"
        value={filterText}
        onChangeText={setFilterText}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
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
        }
        ListFooterComponent={
          <Text style={styles.pagination}>
            Showing {filteredProducts.length} of {products.length} products
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Add/Edit Modal */}
      <Modal
        transparent
        animationType="slide"
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
              placeholderTextColor="#6B7280"
              value={newProduct.name}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, name: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              placeholderTextColor="#6B7280"
              value={newProduct.price}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, price: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Image URL"
              placeholderTextColor="#6B7280"
              value={newProduct.imageUrl}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, imageUrl: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#6B7280"
              value={newProduct.description}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, description: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Stock"
              placeholderTextColor="#6B7280"
              value={newProduct.stock}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, stock: text }))
              }
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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

      <Toast config={{ success: customToast }} />
    </SafeAreaView>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  addButton: { backgroundColor: '#10B981', padding: 10, borderRadius: 6 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardRow: { flexDirection: 'row', marginBottom: 10 },
  productImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  productDetails: { flex: 1 },
  cardText: { fontSize: 14, marginBottom: 5 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  editButton: {
    padding: 6,
    borderRadius: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'gray',
    width: 40
  },
  deleteButton: { backgroundColor: '#EF4444', padding: 6, borderRadius: 4 },
  actionText: { color: 'black', },
  deleteButtonText: { color: '#fff' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
    color: '#000',
  },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    padding: 10,
    marginRight: 5,
    borderRadius: 6,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 10,
    marginLeft: 5,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
  toast: {
    borderLeftWidth: 0,
    height: 60,
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
  toastContent: { paddingHorizontal: 15 },
  toastText1: { fontSize: 16, fontWeight: '600', color: '#fff' },
  toastText2: { fontSize: 14, color: '#fff' },
  pagination: { textAlign: 'center', marginTop: 10, color: '#6B7280' },
});

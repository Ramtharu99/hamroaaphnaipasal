import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log('Refreshed');
      setRefreshing(false);
    }, 1500);
  };

  useEffect(() => {
    const initialProducts = [
      {
        id: '1',
        name: 'Smartphone X',
        price: '$499.99',
        imageUrl: '',
        description: 'Latest 5G model',
        stock: '150',
      },
      {
        id: '2',
        name: 'Wireless Earbuds',
        price: '$89.99',
        imageUrl: '',
        description: 'Noise-canceling',
        stock: '300',
      },
    ];
    setProducts(initialProducts);
  }, []);

  // Pick Image
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.errorCode) {
        setNewProduct(prev => ({ ...prev, imageUrl: response.assets[0].uri }));
      }
    });
  };

  const saveProductToBackend = async product => {
    try {
      const response = await fetch('https://your-api-url.com/products', {
        method: editIndex !== null ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const data = await response.json();
      console.log('Backend response:', data);
      return data;
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong while saving to backend.');
    }
  };

  // Save Product
  const handleSave = async () => {
    if (!newProduct.name.trim()) {
      Alert.alert('Validation', 'Product name is required!');
      return;
    }
    if (!newProduct.price.trim()) {
      Alert.alert('Validation', 'Product price is required!');
      return;
    }
    if (!newProduct.description.trim()) {
      Alert.alert('Validation', 'Product description is required!');
      return;
    }
    if (!newProduct.stock.trim()) {
      Alert.alert('Validation', 'Product stock is required!');
      return;
    }
    if (!newProduct.imageUrl) {
      Alert.alert('Validation', 'Please select an image!');
      return;
    }

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
    } else {
      setProducts(prev => [
        ...prev,
        { ...newProduct, id: (prev.length + 1).toString() },
      ]);
    }

    await saveProductToBackend(newProduct);

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

  const handleEdit = index => {
    setEditIndex(index);
    setNewProduct({ ...products[index] });
    setModalVisible(true);
  };

  const handleDelete = index => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setProducts(prev => prev.filter((_, i) => i !== index)),
        },
      ],
    );
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      ) : (
        <View
          style={[
            styles.productImage,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E5E7EB',
            },
          ]}
        >
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>Name: {item.name}</Text>
        <Text style={styles.cardText}>Price: {item.price}</Text>
        <Text style={styles.cardText}>Description: {item.description}</Text>
        <Text style={styles.cardText}>Stock: {item.stock}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEdit(index)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(index)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>📦 All Products</Text>
        <TouchableOpacity
          style={styles.addButtonSide}
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
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search product..."
        placeholderTextColor="gray"
        value={filterText}
        onChangeText={setFilterText}
      />

      <FlatList
        data={products.filter(p =>
          p.name.toLowerCase().includes(filterText.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Modal */}
      <Modal transparent animationType="slide" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit Product' : 'Add Product'}
            </Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={newProduct.name}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, name: text }))
              }
              placeholder="Enter product name"
              placeholderTextColor="gray"
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={newProduct.price}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, price: text }))
              }
              placeholder="Enter price"
              placeholderTextColor="gray"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={newProduct.description}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, description: text }))
              }
              placeholder="Enter description"
              placeholderTextColor="gray"
            />

            <Text style={styles.label}>Stock</Text>
            <TextInput
              style={styles.input}
              value={newProduct.stock}
              onChangeText={text =>
                setNewProduct(prev => ({ ...prev, stock: text }))
              }
              placeholder="Enter stock quantity"
              placeholderTextColor="gray"
            />

            <Text style={styles.label}>Image</Text>
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              <Text style={styles.imagePickerText}>
                {newProduct.imageUrl ? 'Change Image' : 'Pick Image'}
              </Text>
            </TouchableOpacity>

            {/* Save and Cancel */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>
                  {editIndex !== null ? 'Update' : 'Save'}
                </Text>
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
    </View>
  );
};

export default AllProducts;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#E7EEE6" },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#111827' },
  addButtonSide: {
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
  },
  productImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  cardContent: { flex: 1 },
  cardText: { fontSize: 14, color: '#374151', marginBottom: 4 },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  editButtonText: { color: 'black', fontWeight: '600' },
  deleteButton: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButtonText: { color: '#fff', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  imagePickerButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagePickerText: { color: '#fff', fontWeight: '600' },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    padding: 10,
    marginRight: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    padding: 10,
    marginLeft: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 14 },
});

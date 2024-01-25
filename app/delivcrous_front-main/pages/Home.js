import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import categories from '../assets/data/categories';
import AddRemoveButtons from '../components/AddRemovebuttons';

const config = require('../config.json');
const backendUrlPlat = "http://" + config.Ipv4 + ":8080/api/plats/getplats";


const colors = {
  backgroundColor: '#F5F5F5',
  textColor: '#333',
  categoryButtonColor: '#FFFFFF',
  selectedCategoryButtonColor: '#FFC700',
  borderColor: '#E0E0E0',
  searchInputBorder: 1,
  buttonBackground: '#FFC700',
  buttonTextColor: 'black',
};

export default function Home() {
  const [categoriesdata, setCategoriesdata] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    axios.get(backendUrlPlat)
      .then((response) => {
        const data = response.data;
        setCategoriesdata(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des plats:', error);
      });
  }, []);

  const renderCategoriesItem = ({ item }) => {
    const itemQuantity = cartItems.filter((cartItem) => cartItem.id === item.id).length;

    return (
      <View style={styles.categoryCard}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <TouchableOpacity style={styles.categoryInfo} onPress={() => handleCategoryPress(item)}>
          <Text style={styles.categoryTitle}>{item.title}</Text>
          <Text style={styles.categoryDescr}>{item.description}</Text>
          <Text style={styles.categoriePrice}>{`${item.prix}€`}</Text>
        </TouchableOpacity>
        {itemQuantity > 0 ? (
          <AddRemoveButtons
            itemQuantity={itemQuantity}
            removeFromCart={() => removeFromCart(item)}
            addToCart={() => addToCart(item)}
          />
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
            <Text style={styles.ButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleCategoryPress = (item) => {
    navigation.push('DataDetails', { item, cartItems, setCartItems });
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const filteredCategoriesData = selectedCategory
    ? categoriesdata.filter((item) => item.category === selectedCategory)
    : categoriesdata;

  const filteredDataBySearch = filteredCategoriesData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        <Text style={styles.CategoryText}>Catégories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.category
                  ? styles.selectedCategoryButton
                  : styles.unselectedCategoryButton,
              ]}
              onPress={() => handleCategoryToggle(category.category)}
            >
              <Text style={styles.categoryButtonText}>{category.category}</Text>
              <Image source={category.image} style={styles.logoCategory} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.categoriestext}>La carte</Text>
        <View style={styles.popularWrapper}>
          {filteredDataBySearch.map((item) => (
            <View key={item.id} style={styles.popularCardWrapper}>
              {renderCategoriesItem({ item })}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.push('Panier', { cartItems, setCartItems })}
      >
        <Feather name="shopping-cart" size={24} color="black" />
        {cartItems.length > 0 && (
          <View style={styles.cartCounter}>
            <Text style={styles.cartCounterText}>{cartItems.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
  },
  categoriestext: {
    fontWeight: 'semibold',
    fontSize: 30,
    marginVertical: 20,
    marginLeft: 20,
  },
  popularWrapper: {
    paddingHorizontal: 20,
    ...(Platform.OS === 'web' ? { flexDirection: 'row', flexWrap: 'wrap' } : {}),
  },
  popularCardWrapper: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'relative',
    ...(Platform.OS === 'web' ? { width: 'calc(33.33% - 14px)', margin: '7px' } : {}),
  },
  categoryCard: {
    paddingTop: 10,
    paddingBottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  categoryInfo: {
    paddingLeft: 10,
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  categoryDescr: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 15,
    color: '#777',
  },
  categoriePrice: {
    paddingTop: 5,
    paddingBottom: 10,
    left: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#777',
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.buttonBackground,
    width: 85,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.buttonTextColor,
  },
  adddelButton: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 85,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adddelstyleButton: {
    backgroundColor: colors.buttonBackground,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  quantityText: {
    padding: 8,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FF9900',
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  cartCounter: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  cartCounterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  categoryButton: {
    height: 100,
    width: 130,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.categoryButtonColor,
    borderWidth: 1,
    borderColor: colors.borderColor,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? { width: 220 } : {}),
  },
  selectedCategoryButton: {
    backgroundColor: colors.selectedCategoryButtonColor,
  },
  categoryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderBottomWidth: colors.searchInputBorder,
  },
  logoCategory: {
    height: 50,
    width: 50,
  },
  CategoryText: {
    fontWeight: 'semibold',
    fontSize: 30,
    marginVertical: 20,
    marginLeft: 20,
  },
});

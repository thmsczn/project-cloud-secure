import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInputBase } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Panier({ route, isconnected }) {
  const { cartItems } = route.params;
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const config = require('../config.json');
  const [soldeCrous, setSoldeCrous] = useState(null);

  useEffect(() => {
    const fetchSoldeCrous = async () => {
      try {
        const solde = await AsyncStorage.getItem('solde');
        if (solde) {
          setSoldeCrous(solde);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du solde depuis AsyncStorage :', error);
      }
    };

    fetchSoldeCrous();

    const groupedCart = cartItems.reduce((acc, item) => {
      const existingItem = acc.find((group) => group.item.id === item.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        acc.push({ item, count: 1 });
      }
      return acc;
    }, []);

    setCart(groupedCart);
  }, [cartItems]);

  const removeFromCart = (item) => {
    const updatedCart = cart.filter((group) => group.item.id !== item.item.id);
    updateCartAndRoute(updatedCart);
  };

  const incrementCount = (item) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((group) => group.item.id === item.item.id);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].count += 1;
    }
    updateCartAndRoute(updatedCart);
  };

  const decrementCount = (item) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((group) => group.item.id === item.item.id);
    if (itemIndex !== -1 && updatedCart[itemIndex].count > 1) {
      updatedCart[itemIndex].count -= 1;
    } else if (itemIndex !== -1) {
      updatedCart.splice(itemIndex, 1);
    }
    updateCartAndRoute(updatedCart);
  };

  const updateCartAndRoute = (updatedCart) => {
    setCart(updatedCart);

    const updatedItems = updatedCart.reduce((acc, group) => {
      acc.push(...Array(group.count).fill(group.item));
      return acc;
    }, []);
    route.params.setCartItems(updatedItems);
  };

  const totalAmount = cart.reduce((total, itemGroup) => total + itemGroup.count * itemGroup.item.prix, 0);

  const createOrder = async () => {
    const address = await AsyncStorage.getItem('adresse');
    const status = "en cours";
    const orderDate = new Date().toISOString();
    const dishes = [];
    const userToken = await AsyncStorage.getItem('jwtToken');
    const userId = await AsyncStorage.getItem('userId');

    cart.forEach((itemGroup) => {
      for (let i = 0; i < itemGroup.count; i++) {
        dishes.push({ id: itemGroup.item.id });
      }
    });

    try {

      const response = await axios.post(
        `http://` + config.Ipv4 + `:8080/api/commandes/createcommande?user_id=${userId}`,
        {
          adresse_livraison: address,
          status: status,
          date_commande: orderDate,
          plats: dishes,
          user_id: userId
        },
        {
          headers: {
            Cookie: `delivcrous=${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );


      console.log('Commande créée avec succès', response.data);

      route.params.setCartItems([])

      navigation.navigate('PageConfirmation', { cart, totalAmount })

    } catch (error) {
      console.error("Erreur lors de la création de la commande :", error);

    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>
      <Text style={styles.textSolde}>Mon solde : {soldeCrous}€</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(group) => group.item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.item.title}</Text>
              <View style={styles.counterContainer}>
                <Text style={styles.itemprice}>{item.item.prix}€</Text>
                <TouchableOpacity
                  style={styles.decrementButton}
                  onPress={() => decrementCount(item)}
                >
                  <Feather name="minus" size={18} color="black" />
                </TouchableOpacity>
                <Text style={styles.itemCountText}>{item.count}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => incrementCount(item)}
                >
                  <Feather name="plus" size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item)}
                >
                  <Feather name="trash-2" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {cart.length > 0 && (
        <TouchableOpacity
          style={styles.validateButton}
          onPress={() =>
            isconnected
              ? createOrder()
              : navigation.navigate('PageLogin')
          }
        >
          <Text style={styles.validateButtonText}>
            {isconnected
              ? 'Valider le panier'
              : 'Me connecter et valider le panier'}{' '}
            : {totalAmount}€
          </Text>
        </TouchableOpacity>

      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textSolde: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    paddingBottom: 10

  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemName: {
    fontSize: 18,
  },
  removeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemprice: {
    fontSize: 18,
    paddingRight: 10,
  },
  itemCountText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    paddingRight: 10,
  },
  decrementButton: {
    paddingLeft: 10,
  },
  validateButton: {
    backgroundColor: '#FFC700',
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateButtonText: {
    paddingLeft: 10,
    fontSize: 18,
  },
});

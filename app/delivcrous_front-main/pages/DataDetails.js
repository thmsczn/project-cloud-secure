import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AddRemoveButtons from '../components/AddRemovebuttons';

export default function DataDetails({ route }) {
  const { item, cartItems } = route.params;
  const [cart, setCart] = useState([]);

  // Effect to group cart items
  useEffect(() => {
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

  const cartItemQuantity = cart.find((cartItem) => cartItem.item.id === item.id)?.count || 0;

  const incrementCount = (item) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((group) => group.item.id === item.id);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].count += 1;
    } else {
      updatedCart.push({ item, count: 1 });
    }
    setCart(updatedCart);

    const updatedItems = updatedCart.reduce((acc, group) => {
      acc.push(...Array(group.count).fill(group.item));
      return acc;
    }, []);
    route.params.setCartItems(updatedItems);
  };

  const decrementCount = (item) => {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((group) => group.item.id === item.id);
    if (itemIndex !== -1 && updatedCart[itemIndex].count > 1) {
      updatedCart[itemIndex].count -= 1;
    } else if (itemIndex !== -1) {
      updatedCart.splice(itemIndex, 1);
    }
    setCart(updatedCart);

    const updatedItems = updatedCart.reduce((acc, group) => {
      acc.push(...Array(group.count).fill(group.item));
      return acc;
    }, []);
    route.params.setCartItems(updatedItems);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.center}>
        <Text style={styles.detailsTitre}>{item.title}</Text>
        <Image source={{ uri: item.image }} style={styles.detailsImage} resizeMode="contain" />
        <Text style={styles.detailsDescr}>{item.description}</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.titleAllergene}>Allergènes :</Text>
        <Text style={styles.listeAllergene}>{item.allergenes}</Text>
        <Text style={styles.priceDetails}>{item.prix}€</Text>
      </View>
      {cartItemQuantity > 0 ? (
        <View style={styles.addOrder}>
          <Text style={styles.addOrderText}>Article ajouté au panier !</Text>
          <View style={styles.adddelButton}>
            <AddRemoveButtons
              itemQuantity={cartItemQuantity}
              removeFromCart={() => decrementCount(item)}
              addToCart={() => incrementCount(item)}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.addToCartButton} onPress={() => incrementCount(item)}>
          <Feather name="shopping-cart" size={24} />
          <Text style={styles.addToCartButtonText}>Ajouter au panier</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  center: {
    alignItems: 'center',
  },
  detailsTitre: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailsImage: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  detailsDescr: {
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 20,
    textAlign: 'center',
  },
  price: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  titleAllergene: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listeAllergene: {
    fontSize: 16,
    marginTop: 5,
  },
  priceDetails: {
    marginTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#FFC700',
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    paddingLeft: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  addOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    justifyContent: 'center',
  },
  addOrderText: {
    fontSize: 20,
    paddingRight: 10,
  },
  adddelButton: {
    width: 85,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  quantityText: {
    padding: 8,
  },
});

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const AddRemoveButtons = ({ itemQuantity, removeFromCart, addToCart }) => {
  return (
    <View style={styles.adddelButton}>
      <TouchableOpacity
        style={styles.adddelstyleButton}
        onPress={() => {
          removeFromCart();
        }}
      >
        <Feather name='minus' size={15}/>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{itemQuantity}</Text>
      <TouchableOpacity
        style={styles.adddelstyleButton}
        onPress={() => {
          addToCart();
        }}
      >
        <Feather name='plus' size={15}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#FFC700',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  quantityText: {
    padding: 8
  },
  ButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default AddRemoveButtons;

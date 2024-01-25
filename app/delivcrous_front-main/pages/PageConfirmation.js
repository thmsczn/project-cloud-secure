import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PageConfirmation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart, totalAmount } = route.params;


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="check" size={100} color="#4CAF50" style={styles.checkIcon} />
      </View>
      <Text style={styles.heading}>Commande Confirmée</Text>
      <Text style={styles.message}>
        Merci ! Votre commande a bien été enregistrée.
      </Text>

      <View style={styles.orderSummary}>
        <Text style={styles.orderSummaryText}>Récapitulatif de la commande :</Text>
        {cart.map((itemGroup) => (
          <View key={itemGroup.item.id} style={styles.itemSummary}>
            <View style={styles.itemLeft}>
              <Text style={styles.itemSummaryCount}>{itemGroup.count}x</Text>
              <Text style={styles.itemSummaryTitle}>{itemGroup.item.title}</Text>
            </View>
            <Text style={styles.itemSummaryTotal}>{itemGroup.count * itemGroup.item.prix}€</Text>
          </View>
        ))}
        <Text style={styles.totalAmount}>Total : {totalAmount}€</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Carte')}
      >
        <Text style={styles.buttonText}>Terminer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: '#4CAF50',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  checkIcon: {
    color: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    color: '#666',
  },
  orderSummary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderSummaryText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  itemSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemLeft: {
    flexDirection: 'row',
  },
  itemSummaryCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  itemSummaryTitle: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  itemSummaryTotal: {
    fontSize: 16,
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
    right:0
  },
  button: {
    backgroundColor: '#FFC700', 
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default PageConfirmation;

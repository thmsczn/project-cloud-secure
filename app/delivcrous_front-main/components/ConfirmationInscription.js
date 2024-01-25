import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ConfirmationInscription = ({ visible, onContinue}) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.dialog}>
          <Feather name='smile' size={40}/>
          <Text style={styles.title}>Bravo ! Vous faites désormais partie de la famille Delivecrous !</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onContinue}>
              <Text style={styles.buttonText}>Réaliser ma première commande</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: 'center', // Centrer horizontalement
    justifyContent: 'center', // Centrer verticalement
  },
  title: {
    paddingTop:10,
    fontSize: 18,
    marginBottom: 20,
    textAlign:'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight:'bold'
  },
});

export default ConfirmationInscription;

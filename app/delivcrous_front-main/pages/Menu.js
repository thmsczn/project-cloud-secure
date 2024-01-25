import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ConfirmationDialog from '../components/ConfirmationDisconnected';
import { Feather } from '@expo/vector-icons';
import logo from '../assets/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menu = ({ isconnected, setIsConnected }) => {
  const navigation = useNavigation();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchData();
  }, []);

  const goToProfile = () => {
    navigation.navigate('MonCompte');
  };

  const goToOrders = () => {
    navigation.navigate('CommandesPage');
  };

  const logout = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirmLogout = () => {
    setIsConnected(false);
    navigation.navigate('Carte');
  };

  const handleCancelLogout = () => {
    setShowConfirmationDialog(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.positionlogo}>
        <Image source={logo} style={styles.taillelogo} />
        <Text style={styles.accueilText}>Bonjour {username}</Text>
      </View>
      <TouchableOpacity style={styles.menuItem} onPress={goToProfile}>
        <Text style={styles.menuItemText}>Mon Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={goToOrders}>
        <Text style={styles.menuItemText}>Mes Commandes</Text>
      </TouchableOpacity>

      <View style={styles.logoutButtonContainer}>
        <Feather name="log-out" size={20} />
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutButtonText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>

      <ConfirmationDialog
        visible={showConfirmationDialog}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  positionlogo: {
    alignItems: 'center',
  },
  taillelogo: {
    width: 50,
    height: 50,
  },
  menuItem: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  logoutButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    margin: 20,
    paddingVertical: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    flex: 1,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  accueilText: {
    fontSize: 30,
    paddingTop: 10,
    paddingBottom: 10,
  },
  menuItemText: {
    fontSize: 20,
  },
});

export default Menu;

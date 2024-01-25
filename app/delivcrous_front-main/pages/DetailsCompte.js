import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const MonCompte = () => {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const [solde, setSolde] = useState('');
    const [adresse, setAdresse] = useState('');
    const [tel, setTel] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const storedUserEmail = await AsyncStorage.getItem('userEmail');
            const storedUsername = await AsyncStorage.getItem('username');
            const storeSolde = await AsyncStorage.getItem('solde');
            const storeAdresse = await AsyncStorage.getItem('adresse');
            const storeTel = await AsyncStorage.getItem('tel');

            setUserEmail(storedUserEmail);
            setUsername(storedUsername);
            setSolde(storeSolde);
            setAdresse(storeAdresse);
            setTel(storeTel);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.userInfoTitle}>Mon Compte</Text>
            <View style={styles.userInfoItem}>
                <Feather name="user" size={24} style={styles.icon} />
                <Text style={styles.userInfoLabel}>Nom d'utilisateur:</Text>
                <Text style={styles.userInfoText}>{username}</Text>
            </View>

            <View style={styles.userInfoItem}>
                <Feather name="mail" size={24} style={styles.icon} />
                <Text style={styles.userInfoLabel}>Adresse e-mail:</Text>
                <Text style={styles.userInfoText}>{userEmail}</Text>
            </View>

            <View style={styles.userInfoItem}>
                <Feather name="dollar-sign" size={24} style={styles.icon} />
                <Text style={styles.userInfoLabel}>Solde:</Text>
                <Text style={styles.userInfoText}>{solde} €</Text>
            </View>

            <View style={styles.userInfoItem}>
                <Feather name="map-pin" size={24} style={styles.icon} />
                <Text style={styles.userInfoLabel}>Adresse:</Text>
                <Text style={styles.userInfoText}>{adresse}</Text>
            </View>

            <View style={styles.userInfoItem}>
                <Feather name="phone" size={24} style={styles.icon} />
                <Text style={styles.userInfoLabel}>Téléphone:</Text>
                <Text style={styles.userInfoText}>{tel}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    userInfoTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    userInfoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 15,
        color: '#007bff',
    },
    userInfoLabel: {
        fontWeight: 'bold',
        width: 140,
        fontSize: 18,
        color: '#333',
    },
    userInfoText: {
        flex: 1,
        fontSize: 18,
        color: '#333',
    },
});

export default MonCompte;

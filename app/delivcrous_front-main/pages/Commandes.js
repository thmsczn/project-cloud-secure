import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommandesPage = () => {
    const [commandes, setCommandes] = useState([]);
    const config = require('../config.json');

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const userToken = await AsyncStorage.getItem('jwtToken');
                const userId = await AsyncStorage.getItem('userId');
                const response = await axios.get(`http://`+config.Ipv4+`:8080/api/commandes/getcommande?user_id=${userId}`, {
                    headers: {
                        Cookie: `delivcrous=${userToken}`,
                    },
                });

                // Reformatter la date de chaque commande
                const formattedCommandes = response.data.map(commande => {
                    const dateCommande = new Date(commande.date_commande);
                    const jour = dateCommande.getDate();
                    const mois = dateCommande.getMonth() + 1;
                    const annee = dateCommande.getFullYear();
                    commande.date_commande = `${jour < 10 ? '0' : ''}${jour}/${mois < 10 ? '0' : ''}${mois}/${annee}`;
                    return commande;
                });

                setCommandes(formattedCommandes);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes :", error);
            }
        };

        fetchCommandes();
    }, []);

    const calculateTotalPrice = (plats) => {
        return plats.reduce((total, plat) => total + plat.prix, 0);
    };

    const renderItem = ({ item }) => (
        <View style={styles.commandeContainer}>
            <Text style={styles.commandeTitle}>Commande #{item.commande_id}</Text>
            <Text style={styles.commandeText}>
                <Text style={styles.subtitle}>Date de commande:</Text> {item.date_commande}
            </Text>
            <Text style={styles.commandeText}>
                <Text style={styles.subtitle}>Adresse de livraison:</Text> {item.adresse_livraison}
            </Text>
            <Text style={styles.commandeText}>
                <Text style={styles.subtitle}>Statut:</Text> {item.status}
            </Text>
            <Text style={styles.commandeText}>Détails de la commande: </Text>
            {item.plats.length > 0 && (
                <View style={styles.platsContainer}>
                    {item.plats.map((plat) => (
                        <View key={plat.id} style={styles.platContainer}>
                            <Text style={styles.platTitle}>{plat.title}</Text>
                            <Text style={styles.platPrice}>{plat.prix}€</Text>
                        </View>
                    ))}
                </View>
            )}
            <Text style={styles.totalPrice}>Total : {calculateTotalPrice(item.plats)}€</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Commandes</Text>
            <FlatList
                data={commandes}
                renderItem={renderItem}
                keyExtractor={(item) => item.commande_id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    commandeContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    commandeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    commandeText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500'
    },
    subtitle: {
        fontWeight: 'bold', // Style pour les sous-titres
    },
    platsContainer: {
        marginTop: 5,
    },
    platContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    platTitle: {
        fontSize: 16,
        color: '#333',
    },
    platPrice: {
        fontSize: 16,
        color: '#333',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
});

export default CommandesPage;

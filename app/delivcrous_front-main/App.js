import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PageCreationCompte from './pages/PageCreationCompte';
import Home from './pages/Home';
import logo from './assets/logo.png';
import DataDetails from './pages/DataDetails';
import { Feather } from "@expo/vector-icons";
import Panier from './pages/Panier';
import Menu from './pages/Menu';
import PageConfirmation from './pages/PageConfirmation';
import MonCompte from './pages/DetailsCompte';
import CommandesPage from './pages/Commandes';
import PageLogin from './pages/PageLogin';

const Stack = createStackNavigator();

const App = () => {
    const [isconnected, setIsConnected] = useState(false)

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Carte"
                    component={Home}
                    options={({ navigation }) => ({
                        headerTitle: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={logo}
                                    style={{ width: 30, height: 30, marginRight: 10 }}
                                />
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Delivecrous</Text>
                            </View>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: 15 }}
                                onPress={() => { isconnected ? (navigation.navigate('Menu')) : (navigation.navigate("PageLogin")) }}
                            >
                                <Feather name="user" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    })}
                />
                <Stack.Screen
                    name="Menu"
                    options={{
                        headerTitle: '',
                        headerStyle: {
                            backgroundColor: '#F5F5F5',

                        },
                    }}
                >
                    {props => <Menu {...props} isconnected={isconnected} setIsConnected={setIsConnected} />}
                </Stack.Screen>
                <Stack.Screen name="Panier" options={{ headerTitle: '', headerStyle: { backgroundColor: '#F5F5F5' }, }} >
                    {props => <Panier {...props} isconnected={isconnected} />}
                </Stack.Screen>
                <Stack.Screen name="DataDetails" options={{ headerTitle: '', headerStyle: { backgroundColor: '#F5F5F5', } }} component={DataDetails} />
                <Stack.Screen name="PageLogin" options={{ headerTitle: '', headerStyle: { backgroundColor: '#F5F5F5' }, }} >
                    {props => <PageLogin {...props} isconnected={isconnected} setIsConnected={setIsConnected} />}
                </Stack.Screen>
                <Stack.Screen name="PageCreationCompte" options={{ headerTitle: '', headerStyle: { backgroundColor: '#F5F5F5' }, }}>
                    {props => <PageCreationCompte {...props} isconnected={isconnected} setIsConnected={setIsConnected} />}
                </Stack.Screen>
                <Stack.Screen name="PageConfirmation" options={{ headerShown: "" }} component={PageConfirmation}>
                </Stack.Screen>
                <Stack.Screen name="MonCompte" options={{ headerTitle: '', headerStyle: { backgroundColor: '#F5F5F5', } }} component={MonCompte} />
                <Stack.Screen name="CommandesPage" options={{ headerTitle: '', headerStyle: { backgroundColor: '#F5F5F5', } }} component={CommandesPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

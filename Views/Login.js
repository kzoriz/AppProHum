import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import config from '../config/config.json';

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');

    useEffect(() => {
        if (loginMessage) {
            const messageTimeout = setTimeout(() => {
                setLoginMessage('');
            }, 5000);
            return () => clearTimeout(messageTimeout);
        }
    }, [loginMessage]);

    async function handleLogin() {
        if (!email || !password) {
            setLoginMessage('Preencha todos os campos para efetuar login.');
            return;
        }

        try {
            const response = await fetch(config.urlRootNode + 'login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailUser: email,
                    passwordUser: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setLoginMessage(data.message);
                navigation.navigate('ProtectedScreen');
            } else {
                setLoginMessage('Erro ao efetuar login. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao efetuar login:', error);
            setLoginMessage('Erro ao efetuar login. Tente novamente mais tarde.');
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{loginMessage}</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 300 }}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 300 }}
                    placeholder="Senha"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity
                    style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                    onPress={handleLogin}
                >
                    <Text style={{ color: 'white' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

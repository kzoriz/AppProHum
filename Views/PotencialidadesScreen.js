import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProtectedScreen() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('a Aréa de Alunos'); // Defina o nome do usuário aqui

    const handleLogout = () => {
        navigation.navigate('ProtectedScreen');
    };

    const handleCadastrarPotencialidadesPress = () => {
        navigation.navigate('CadastrarPotencialidades');
    };

    
    const handleBuscarPotencialidadesPress = () => {
        navigation.navigate('BuscarPotencialidades');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, {userName}!</Text>
            <View style={styles.buttonContainer}>               
        
                <ButtonSpacing />
                <Button
                    title="Cadastrar Potencialidades"
                    onPress={handleCadastrarPotencialidadesPress}

                    color="#3498db"
                />
                <ButtonSpacing />
                <Button
                    title="Buscar Potencialidades"
                    onPress={handleBuscarPotencialidadesPress}
                    color="#3498db"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Voltar"
                    onPress={handleLogout}
                    color="#e74c3c"
                />
            </View>
        </View>
    );
}

const ButtonSpacing = () => <View style={styles.buttonSpacing} />;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    buttonContainer: {
        marginTop: 30
    },
    buttonSpacing: {
        marginVertical: 20
    }
});

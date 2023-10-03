import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProtectedScreen() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('Usuário'); // Defina o nome do usuário aqui

    const handleLogout = () => {
        navigation.navigate('Login');
    };

    const handleCadastroAlunoPress = () => {
        navigation.navigate('AlunosScreen');
    };

    const handleAvaliacaoScreenPress = () => {
        navigation.navigate('AvaliacaoScreen');
    };

    const handleAcomodacaoPress = () => {
        navigation.navigate('AcomodacaoScreen');
    };

    const handlePotencialidadesScreenPress = () => {
        navigation.navigate('PotencialidadesScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, {userName}!</Text>
            <View style={styles.buttonContainer}>               
        
                <ButtonSpacing />
                <Button
                    title="Aréa de Alunos"
                    onPress={handleCadastroAlunoPress}

                    color="#3498db"
                />
                <ButtonSpacing />
                <Button
                    title="Area de Avalaição"
                    onPress={handleAvaliacaoScreenPress}
                    color="#3498db"
                />
                <ButtonSpacing />
                <Button
                    title="Area Acomodação"
                    onPress={handleAcomodacaoPress}
                    color="#3498db"
                />
                <ButtonSpacing />
                <Button
                    title="Area Potencialidades"
                    onPress={handlePotencialidadesScreenPress}

                    color="#3498db"
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Logout"
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

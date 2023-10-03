import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProtectedScreen() {
    const navigation = useNavigation();
    const [userName, setUserName] = useState('a Aréa de Alunos'); // Defina o nome do usuário aqui

    const handleLogout = () => {
        navigation.navigate('ProtectedScreen');
    };

    const handleCadastroAlunoPress = () => {
        navigation.navigate('AlunoCadastro');
    };

    
    const handleProcurarAlunoPress = () => {
        navigation.navigate('ProcurarAluno');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo, {userName}!</Text>
            <View style={styles.buttonContainer}>               
        
                <ButtonSpacing />
                <Button
                    title="Cadastrar de Aluno"
                    onPress={handleCadastroAlunoPress}

                    color="#3498db"
                />
                <ButtonSpacing />
                <Button
                    title="Procurar Aluno"
                    onPress={handleProcurarAlunoPress}
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

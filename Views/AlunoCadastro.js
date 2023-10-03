import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import config from '../config/config.json';

export default function CadastroAluno({ route }) {
    // Utilizando o hook 'useState' do React para gerenciar o estado 'nome_aluno'
    const [nome_aluno, setNomeAluno] = useState('');
    // Utilizando o hook 'useState' do React para gerenciar o estado 'errorMessage'
    const [errorMessage, setErrorMessage] = useState('');
    // Utilizando o hook 'useState' do React para gerenciar o estado 'successMessage'
    const [successMessage, setSuccessMessage] = useState('');

    // Utilizando o hook 'useEffect' do React para executar uma ação após renderização com 'errorMessage' alterado
    useEffect(() => {
        if (errorMessage) {
            // Definindo um temporizador para limpar 'errorMessage' após 5 segundos
            const errorTimeout = setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            // Retornando uma função para limpar o temporizador se 'errorMessage' mudar novamente antes de 5 segundos
            return () => clearTimeout(errorTimeout);
        }
    }, [errorMessage]);

    // Utilizando o hook 'useEffect' do React para executar uma ação após renderização com 'successMessage' alterado
    useEffect(() => {
        if (successMessage) {
            // Definindo um temporizador para limpar 'successMessage' após 5 segundos
            const successTimeout = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            // Retornando uma função para limpar o temporizador se 'successMessage' mudar novamente antes de 5 segundos
            return () => clearTimeout(successTimeout);
        }
    }, [successMessage]);

    // Definindo uma função chamada 'validateNameInput' que recebe 'text' como argumento
    const validateNameInput = (text) => {
        // Utilizando uma expressão regular para remover caracteres não alfabéticos de 'text'
        const lettersAndSpacesOnly = text.replace(/[^a-zA-Z\s]/g, '');
        // Atualizando o estado 'nome_aluno' com o valor sanitizado
        setNomeAluno(lettersAndSpacesOnly);
    };

    // Definindo uma função assíncrona chamada 'registerAluno'
    async function registerAluno() {
        // Verificando se todos os campos obrigatórios estão preenchidos
        if (!nome_aluno) {
            // Definindo uma mensagem de erro se algum campo estiver faltando
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Enviando uma requisição POST para um URL específico usando o fetch do JavaScript
            let response = await fetch(config.urlRootNode + 'createAluno', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_aluno: nome_aluno,
                }),
            });

            let json = await response.json();

            if (json.message) {
                setSuccessMessage(json.message);
                setNomeAluno('');
            } else if (json.error) {
                setErrorMessage(json.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#333' }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>Cadastro de Alunos</Text>
                <TextInput
                    style={{ marginTop: 20, width: 300, backgroundColor: '#fff', fontSize: 17, padding: 10 }}
                    placeholder="Nome do Aluno"
                    onChangeText={validateNameInput}
                    value={nome_aluno}
                />
                <TouchableOpacity style={{ marginTop: 20, width: 300, height: 42, backgroundColor: '#3498db', borderRadius: 4, alignItems: 'center', justifyContent: 'center' }} onPress={registerAluno}>
                    <Text style={{ fontSize: 16 }}>Cadastrar</Text>
                </TouchableOpacity>
                {errorMessage ? (
                    <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
                ) : null}
                {successMessage ? (
                    <Text style={{ color: 'green', marginTop: 10 }}>{successMessage}</Text>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
}
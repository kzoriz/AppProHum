// Importando o React e hooks específicos da biblioteca 'react'
import React, { useState, useEffect } from 'react';

// Importando componentes e configurações de outros arquivos
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import config from '../config/config.json';

// Definindo um componente funcional do React chamado 'Cadastro' com um parâmetro de propriedades 'route'
export default function Cadastro({ route }) {
    // Utilizando o hook 'useState' do React para gerenciar o estado 'user'
    const [user, setUser] = useState('');
    // Utilizando o hook 'useState' do React para gerenciar o estado 'password'
    const [password, setPassword] = useState('');
    // Utilizando o hook 'useState' do React para gerenciar o estado 'email'
    const [email, setEmail] = useState('');
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
        // Atualizando o estado 'user' com o valor sanitizado
        setUser(lettersAndSpacesOnly);
    };

    // Definindo uma função assíncrona chamada 'registerUser'
    async function registerUser() {
        // Verificando se todos os campos obrigatórios estão preenchidos
        if (!user || !email || !password) {
            // Definindo uma mensagem de erro se algum campo estiver faltando
            setErrorMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Enviando uma requisição POST para um URL específico usando o fetch do JavaScript
            let reqs = await fetch(config.urlRootNode + 'create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // Convertendo os dados para JSON antes de enviar
                body: JSON.stringify({
                    nameUser: user,
                    passwordUser: password,
                    emailUser: email,
                }),
            });

            // Verificando se a requisição foi bem-sucedida
            if (reqs.ok) {
                // Definindo uma mensagem de sucesso
                setSuccessMessage('Cadastro realizado com sucesso!');
                // Limpando os estados após um cadastro bem-sucedido
                setUser('');
                setEmail('');
                setPassword('');
            } else {
                // Lendo os dados de resposta como JSON em caso de erro
                const data = await reqs.json();
                // Definindo mensagens de erro com base na resposta
                if (data.error === 'Este email já está em uso.') {
                    setErrorMessage('Este email já está sendo usado.');
                } else {
                    setErrorMessage('Erro no cadastro. Tente novamente mais tarde.');
                }
            }
        } catch (error) {
            // Registrando um erro se a requisição falhar
            console.error('Erro ao enviar os dados do formulário: ', error);
        }
    }

    return (
        // Usando um componente do React Native para tratar o fechamento do teclado
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* Definindo um componente de visualização */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* Exibindo a mensagem de erro com estilo vermelho */}
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
                {/* Exibindo a mensagem de sucesso com estilo verde */}
                <Text style={{ color: 'green' }}>{successMessage}</Text>
                {/* Definindo um componente de entrada de texto para o nome */}
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 300 }}
                    placeholder="Digite seu nome"
                    onChangeText={validateNameInput} // Vinculando a função 'validateNameInput' ao evento de mudança
                    value={user} // Vinculando o estado 'user' ao valor do campo de texto
                />
                {/* Definindo um componente de entrada de texto para o email */}
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 300 }}
                    placeholder="Digite seu email"
                    onChangeText={(text) => setEmail(text)} // Vinculando a alteração do texto ao estado 'email'
                    value={email} // Vinculando o estado 'email' ao valor do campo de texto
                />
                {/* Definindo um componente de entrada de texto para a senha */}
                <TextInput
                    style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 300 }}
                    placeholder="Digite sua senha"
                    secureTextEntry={true} // Ocultando o texto digitado para a senha
                    onChangeText={(text) => setPassword(text)} // Vinculando a alteração do texto ao estado 'password'
                    value={password} // Vinculando o estado 'password' ao valor do campo de texto
                />
                {/* Definindo um componente de toque para o botão de cadastro */}
                <TouchableOpacity
                    style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}
                    onPress={registerUser} // Vinculando a função 'registerUser' ao evento de pressionar
                >
                    {/* Definindo um componente de texto para o botão de cadastro */}
                    <Text style={{ color: 'white' }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

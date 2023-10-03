import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import config from '../config/config.json';

export default function CadastroAvaliacao({ route }) {
  const [avaliacao, setAvaliacao] = useState('');
  const [ativo, setAtivo] = useState(false);
  const [alunoId, setAlunoId] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      const errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(errorTimeout);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const successTimeout = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(successTimeout);
    }
  }, [successMessage]);

  async function registerAvaliacao() {
    if (!avaliacao || !alunoId || !dataInicio || !dataFim) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      let response = await fetch(config.urlRootNode + 'createAvaliacao', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          avaliacao: avaliacao,
          ativo: ativo,
          alunoId: alunoId,
          data_inicio: dataInicio,
          data_fim: dataFim
        }),
      });

      let json = await response.json();

      if (json.message) {
        setSuccessMessage(json.message);
        setAvaliacao('');
        setAtivo(false);
        setAlunoId('');
        setDataInicio('');
        setDataFim('');
      } else if (json.error) {
        setErrorMessage(json.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro de Avaliação</Text>
        <TextInput
          style={styles.input}
          value={avaliacao}
          onChangeText={setAvaliacao}
          placeholder="Digite a avaliação"
        />
        <Text style={styles.label}>Ativo:</Text>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setAtivo(!ativo)}
        >
          <Text style={styles.toggleButtonText}>{ativo ? 'Sim' : 'Não'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={alunoId}
          onChangeText={setAlunoId}
          placeholder="Digite o ID do aluno"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          value={dataInicio}
          onChangeText={setDataInicio}
          placeholder="Digite a data de início"
          keyboardType="numbers-and-punctuation"
        />
        <TextInput
          style={styles.input}
          value={dataFim}
          onChangeText={setDataFim}
          placeholder="Digite a data de fim"
          keyboardType="numbers-and-punctuation"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={registerAvaliacao}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: 300,
    backgroundColor: '#fff',
    fontSize: 17,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  label: {
    color: '#fff',
    fontSize: 17,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: 17,
    marginTop: 10,
  },
  successMessage: {
    color: '#00FF00',
    fontSize: 17,
    marginTop: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Alert, StyleSheet } from 'react-native';
import config from '../config/config.json';

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [nomeBusca, setNomeBusca] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searched, setSearched] = useState(false);
  const [order, setOrder] = useState('id');

  useEffect(() => {
    if (errorMessage) {
      const errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(errorTimeout);
    }
  }, [errorMessage]);

  const buscarAluno = () => {
    fetch(config.urlRootNode + `alunos/search/${nomeBusca}`)
      .then(response => response.json())
      .then(data => {
        setAlunos(data.alunos);
        setSearched(true);
      });
  };

  const deletarAluno = async (id) => {
    Alert.alert(
      "Deletar Aluno",
      "Você tem certeza que deseja deletar este aluno?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          try {
            const response = await fetch(config.urlRootNode + `alunos/delete/${id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: id,
              }),
            });

            if (response.ok) {
              setAlunos(alunos.filter(aluno => aluno.id !== id));
            } else {
              // Handle error
            }
          } catch (error) {
            console.error('Erro ao excluir aluno: ', error);
          }
        }}
      ]
    );
  };

  const atualizarAluno = (id) => {
    // Implemente a função de atualização do aluno aqui
  };

  const limpar = () => {
    setAlunos([]);
    setNomeBusca('');
    setSearched(false);
    setErrorMessage('');
  };

  useEffect(() => {
    listarAlunos();
  }, [order]);

  const listarAlunos = () => {
    fetch(config.urlRootNode + 'alunos')
      .then(response => response.json())
      .then(data => {
        let alunosList = data.alunos;
        if (order === 'name') {
          alunosList.sort((a, b) => a.name.localeCompare(b.name));
        } 
        setAlunos(alunosList);
      });
  };

  const listarTodosAlunos = () => {
    setOrder(null);
    listarAlunos();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Alunos</Text>
        <TextInput
          style={styles.input}
          value={nomeBusca}
          onChangeText={setNomeBusca}
          placeholder="Digite o nome do aluno"
        />
        <TouchableOpacity style={styles.button} onPress={buscarAluno}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={limpar}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
        <View style={styles.orderButtonsContainer}>
          
        </View>
        <TouchableOpacity style={styles.showAllButton} onPress={listarTodosAlunos}>
          <Text style={styles.showAllButtonText}>Mostrar Todos</Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollView}>
          {alunos.length > 0 ? (
            alunos.sort((a, b) => a.nome_aluno.localeCompare(b.nome_aluno)).map((aluno) => (
              <View key={aluno.id} style={styles.alunoContainer}>
                <Text style={styles.alunoNome}>{aluno.nome_aluno}</Text>
                <Text>ID: {aluno.id}</Text>
                <Text>Created at: {new Date(aluno.createdAt).toLocaleString()}</Text>
                <Text>Updated at: {new Date(aluno.updatedAt).toLocaleString()}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deletarAluno(aluno.id)}>
                  <Text style={styles.deleteButtonText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : searched ? (
            <>
              <Text style={styles.noResultsText}>Nenhum nome de aluno encontrado.</Text>
              {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
              )}
            </>
          ) : null}
        </ScrollView>
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
  },
  input: {
    marginTop: 20,
    width: 300,
    backgroundColor: '#fff',
    fontSize: 17,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
  },
  orderButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  orderButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  showAllButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  showAllButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  scrollView: {
    maxHeight: '50%',
  },
  alunoContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  alunoNome: {
    color: '#333',
    fontSize: 17,
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: '#FF0000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  noResultsText: {
    color: '#fff',
    fontSize: 17,
  },
  errorText: {
    color: '#fff',
    fontSize: 17,
  },
});

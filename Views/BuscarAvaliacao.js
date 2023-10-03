import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Alert, StyleSheet } from 'react-native';
import config from '../config/config.json';

export default function ListaAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [avaliacaoBusca, setAvaliacaoBusca] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      const errorTimeout = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(errorTimeout);
    }
  }, [errorMessage]);

  const buscarAvaliacao = () => {
    fetch(config.urlRootNode + `avaliacoes/search/${avaliacaoBusca}`)
      .then(response => response.json())
      .then(data => {
        setAvaliacoes(data.avaliacoes);
        setSearched(true);
      });
  };

  const deletarAvaliacao = async (id) => {
    Alert.alert(
      "Deletar Avaliação",
      "Você tem certeza que deseja deletar esta avaliação?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          try {
            const response = await fetch(config.urlRootNode + `avaliacoes/delete/${id}`, {
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
              setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== id));
            } else {
              // Handle error
            }
          } catch (error) {
            console.error('Erro ao excluir avaliação: ', error);
          }
        }}
      ]
    );
  };

  const listarTodasAvaliacoes = () => {
    fetch(config.urlRootNode + 'avaliacoes')
      .then(response => response.json())
      .then(data => {
        setAvaliacoes(data.avaliacoes);
        setSearched(true);
      });
  };

  const limparTela = () => {
    setAvaliacoes([]); // Limpa a lista de avaliações
    setAvaliacaoBusca(''); // Limpa o campo de busca
    setSearched(false); // Define searched como falso novamente
    setErrorMessage(''); // Limpa a mensagem de erro, se houver
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Avaliações</Text>
        <TextInput
          style={styles.input}
          value={avaliacaoBusca}
          onChangeText={setAvaliacaoBusca}
          placeholder="Digite o nome da avaliação"
        />
        <TouchableOpacity style={styles.button} onPress={buscarAvaliacao}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.showAllButton} onPress={listarTodasAvaliacoes}>
          <Text style={styles.showAllButtonText}>Mostrar Todos</Text>
        </TouchableOpacity>

        {/* Adicione o botão "Limpar Tela" aqui */}
        <TouchableOpacity style={styles.clearButton} onPress={limparTela}>
          <Text style={styles.clearButtonText}>Limpar Tela</Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollView}>
          {avaliacoes.length > 0 ? (
            avaliacoes.map((avaliacao) => (
              <View key={avaliacao.id} style={styles.avaliacaoContainer}>
                <Text style={styles.avaliacaoNome}>{avaliacao.avaliacao}</Text>
                <Text>ID: {avaliacao.id}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => deletarAvaliacao(avaliacao.id)}>
                  <Text style={styles.deleteButtonText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : searched ? (
            <>
              <Text style={styles.noResultsText}>Nenhuma avaliação encontrada.</Text>
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
  // Adicione os estilos para o botão "Limpar Tela" aqui
  clearButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 17,
  },
  scrollView: {
    maxHeight: '50%',
  },
  avaliacaoContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  avaliacaoNome: {
    color: '#333',
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
});

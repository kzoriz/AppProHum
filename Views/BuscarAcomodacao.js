import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Alert, StyleSheet } from 'react-native';
import config from '../config/config.json';

export default function ListaAcomodacoes() { // Renomeado o componente para "ListaAcomodacoes"
  const [acomodacoes, setAcomodacoes] = useState([]); // Renomeado para "acomodacoes"
  const [acomodacaoBusca, setAcomodacaoBusca] = useState(''); // Renomeado para "acomodacaoBusca"
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

  const buscarAcomodacao = () => { // Renomeado para "buscarAcomodacao"
    fetch(config.urlRootNode + `acomodacoes/search/${acomodacaoBusca}`) // Renomeado para "acomodacoes"
      .then(response => response.json())
      .then(data => {
        setAcomodacoes(data.acomodacoes); // Renomeado para "acomodacoes"
        setSearched(true);
      });
  };

  const deletarAcomodacao = async (id) => {
    Alert.alert(
      "Deletar Acomodação",
      "Você tem certeza que deseja deletar esta acomodação?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          try {
            const response = await fetch(config.urlRootNode + `acomodacoes/delete/${id}`, {
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
              setAcomodacoes(acomodacoes.filter(acomodacao => acomodacao.id !== id));
            } else {
              // Handle error
            }
          } catch (error) {
            console.error('Erro ao excluir acomodação: ', error);
          }
        }}
      ]
    );
  };


  const listarTodasAcomodacoes = () => { // Renomeado para "listarTodasAcomodacoes"
    fetch(config.urlRootNode + 'acomodacoes') // Renomeado para "acomodacoes"
      .then((response) => response.json())
      .then((data) => {
        setAcomodacoes(data.acomodacoes); // Renomeado para "acomodacoes"
        setSearched(true);
      });
  };

  const limparTela = () => {
    setAcomodacoes([]); // Limpa a lista de acomodações
    setAcomodacaoBusca(''); // Limpa o campo de busca
    setSearched(false); // Define searched como falso novamente
    setErrorMessage(''); // Limpa a mensagem de erro, se houver
  };

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Acomodações</Text>
      <TextInput
        style={styles.input}
        value={acomodacaoBusca}
        onChangeText={setAcomodacaoBusca}
        placeholder="Digite o nome da acomodação"
      />
      <TouchableOpacity style={styles.button} onPress={buscarAcomodacao}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={limparTela}>
        <Text style={styles.buttonText}>Limpar Tela</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.showAllButton} onPress={listarTodasAcomodacoes}>
        <Text style={styles.showAllButtonText}>Mostrar Todos</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {acomodacoes.length > 0 ? (
          acomodacoes.map((acomodacao) => (
            <View key={acomodacao.id} style={styles.acomodacaoContainer}>
              <Text style={styles.acomodacaoNome}>{acomodacao.acomodacao}</Text>
              <Text style={styles.acomodacaoId}>ID: {acomodacao.id}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletarAcomodacao(acomodacao.id)}
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : searched ? (
          <>
            <Text style={styles.noResultsText}>Nenhuma acomodação encontrada.</Text>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
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
  
   // Adicione os estilos para o ID aqui
   acomodacaoId:{
     backgroundColor:'white'
   },

   scrollView:{
     maxHeight:'50%',
   },
   acomodacaoContainer:{
     backgroundColor:'#fff',
     marginVertical :5,
     padding :10,
     borderRadius :5
   },
   acomodacaoNome:{
     color:'#333',
     fontSize :17
   },
   noResultsText:{
     color:'#fff',
     fontSize :17
   },
   errorText:{
     color:'#fff',
     fontSize :17
   },
   deleteButton:{
     marginTop :5,
     backgroundColor:'#FF0000',
     paddingVertical :5,
     paddingHorizontal :10,
     borderRadius :5
   },
   deleteButtonText:{
     color:'#fff',
     fontSize :17
   }
});

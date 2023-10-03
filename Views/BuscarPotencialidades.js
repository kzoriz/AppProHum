// Código React Native
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Alert, StyleSheet } from 'react-native';
import config from '../config/config.json';

export default function ListaPotencialidades() {
  const [potencialidades, setPotencialidades] = useState([]);
  const [potencialidadeBusca, setPotencialidadeBusca] = useState('');
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

  const buscarPotencialidade = () => {
    fetch(config.urlRootNode + `potencialidades/search/${potencialidadeBusca}`)
      .then(response => response.json())
      .then(data => {
        setPotencialidades(data.potencialidades);
        setSearched(true);
      });
  };

  const deletarPotencialidade = async (id) => {
    Alert.alert(
      "Deletar Potencialidade",
      "Você tem certeza que deseja deletar esta potencialidade?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          try {
            const response = await fetch(config.urlRootNode + `potencialidades/delete/${id}`, {
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
              setPotencialidades(potencialidades.filter(potencialidade => potencialidade.id !== id));
            } else {
              // Handle error
            }
          } catch (error) {
            console.error('Erro ao excluir potencialidade: ', error);
          }
        }}
      ]
    );
  };

  const listarTodasPotencialidades = () => {
    fetch(config.urlRootNode + 'potencialidades')
      .then((response) => response.json())
      .then((data) => {
        setPotencialidades(data.potencialidades);
        setSearched(true);
      });
  };

  const limparTela = () => {
    setPotencialidades([]);
    setPotencialidadeBusca('');
    setSearched(false);
    setErrorMessage('');
  };

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Potencialidades</Text>
      <TextInput
        style={styles.input}
        value={potencialidadeBusca}
        onChangeText={setPotencialidadeBusca}
        placeholder="Digite a descrição da potencialidade"
      />
      <TouchableOpacity style={styles.button} onPress={buscarPotencialidade}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={limparTela}>
        <Text style={styles.buttonText}>Limpar Tela</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.showAllButton} onPress={listarTodasPotencialidades}>
        <Text style={styles.showAllButtonText}>Mostrar Todos</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {potencialidades.length > 0 ? (
          potencialidades.map((potencialidade) => (
            <View key={potencialidade.id} style={styles.potencialidadeContainer}>
              <Text style={styles.potencialidadeDescricao}>{potencialidade.descricao}</Text>
              <Text style={styles.potencialidadeId}>ID: {potencialidade.id}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletarPotencialidade(potencialidade.id)}
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : searched ? (
          <>
            <Text style={styles.noResultsText}>Nenhuma potencialidade encontrada.</Text>
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
   potencialidadeId:{
     backgroundColor:'white'
   },

   scrollView:{
     maxHeight:'50%',
   },
   potencialidadeContainer:{
     backgroundColor:'#fff',
     marginVertical :5,
     padding :10,
     borderRadius :5
   },
   potencialidadeDescricao:{
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

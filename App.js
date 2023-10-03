
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Views/Home';
import Login from './Views/Login';
import Cadastro from './Views/Cadastro';
import ProtectedScreen from './Views/ProtectedScreen';
import AlunosScreen from './Views/AlunosScreen';
import AvaliacaoScreen from './Views/AvaliacaoScreen';
import AcomodacaoScreen from './Views/AcomodacaoScreen';
import PotencialidadesScreen from './Views/PotencialidadesScreen';
import AlunoCadastro from './Views/AlunoCadastro';
import CadastrarAvalicao from './Views/CadastrarAvalicao'; 
import ProcurarAluno from './Views/ProcurarAluno';
import BuscarAvaliacao from './Views/BuscarAvaliacao';
import CadastrarAcomodacao from './Views/CadastrarAcomodacao';
import BuscarAcomodacao from './Views/BuscarAcomodacao';
import CadastrarPotencialidades from './Views/CadastrarPotencialidades';
import BuscarPotencialidades from './Views/BuscarPotencialidades';


function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
                <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
                <Stack.Screen name="AlunosScreen" component={AlunosScreen} />
                <Stack.Screen name="AvaliacaoScreen" component={AvaliacaoScreen} />
                <Stack.Screen name="AcomodacaoScreen" component={AcomodacaoScreen} />
                <Stack.Screen name="PotencialidadesScreen" component={PotencialidadesScreen} />
                <Stack.Screen name="AlunoCadastro" component={AlunoCadastro} />
                <Stack.Screen name="CadastrarAvalicao" component={CadastrarAvalicao} />
                <Stack.Screen name="ProcurarAluno" component={ProcurarAluno} />
                <Stack.Screen name="BuscarAvaliacao" component={BuscarAvaliacao} />
                <Stack.Screen name="BuscarAcomodacao" component={BuscarAcomodacao} />
                <Stack.Screen name="CadastrarAcomodacao" component={CadastrarAcomodacao} />
                <Stack.Screen name="BuscarPotencialidades" component={BuscarPotencialidades} />
                <Stack.Screen name="CadastrarPotencialidades" component={CadastrarPotencialidades} />

               

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
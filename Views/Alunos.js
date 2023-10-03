import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import config from '../config/config.json';

export default function ListaUsuarios() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const response = await fetch(config.urlRootNode + 'get-users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data.users);
            } else {
                // Tratar erro
            }
        } catch (error) {
            console.error('Erro ao buscar usuários: ', error);
        }
    }

    async function deleteUser(id) {
        try {
            const response = await fetch(config.urlRootNode + '/alunos/delete/:id', {
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
                // Atualize a lista de usuários após a exclusão
                fetchUsers();
            } else {
                // Tratar erro//
            }
        } catch (error) {
            console.error('Erro ao excluir usuário: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {users.map((user) => (
                    <View key={user.id} style={styles.userContainer}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteUser(user.id)}
                        >
                            <Text style={styles.deleteButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: 'white',
    },
});

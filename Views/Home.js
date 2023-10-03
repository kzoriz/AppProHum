import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    title='LOGIN'
                    onPress={() => navigation.navigate('Login', {
                        id: 30
                    })}
                    style={styles.button}
                />
                <View style={styles.buttonSpacer} />
                <Button
                    title='CADASTRO'
                    onPress={() => navigation.navigate('Cadastro', {
                        id: 30
                    })}
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        borderRadius: 15,
        paddingHorizontal: 20,
    },
    buttonSpacer: {
        height: 10,
    },
});

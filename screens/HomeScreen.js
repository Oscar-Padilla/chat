import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles';

export default function HomeScreen({ usuario, colorRol, setPantalla, cerrarSesion }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido, {usuario}</Text>
            <View style={styles.button}>
                <Button title="Entrar al chat" onPress={() => setPantalla('chat')} />
            </View>
            <View style={styles.button}>
                <Button title="Cerrar sesión" color="red" onPress={cerrarSesion} />
            </View>
        </View>
    );
}

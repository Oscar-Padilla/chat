import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { styles } from '../styles';

export default function LoginScreen({ setPantalla, iniciarSesion }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        if (!username || !password) return alert('Llena todos los campos');
        const userRef = doc(db, 'usuarios', username);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert('Usuario no existe');
        } else if (userSnap.data().password !== password) {
            alert('Contraseña incorrecta');
        } else {
            const colorRol = userSnap.data().colorRol;
            iniciarSesion(username, colorRol);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Iniciar sesión" onPress={login} />
            <Button title="Registrarse" onPress={() => setPantalla('registro')} />
        </View>
    );
}

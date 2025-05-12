import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { styles } from '../styles';

export default function LoginScreen({ setPantalla, setUsuarioActivo }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        if (!username || !password) return alert('Llena ambos campos');
        const userRef = doc(db, 'usuarios', username);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            alert('Usuario no existe');
        } else if (userSnap.data().password !== password) {
            alert('Contraseña incorrecta');
        } else {
            setUsuarioActivo(username);
            setPantalla('home');
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>
                <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername} />
                <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
                <View style={styles.button}>
                    <Button title="Iniciar sesión" onPress={login} />
                </View>
                <View style={styles.button}>
                    <Button title="Registrarse" onPress={() => setPantalla('registro')} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

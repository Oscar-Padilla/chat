import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, SafeAreaView } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ usuario, setPantalla }) {
    const [mensaje, setMensaje] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [userColors, setUserColors] = useState({});

    const colorsPalette = [
        '#e6194b', '#3cb44b', '#4363d8', '#f58231',
        '#911eb4', '#46f0f0', '#f032e6', '#bcf60c',
        '#008080', '#e6beff', '#9a6324', '#808000',
        '#800000', '#aaffc3', '#000075', '#808080'
    ];

    function getRandomColorFromPalette() {
        return colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
    }

    function ensureUserColor(username) {
        setUserColors((prev) => {
            if (prev[username]) return prev;
            return { ...prev, [username]: getRandomColorFromPalette() };
        });
    }

    async function enviarMensaje() {
        if (!mensaje) return;
        await addDoc(collection(db, 'chats'), {
            mensaje,
            usuario,
            fecha: new Date()
        });
        setMensaje('');
    }

    useEffect(() => {
        const q = query(collection(db, 'chats'), orderBy('fecha'));
        const unsub = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => doc.data());
            msgs.forEach(msg => ensureUserColor(msg.usuario));
            setMensajes(msgs);
        });
        return () => unsub();
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <SafeAreaView style={{ flex: 1, marginTop: 50, marginBottom: 50 }}>
                {/* Header con botón salir */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingHorizontal: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={() => setPantalla('home')}>
                        <Text style={{ fontSize: 16, color: 'blue' }}>{'<- Salir'}</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 40 }}>Chat en tiempo real</Text>
                </View>

                {/* Lista de mensajes */}
                <FlatList
                    style={{ flex: 1, paddingHorizontal: 10 }}
                    data={mensajes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                            <Text style={{ color: userColors[item.usuario] || '#000', fontSize: 16 }}>
                                {item.usuario}: {item.mensaje}
                            </Text>
                        </View>
                    )}
                />

                {/* Input + botón al fondo */}
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
                    <TextInput
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 20,
                            paddingHorizontal: 15,
                            paddingVertical: Platform.OS === 'ios' ? 10 : 8,
                        }}
                        placeholder="Mensaje"
                        value={mensaje}
                        onChangeText={setMensaje}
                    />
                    <TouchableOpacity
                        onPress={enviarMensaje}
                        style={{
                            marginLeft: 10,
                            backgroundColor: '#0084ff',
                            padding: 12,
                            borderRadius: 50,
                        }}
                    >
                        <Ionicons name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

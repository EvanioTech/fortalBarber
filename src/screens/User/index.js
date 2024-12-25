import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Linking, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../api/fireconect';
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";



export function User() {
  const navigation = useNavigation();
  const [authUser, setAuthUser] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  async function logoffUser() {
    try {
      await signOut(auth);
      console.log('Usuário saiu da conta');
      setAuthUser(null);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao sair:', error.message);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid,
        });
        getAgendamentos(user.uid);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsub();
  }, []);

  const getAgendamentos = (uid) => {
    const q = query(collection(db, "agen"), where("userUid", "==", uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const agendamentosList = [];
      querySnapshot.forEach((doc) => {
        agendamentosList.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setAgendamentos(agendamentosList);
    });

    return unsubscribe;
  };

  const handleCancelAgendamento = async (agendamentoId) => {
    try {
      const agendamentoRef = doc(db, "agen", agendamentoId);
      await deleteDoc(agendamentoRef);
      console.log("Agendamento cancelado com sucesso!");
    } catch (error) {
      console.log("Erro ao cancelar o agendamento:", error);
    }
  };

  const sendToWhatsApp = (agendamento) => {
    const phoneNumber = "5585991785953"; // Substitua pelo número de WhatsApp da loja
    const message = `Olá, gostaria de confirmar meu agendamento:
- Nome do Corte: ${agendamento.nome}
- Descrição: ${agendamento.descricao}
- Valor: ${agendamento.valor}
- Horário: ${agendamento.selectedHour}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir o WhatsApp:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Agendamentos</Text>
      
      <FlatList
        data={agendamentos}
        ListEmptyComponent={<Text style={styles.text}>Você não possui agendamentos no momento.</Text>}
        renderItem={({ item }) => (
          <View style={styles.agendamento}>
            <Text style={styles.text}>Nome do Corte: {item.nome}</Text>
            <Text style={styles.text}>Descrição: {item.descricao}</Text>
            <Text style={styles.text}>Valor: {item.valor}</Text>
            <Text style={styles.text}>Horário: {item.selectedHour}</Text>
            
            <TouchableOpacity style={styles.btnWpp} onPress={() => sendToWhatsApp(item)}>
                <Text style={styles.text}>Enviar para WhatsApp</Text>
                </TouchableOpacity>
            <View style={{justifyContent: 'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.btnCancel} onPress={() => handleCancelAgendamento(item.id)}>
              <Text style={styles.textCancel}>Desistir</Text>
            </TouchableOpacity>
            </View>
            
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Button title="Sair da conta" onPress={logoffUser} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginBottom: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  agendamento: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    width: '100%',
  },
  btnWpp: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%',
  },
  btnCancel: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
    width: '50%',
    
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  textCancel: {
    color: 'white',
    fontSize: 15,
  },
});

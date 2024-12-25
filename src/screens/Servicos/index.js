import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Image, Button, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, setDoc, onSnapshot, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from "../../api/fireconect";
import { auth } from '../../api/fireconect';  // Para acessar o usuário logado

// Componente para exibir os detalhes de cada serviço
function ItemAgendamento({ data }) {
  const [selectedHour, setSelectedHour] = useState("8:00");

  const horarios = Array.from({ length: 10 }, (_, index) => {
    const hour = 8 + index; // Começa de 8 e vai até 17
    return `${hour}:00`;
  });

  // Função para adicionar o agendamento ao Firestore
  const add = async () => {
    const userUid = auth.currentUser ? auth.currentUser.uid : null;  // Pega o uid do usuário logado

    if (userUid) {
      try {
        await addDoc(collection(db, 'agen'), {
          nome: data.nome,
          descricao: data.descricao,
          valor: data.valor,
          selectedHour: selectedHour,
          userUid: userUid,  // Adicionando o UID do usuário
        });
        console.log('Agendamento Cadastrado!');
      } catch (err) {
        console.error('Erro ao cadastrar agendamento:', err);
      }
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.nome}>{data.nome}</Text>
      <Text>{data.descricao}</Text>
      <Text>{data.valor}</Text>
      <Image source={data.imgcorte} style={styles.imagem} />
      <Text style={styles.label}>Selecione um horário:</Text>
      <Picker
        selectedValue={selectedHour}
        onValueChange={(itemValue) => setSelectedHour(itemValue)}
        style={styles.picker}
      >
        {horarios.map((horario) => (
          <Picker.Item key={horario} label={horario} value={horario} />
        ))}
      </Picker>
      <Button
        title="Agendar"
        onPress={add} // Ao clicar no botão, os dados são enviados para o Firestore
      />
      <StatusBar style='auto' />
    </View>
  );
}

export function Servicos() {
  const [cortes, setCortes] = useState([
    {
      id: '1',
      nome: 'Social',
      descricao: 'Corte Simples',
      valor: '15,00',
      imgcorte: require('../../images/csocial.jpeg'),
    },
    {
      id: '2',
      nome: 'Degradê',
      descricao: 'Corte Bom',
      imgcorte: require('../../images/cdegrade.jpeg'),
      valor: '25,00',
    },
    {
      id: '3',
      nome: 'Navalhado',
      descricao: 'Corte Moderno',
      imgcorte: require('../../images/cnavalhado.jpeg'),
      valor: '35,00',
    },
    {
      id: '4',
      nome: 'Careca',
      descricao: 'Corte Clássico Premium',
      imgcorte: require('../../images/ccareca.jpeg'),
      valor: '45,00',
    },
  ]);

  const [barbas, setBarbas] = useState([
    {
      id: '1',
      nome: 'Barba Simples',
      descricao: 'barba Simples',
      valor: '15,00',
       imgcorte: require('../../images/barba1.webp'),
    },
    {
      id: '2',
      nome: 'Barba Galã',
      descricao: 'Barba Boa',
      imgcorte: require('../../images/barba2.webp'),
      valor: '25,00',
    },
    {
      id: '3',
      nome: 'Barba Transcendental',
      descricao: 'Barba Moderna',
      imgcorte: require('../../images/barba3.webp'),
      valor: '35,00',
    },
    {
      id: '4',
      nome: 'Estilo Dumbledore',
      descricao: 'Barba Premium',
      imgcorte: require('../../images/barba4.webp'),
      valor: '45,00',
    },
  ]);

  return (
    <ScrollView style={styles.container}>
      {/* Lista de Cortes */}
      <FlatList
        data={cortes}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemAgendamento data={item} />}
        style={styles.flatList}
      />

      {/* Lista de Barbas */}
      <FlatList
        data={barbas}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemAgendamento data={item} />}
        style={styles.flatList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20, // Para evitar que fique colado na parte superior da tela
    backgroundColor: '#FFF'
  },
  flatList: {
    marginBottom: 20, // Espaçamento entre as listas
  },
  itemContainer: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginTop: 40,
    marginLeft: 50,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagem: {
    width: 300,
    height: 300,
    marginTop: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
  },
});

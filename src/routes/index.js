import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Login } from "../screens/Login";
import { Cadastro } from "../screens/Cadastro";
import { Servicos } from "../screens/Servicos";
import { Sobre } from "../screens/Sobre";
import { User } from "../screens/User";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const renderTabBarIcon = (iconName) => ({ color, size }) => (
  <AntDesign name={iconName} size={size} color={color} />
);

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue", // Altere conforme o tema
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: renderTabBarIcon("home"),
        }}
      />
      <Tab.Screen
        name="Serviços"
        component={Servicos}
        options={{
          tabBarIcon: renderTabBarIcon("shoppingcart"),
        }}
      />
      <Tab.Screen
        name="Agendamentos"
        component={User}
        options={{
          tabBarIcon: renderTabBarIcon("form"),
        }}
      />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <Stack.Navigator
     initialRouteName="Login" 
     screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Servicos" component={Servicos} />
      
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="MainTabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export { Routes };

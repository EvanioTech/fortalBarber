import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title:{
      flex:1,
      marginTop:20,
      fontSize:60,
      color: 'white',
      fontStyle: 'italic'
    },
    img:{
      width:'100%',
      height:'70%',
      borderRadius:100,
      marginBottom:10
    },
    btnArea:{
      justifyContent: 'center',
      textAlign:'center',
      alignItems: 'center'
    },
    btnAgenda:{
      fontSize:30,
      color: 'white',
      fontStyle: 'italic',
      borderWidth:10,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems : 'center',
      textAlign: 'center',
      
    },
    botao: {
      marginTop:30,
      width:230,
      height:60,
      borderColor: 'blue',
      borderWidth:4,
      borderRadius: 25
    }
  });
  export default styles
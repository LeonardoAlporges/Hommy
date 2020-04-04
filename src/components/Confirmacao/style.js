import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  V_img:{
    width:150,
    height:150,
  },
  V_title:{
    width:'70%',
    height:28,
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    fontFamily:'Roboto',
    fontSize:26,
    fontWeight:'bold',
    color:'#687368',
  },
  V_Subtitle:{
    width:'80%',
    height:55,
    justifyContent:'center',
    alignItems:'center',
  },
  subtitle:{
    textAlign:"center",
    fontFamily:'Roboto',
    fontSize:16,
    color:'#687368',
  },
  V_botao:{
    marginTop:'30%',
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:50,
  },
  botao:{
    width:'80%',
    height:60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00995d',
  },
  txtbtn:{
    textAlign:"center",
    fontFamily:'Roboto',
    fontSize:20,
    color:'#ffff',
    fontWeight:'bold'
  }
});


export default estilo;
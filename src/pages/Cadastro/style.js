import { StyleSheet } from 'react-native'

const estilo = StyleSheet.create({
    V_header:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        height:55,
        backgroundColor:'#f8f8f8',
        borderBottomWidth:2,
        borderBottomColor:'#50cb8b',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    campos:{
        marginTop:20
    },  
    iconHeader:{
        fontSize:26,
        color:'#00995d',
        marginHorizontal:'5%'
    },
    txtLabel:{
        
        fontFamily:'Roboto',
        fontSize:16,
        fontWeight:'bold',
        color:'#687368'
    }, 
    title:{
        fontSize:24,
        fontFamily:'Roboto',
        fontWeight:'bold',
        color:'#006a33'
    },
    V_Conteudo:{
        height:'100%',
        width:'100%',
        paddingVertical:15,
        paddingHorizontal:20,
    },
    ruaNum:{
        display:'flex',
        height:50,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:40
    },
    Valores:{
        
        display:'flex',
        height:30,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'#f8f2',
        justifyContent:'space-between',
    },
    campos2:{
        marginTop:20
    },
    place:{
        fontFamily:'Roboto',
        fontSize:14,
        color:'#989898',
       
    },  
    enviar:{
        alignItems:'center',
        marginTop:30,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
    },
    btnProximo:{
        justifyContent:'center',
        alignItems:'center',
        width:'80%',
        height:50,
        backgroundColor:'#00995d',
    },
    iconeBtn:{
        margin:0,
        color:'#50cb8b'
    },
    botaoEnv:{
        justifyContent:'center',
        alignItems:'center',  
        backgroundColor:'#1DA1F2',
        color:'#1DA1F2',
    },



});

export default estilo;
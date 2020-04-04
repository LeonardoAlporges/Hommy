import { StyleSheet} from 'react-native';

const estilo = StyleSheet.create({
    card:{
        marginTop:55,
    },
    tabs_TextStyle:{
        borderTopWidth:0,
        color: '#1DA1F2',
        fontFamily:'Roboto',
        fontSize:15,
        fontWeight: 'bold',
    },
    tabs_ActiveTextStyle:{
        borderTopWidth:0,
        color: '#1DA1F2',
        fontFamily:'Roboto',
        fontWeight: 'bold',
        fontSize:18,
    },
    tabs_ActiveTabs:{
        borderTopWidth:0,
        backgroundColor:"#fff",
        
    },
    tabs_style:{
        
        borderColor:"#000",
        elevation:0,
        borderTopWidth:0,
        backgroundColor:"#fff",
        color:'#00bb6c',
        
    },
    empty:{
        marginBottom:'8%',
        display:'flex',
        alignItems:'center',
        marginTop:'30%',
    },
    content:{
        flex:1,
        display:'flex',
        
    },
    empty_titulo:{
        color:'#687368',
        fontFamily:'Roboto',
        fontWeight: '800',
        fontSize:22,
    },
    empty_sub:{
       textAlign:'center',
        marginTop:'5%',
        height:'20%',
        width:'50%',
        color:'#687368',
        fontFamily:'Roboto-bold',
        fontWeight: "normal",
        fontSize:16,
    }

  }); 

  export default estilo;
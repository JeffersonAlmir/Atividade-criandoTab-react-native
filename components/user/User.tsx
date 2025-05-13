import { StyleSheet, Text, View } from "react-native";




export type UsuarioProps = {
   email: string;
   senha: string;


};


export default function User({email,senha}: UsuarioProps){
   return(


       <View style ={styles.box}>
           <View style ={styles.row}>
           <Text style = {styles.title}>{email}</Text>
           <Text style = {styles.title}>{senha}</Text>
           </View>
          
       </View>
   );
}


const styles = StyleSheet.create({
   box:{
       backgroundColor :'white',
       alignItems:'center',
       padding:20,
       margin: 20,
       borderRadius:5,
       borderWidth: 1,
       borderColor: '#ddd',
   },
   row: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
   },
   tinyLogo: {
       width: 50,
       height: 50,
   },
   title:{
       fontSize:20,
       margin:10,
   }
})

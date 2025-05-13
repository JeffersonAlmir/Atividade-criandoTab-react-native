import { IUser } from "@/interfaces/IUser";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";




export type UserModalProps = {
   visible: boolean,
   onAdd:(email: string, senha: string, id: number) => void;
   onCancel : () => void;
   onDelete : (id: number) => void;
   user?:IUser;
}


export default function UserModal ({visible, onAdd, onCancel,onDelete, user}: UserModalProps) {


   const [email, setEmail] = useState('');
   const [senha, setSenha] = useState('');
   const [id, setId] = useState<number>(0);


   useEffect(()=>{
       if(user){
           setEmail(user.email);
           setSenha(user.senha);
           setId(user.id);
       }else{
           setEmail("");
           setSenha("");
           setId(0);
       }
   },[user])


   const clearInput = () =>{
       setEmail("");
       setSenha("");
      
   }


   return(
       <Modal visible = {visible} animationType="fade" transparent={true} >
           <View style = {styles.container} >
               <View style = {styles.boxContainer}>
                  
                   <TextInput
                       style = {styles.boxInput}
                       value = {email}
                       onChangeText={ text => setEmail(text)}
                       placeholder="Email"
                       autoFocus
                   />
                   <TextInput
                       style = {styles.boxInput}
                       value = {senha}
                       onChangeText={ text => setSenha(text)}
                       placeholder="Senha"
                      
                   />
                  
                  
               </View>


               <View style = {styles.buttonContainer}>
                   <TouchableOpacity
                       style = {styles.buttonAdd} 
                       onPress = { () =>{
                           onAdd(email, senha, id);
                           clearInput();


                       }}>
                       <Text style = {styles.buttonText} >
                           Salvar
                       </Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       style = {styles.buttonCancel}
                       onPress={() =>{
                           onCancel()
                           clearInput();
                       }}>
                      
                       <Text style = {styles.buttonText} >
                           Cancelar
                       </Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                       style = {styles.buttonDeletar}
                       onPress={() =>{onDelete(id)}}
                       disabled ={ id <= 0}
                   >
                       <Text style = {styles.buttonText} >
                           Deletar
                       </Text>
                   </TouchableOpacity>
               </View>
           </View>


       </Modal>
   );
};


const styles = StyleSheet.create({


   container:{
       backgroundColor:'rgba(0, 0, 0, 0.7)',
       alignContent:'center',
       justifyContent: 'center',
       flex: 1
   },
   boxContainer:{
       backgroundColor:'#FFF',
       alignContent:'center',
       justifyContent: 'center',
       borderRadius:10,
       margin:20
   },
   buttonText:{
       textAlign:'center',
       fontWeight: 'bold',
       color:"#FFF"
   },
  
   buttonAdd:{
       backgroundColor:'green',
       alignContent:'center',
       borderRadius:10,
       justifyContent: 'center',
       flex:1,
       margin:10,
       padding:20,
       height:60
      
   },
   buttonCancel:{
       backgroundColor:'orange',
       justifyContent: 'center',
       alignContent:'center',
       borderRadius:10,
       flex:1,
       margin:10,
       padding:20,
       height:60
      
   },
   buttonDeletar:{
       backgroundColor:'red',
       justifyContent: 'center',
       alignContent:'center',
       borderRadius:10,
       flex:1,
       margin:10,
       padding:20,
       height:60
      
   },
   buttonContainer:{
       flexDirection: 'row',
       marginTop:10,
       height:70
   },
   boxInput:{
       alignSelf: 'stretch',
       height:40,
       borderRadius:5,
       margin:5,
   }
})

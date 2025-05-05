import { IfootballTeams } from "@/interfaces/IfootballTeams";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export type GameModalProps = {
    visible: boolean,
    onAdd:(time1:string, time2:string, placar: string)=> void
    onCancel : () => void;
}

export default function FootballTeamsModal ({visible, onAdd, onCancel}: GameModalProps) {

    const [time1, setTime1]= useState('');
        const [time2, setTime2]= useState('');
        const [placar, setPlacar]= useState('');
    
        const clearInput = () =>{
            setTime1('');
            setTime2('');
            setPlacar('');
        }


    return(

        <SafeAreaProvider>
            <SafeAreaView style = {styles.container}>
                <View style = {styles.boxContainer}>
                                   
                                   <TextInput
                                       style = {styles.boxInput}
                                       value = {time1}
                                       onChangeText={ text => setTime1(text)}
                                       placeholder="Nome time 1"
                                       autoFocus
                                   />
                                   <TextInput
                                       style = {styles.boxInput}
                                       value = {time2}
                                       onChangeText={ text => setTime2(text)}
                                       placeholder="Nome time 2"
                                       
                                   />
                                   <TextInput
                                       style = {styles.boxInput}
                                       value = {placar}
                                       onChangeText={ text=> setPlacar(text)}
                                       placeholder="Placar"  
                                   />
                                   
                               </View>
            
                <View style = {styles.buttonContainer}>
                                   <TouchableOpacity
                                       style = {styles.buttonAdd}  
                                       onPress = { () =>{
                                           onAdd(time1, time2, placar);
                                           clearInput();
               
                                       }}>
                                       <Text style = {styles.buttonText} >
                                           Add
                                       </Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity 
                                       style = {styles.buttonCancel} 
                                       onPress={() =>{
                                           onCancel()
                                           clearInput();
                                       }}>
                                       
                                       <Text style = {styles.buttonText} >
                                           Cancel
                                       </Text>
                                   </TouchableOpacity>
                               </View>
            </SafeAreaView>
      </SafeAreaProvider>
       
    );
};

const styles = StyleSheet.create({

    container:{
        backgroundColor:'#FFF',
        alignContent:'center',
        justifyContent: 'center',
        flex: 1
    },
    boxContainer:{
        backgroundColor:'#FFF',
        alignContent:'center',
        justifyContent: 'center',
        borderRadius:10,
        margin:20,
        
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
        borderWidth: 1,  
        padding: 10, 
        
    }
})
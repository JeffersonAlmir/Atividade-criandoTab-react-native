import { IfootballTeams } from "@/interfaces/IfootballTeams";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export type FootballModalProps = {
    visible: boolean,
    onAdd:(title: string, image: string, numberPlayer: string, id: number) => void;
    onCancel : () => void;
    team?:IfootballTeams;
}

export default function FootballTeamsModal ({visible, onAdd, onCancel, team}: FootballModalProps) {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [numberPlayer, setNumberPlayer] = useState('');
    const [id, setId] = useState<number>(0);

    useEffect(()=>{
        if(team){
            setTitle(team.name);
            setImage(team.image);
            setNumberPlayer(team.numberPlayers);
            setId(team.id);
        }else{
            setTitle('');
            setImage('');
            setNumberPlayer('');
            setId(0); 
        }
    },[team])

    const clearInput = () =>{
        setTitle('');
        setImage('');
        setNumberPlayer('');
    }

    return(

        <SafeAreaProvider>
            <SafeAreaView style = {styles.container}>
                <View style = {styles.boxContainer}>
                            
                    <TextInput
                        style = {styles.boxInput}
                        value = {title}
                        onChangeText={ text => setTitle(text)}
                        placeholder="Nome"
                        autoFocus
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {image}
                        onChangeText={ text => setImage(text)}
                        placeholder="Imagem"
                                        
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {numberPlayer}
                        onChangeText={ num => setNumberPlayer(num)}
                        keyboardType="numeric"
                        placeholder="Número de jogadores"  
                    />
                                    
                </View>
            
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity
                        style = {styles.buttonAdd}  
                        onPress = { () =>{
                            onAdd(title, image,numberPlayer, id);
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
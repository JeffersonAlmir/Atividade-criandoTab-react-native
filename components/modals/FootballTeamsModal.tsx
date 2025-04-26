import React from "react";
import { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";


export type FootballModalProps = {
    visible: boolean,
    onAdd:(title: string, image: string, numberPlayer: string)=> void
    onCancel : () => void;
}

export default function FootballTeamsModal ({visible, onAdd, onCancel}: FootballModalProps) {

    const [title, setTitle]= useState('');
    const [image, setImage]= useState('');
    const [numberPlayer, setNumberPlayer]= useState('');

    const clearInput = () =>{
        setTitle('');
        setImage('');
        setNumberPlayer('');
    }

    return(
        <Modal visible = {visible} animationType="fade" transparent={true} >
            <View style = {styles.container} >
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
                            onAdd(title, image,numberPlayer);
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
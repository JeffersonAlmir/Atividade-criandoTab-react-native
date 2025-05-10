import { IfootballGame } from "@/interfaces/IfootballGame";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal, TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";


export type GameModalProps = {
    visible: boolean,
    onAdd:(time1:string, time2:string, placar: string,id: number)=> void
    onCancel : () => void;
    onDelete : (id: number) => void;
    game?:IfootballGame;
}

export default function FootballGameModal ({visible, onAdd, onCancel,onDelete, game}: GameModalProps) {

    const [time1, setTime1]= useState('');
    const [time2, setTime2]= useState('');
    const [placar, setPlacar]= useState('');
    const [id, setId] = useState<number>(0);
    
    useEffect(()=>{
            if(game){
                setTime1(game.time1);
                setTime2(game.time2);
                setPlacar(game.placar);
                setId(game.id);
            }else{
                setTime1('');
                setTime2('');
                setPlacar('');
                setId(0); 
            }
        },[game])

    const clearInput = () =>{
        setTime1('');
        setTime2('');
        setPlacar('');
    }

    return(
        <Modal visible = {visible} animationType="fade" transparent={true} >
            <View style = {styles.container} >
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
                            onAdd(time1, time2, placar, id);
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
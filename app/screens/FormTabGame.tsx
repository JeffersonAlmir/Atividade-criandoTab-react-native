import { IfootballGame } from "@/interfaces/IfootballGame";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


export default function FormTabGame () {
    const {gameId, gameTime1, gameTime2, gamePlacar } = useLocalSearchParams()

    const [time1, setTime1]= useState('');
    const [time2, setTime2]= useState('');
    const [placar, setPlacar]= useState('');
    const [id, setId] = useState<number>(0);

    useEffect( ()=>{
            if(gameId){
                setTime1(gameTime1?.toString() );
                setTime2(gameTime2?.toString() );
                setPlacar(gamePlacar?.toString());
                setId(Number(gameId));
            }else{
                setTime1('');
                setTime2('');
                setPlacar('');
                setId(0); 
            }
    }, [gameId,gameTime1,gameTime2,gamePlacar])

    
    const onAdd = async (time1: string, time2:string, placar:string, id?: number)=>{

        const data = await AsyncStorage.getItem("@FootballGameApp:footballGame");
        const footballGameData = data != null ? JSON.parse(data) : [];

        if(!id || id <= 0){
            const newFootballGame : IfootballGame = {
                id : Math.random() * 1000,
                time1: time1,
                time2: time2,
                placar: placar
            }

            const footballGamePlus : IfootballGame[] =[
                newFootballGame,
                ...footballGameData ,
            ]

            AsyncStorage.setItem("@FootballGameApp:footballGame", JSON.stringify(footballGamePlus));
        }else{
            footballGameData.forEach((game : IfootballGame) =>{
                if(game.id === id){
                    game.time1= time1;
                    game.time2= time2;   
                    game.placar = placar;
                }
            } );
            AsyncStorage.setItem("@FootballGameApp:footballGame", JSON.stringify(footballGameData));
        }
        clearInput();
        router.replace('/(tabs)/footballGameList');
       
    };

    const clearInput = () => {
        setTime1('');
        setTime2('');
        setPlacar('');
    }

    const handleCancel = () => {
        clearInput();
        router.replace('/(tabs)/footballGameList')
    }

    return(

        <SafeAreaProvider>
            <SafeAreaView style = {styles.container}>
                <View style = {styles.boxContainer}>
                                   
                    <TextInput
                        style = {styles.boxInput}
                        value = {time1}
                        onChangeText={ setTime1}
                        placeholder="Nome primeiro time"
                        autoFocus
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {time2}
                        onChangeText={(text)=>setTime2(text)}
                        placeholder="Nome segundo time"
                                       
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {placar}
                        onChangeText={ setPlacar}
                        placeholder="Placar"  
                    />
                                   
                </View>
            
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity
                        style = {styles.buttonAdd}  
                        onPress = { () =>{
                            onAdd(time1, time2, placar, id);
               
                        }}>
                        <Text style = {styles.buttonText} >
                            Salvar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style = {styles.buttonCancel} 
                        onPress={() =>{
                        handleCancel()
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
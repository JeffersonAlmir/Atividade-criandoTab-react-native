import { IfootballTeams } from "@/interfaces/IfootballTeams";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { useState } from "react";
import { TextInput, TouchableOpacity, View, Text,StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function FormTabTeam () {
    const {teamId, teamName, teamImage, teamNumberPlayer } = useLocalSearchParams()
   
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [numberPlayer, setNumberPlayer] = useState('');
    const [id, setId] = useState<number>(0);

    useEffect( ()=>{
        if(teamId){
            setTitle(teamName?.toString() );
            setImage(teamImage?.toString() );
            setNumberPlayer(teamNumberPlayer?.toString());
            setId(Number(teamId));
        }else{
            setTitle('');
            setImage('');
            setNumberPlayer('');
            setId(0); 
        }
    }, [teamId,teamName,teamImage,teamNumberPlayer])


    const onAdd = async (name: string, image:string, numberPlayer:string, id?: number)=>{

        const data = await AsyncStorage.getItem("@FootballTeamsApp:footballTeams");
        const footballteamsData = data != null ? JSON.parse(data) : [];

       if(!id || id <= 0){

           const newFootballTeam : IfootballTeams = {
               id : Math.random() * 1000,
               name: name,
               image: image,
               numberPlayers: numberPlayer
           };
    
           const footballTeamsPlus : IfootballTeams[] =[
               ...footballteamsData,
               newFootballTeam
           ];
           
           AsyncStorage.setItem("@FootballTeamsApp:footballTeams", JSON.stringify(footballTeamsPlus))
       } else{
            footballteamsData.forEach((team :IfootballTeams) =>{
                if(team.id === id){
                    team.name = name;
                    team.image = image;
                    team.numberPlayers = numberPlayer;
                }
            } );
            AsyncStorage.setItem("@FootballTeamsApp:footballTeams", JSON.stringify(footballteamsData))
       }
        clearInput();
        router.replace('/(tabs)/footballTeamList')
        
    };
     
  
    const clearInput = () =>{
        setTitle('');
        setImage('');
        setNumberPlayer('');
    }

    const handleCancel = () => {
        clearInput();
        router.replace('/(tabs)/footballTeamList')
    }

    return(

        <SafeAreaProvider>
            <SafeAreaView style = {styles.container}>
                <View style = {styles.boxContainer}>
                            
                    <TextInput
                        style = {styles.boxInput}
                        value = {title}
                        onChangeText={setTitle}
                        placeholder="Nome"
                        autoFocus
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {image}
                        onChangeText={ setImage}
                        placeholder="Imagem"
                                        
                    />
                    <TextInput
                        style = {styles.boxInput}
                        value = {numberPlayer}
                        onChangeText={setNumberPlayer}
                        keyboardType="numeric"
                        placeholder="Número de jogadores"  
                    />
                                    
                </View>
            
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity
                        style = {styles.buttonAdd}  
                        onPress = { () =>{
                            onAdd(title, image,numberPlayer, id)
                            

            
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
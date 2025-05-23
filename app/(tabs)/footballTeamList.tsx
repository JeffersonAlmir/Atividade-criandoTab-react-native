import FootballTeams from "@/components/footballTeams/FootballTeams";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IfootballTeams } from "@/interfaces/IfootballTeams";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import ModalDelete from "@/components/modals/ModalDelete";



export default function FootballTeamList (){
    const [footballTeam, setFootballTeam] = useState <IfootballTeams[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectTeamId, setSelectTeamId] = useState<number | null>( null);
    

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
      async function getCurrentLocation() {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location); 
      }
  
      getCurrentLocation();
    }, []);
  
    let text = 'Waiting...';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }


    useEffect(() =>{
        const getData = async () => {
            try {
                const data = await AsyncStorage.getItem("@FootballTeamsApp:footballTeams");
                const footballteamsData = data != null ? JSON.parse(data) : [];
                setFootballTeam(footballteamsData)
            } catch (e) {
                console.error("error",e);
            }
        };
        getData();
    },[])


    const onDelete = async () =>{
        if(selectTeamId !== null){
            const newTeams = footballTeam.filter((team) => team.id !== selectTeamId );
            setFootballTeam(newTeams)
            await AsyncStorage.setItem("@FootballTeamsApp:footballTeams", JSON.stringify(newTeams))
        }
        setModalVisible(false);
    }

    const openModal = (selectedTeam :IfootballTeams)=>{
        setSelectTeamId(selectedTeam.id)
        setModalVisible(true);
    };


    const closeModal = ()=>{
        setModalVisible(false);
    };

    
    const navigateUpdate = (selectTeam :IfootballTeams) =>{
        router.push({pathname:'/screens/FormTabTeam', params:{teamId: selectTeam.id, teamName:selectTeam.name,
            teamImage:selectTeam.image, teamNumberPlayer: selectTeam.numberPlayers}})
    }
    
    const navigateAdd = () =>{
        router.push({pathname:'/screens/FormTabTeam'})
        
    }

    return(
        <MyScrollView headerBackgroundColor={{light : "#A1CEDC",dark:'#1D3D47'}}>
            <TouchableOpacity onPress={() => navigateAdd()}>
                <ThemedView style={styles.headerContainer}>
                    <Text style={styles.headerButton}> + </Text>
                </ThemedView>
            </TouchableOpacity>

            <View style={styles.containerGps}>
                 <Text style={styles.paragraph}>{text}</Text>
            </View>
            
                {footballTeam.map((team)=>{
                        return(
                           
                            <View key={team.id} style={styles.containerElements}>
                                <View style={styles.teamContainer}>


                                        <FootballTeams
                                            key={team.id}
                                            title={team.name}
                                            image={team.image}
                                            numberPlayer={team.numberPlayers}
                                        />

                                </View>
                                <View >
                                    <TouchableOpacity 
                                        style = {styles.buttonUpdate}
                                        onPress={ ()=> navigateUpdate(team)}>
                                       <Text style = {styles.buttonText} >
                                            Atualizar
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity 
                                        style = {styles.buttonDelete}
                                        onPress={() =>{openModal(team)}}>
                                        <Text style = {styles.buttonText} >
                                            Deletar
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            
                            
                        );
                    })
                }
            <ModalDelete
                visible ={modalVisible}
                onCancel={closeModal}
                onDelete={onDelete}
            />

        </MyScrollView>
    );

}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection:'row',
        alignItems: 'center',
        gap: 8
    },
    stepContainer:{
        gap:5,
        marginBottom:8,
    },
    headerContainer:{
        backgroundColor:'white',
        alignItems:"center",
        justifyContent:'center',
        borderRadius:5,
        marginTop:30,
        
    },
    headerButton:{
        fontWeight:'bold',
        fontSize: 20,
        paddingHorizontal:20
    },
    containerGps: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    containerElements: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center', 
        
    },
    teamContainer: {
        flex: 1, 
        padding:5,
        
    },
    buttonDelete: { 
        height:40,
        width:100,
        padding: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 10,
        margin: 5,
        
    },
     buttonUpdate: { 
        height:40,
        width:100,
        padding: 10,
        backgroundColor: '#4A90E2',
        borderRadius: 10,
        margin: 5,
        
    },
     buttonText:{
        textAlign:'center',
        fontWeight: 'bold',
        color:"#FFF"
    },
       
}) 
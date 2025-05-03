import FootballTeams from "@/components/footballTeams/FootballTeams";
import FootballTeamsModal from "@/components/modals/FootballTeamsModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IfootballTeams } from "@/interfaces/IfootballTeams";
import { template } from "@babel/core";
import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";

export default function FootballTeamList (){
    const [footballTeam, setFootballTeam] = useState <IfootballTeams[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectTeam, setSelectTeam] = useState<IfootballTeams>();
    
    
    const onAdd = (name: string, image:string, numberPlayer:string, id?: number)=>{

       if(!id || id <= 0){

           const newFootballTeam : IfootballTeams = {
               id : Math.random() * 1000,
               name: name,
               image: image,
               numberPlayers: numberPlayer
           };
    
           const footballTeamsPlus : IfootballTeams[] =[
               ...footballTeam,
               newFootballTeam
           ];
           
           setFootballTeam(footballTeamsPlus);
       } else{
        footballTeam.forEach((team) =>{
            if(team.id === id){
                team.name = name;
                team.image = image;
                team.numberPlayers = numberPlayer;
            }
        } );
       }
        
        setModalVisible(false);
    };

    const onDelete =(id:number) =>{
        const newTeams = footballTeam.filter((team) => team.id != id);
        setFootballTeam(newTeams)
        setModalVisible(false);
    }

    const openModal = ()=>{
        setSelectTeam(undefined)
        setModalVisible(true);
    };
    
    const openModalEdit = (selectTeam: IfootballTeams) =>{
        setSelectTeam(selectTeam)
        setModalVisible(true);
    }

    const closeModal = ()=>{
        setModalVisible(false);
    };

    return(
        <MyScrollView headerBackgroundColor={{light : "#A1CEDC",dark:'#1D3D47'}}>
            <TouchableOpacity onPress={() => openModal()}>
                <ThemedView style={styles.headerContainer}>
                    <Text style={styles.headerButton}> + </Text>
                </ThemedView>
            </TouchableOpacity>
            <ThemedView style={styles.container}>
                {footballTeam.map((team, indice)=>{
                        return(
                            <TouchableOpacity key ={indice} onPress={ ()=> openModalEdit(team)}>
                                <FootballTeams
                                    key={team.id}
                                    title={team.name}
                                    image={team.image}
                                    numberPlayer={team.numberPlayers}
                                />
                            </TouchableOpacity>
                        );
                    })
                }
            </ThemedView>
            <FootballTeamsModal
                visible ={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                team ={selectTeam}
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
    reactLogo:{
        bottom:0,
        left:0
    },
    container:{
        flex:1,
        backgroundColor:'gray',
        
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
    }
})
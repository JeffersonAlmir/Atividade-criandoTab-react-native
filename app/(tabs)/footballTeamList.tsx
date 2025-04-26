import FootballTeams from "@/components/footballTeams/FootballTeams";
import FootballTeamsModal from "@/components/modals/FootballTeamsModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IfootballTeams } from "@/interfaces/IfootballTeams";
import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";

export default function FootballTeamList (){
    const [footballTeam, setFootballTeam] = useState <IfootballTeams[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAdd = (name: string, image:string, numberPlayer:string)=>{
        const newFootballTeam : IfootballTeams = {
            id : Math.random() * 1000,
            name: name,
            image: image,
            numberPlayers: numberPlayer
        }

        const footballTeamsPlus : IfootballTeams[] =[
            ...footballTeam,
            newFootballTeam
        ]
        

        setFootballTeam(footballTeamsPlus);
        setModalVisible(false);
    };

    const openModal = ()=>{
        setModalVisible(true);
    };

    const closeModal = ()=>{
        setModalVisible(false);
    };

    return(
        <MyScrollView headerBackgroundColor={{light : "#A1CEDC",dark:'#1D3D47'}}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => openModal()}>
                    <Text style={styles.headerButton}> + </Text>
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.container}>
                {
                    footballTeam.map((team)=>{
                        return(
                            <FootballTeams
                                key={team.id}
                                title={team.name}
                                image={team.image}
                                numberPlayer={team.numberPlayers}
                            />
                        )
                    })
                }
            </ThemedView>
            <FootballTeamsModal
                visible ={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
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
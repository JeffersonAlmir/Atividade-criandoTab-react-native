import FootballGame from "@/components/footballGame/FootballGame";
import FootballTeams from "@/components/footballTeams/FootballTeams";
import FootballGameModal from "@/components/modals/FootballGameModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IfootballGame } from "@/interfaces/IfootballGame";
import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";

export default function FootballGameList (){
    const [footballGame, setFootballGame] = useState <IfootballGame[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onAdd = (time1: string, time2:string, placar:string)=>{
        const newFootballGame : IfootballGame = {
            id : Math.random() * 1000,
            time1: time1,
            time2: time2,
            placar: placar
        }

        const footballGamePlus : IfootballGame[] =[
            ...footballGame,
            newFootballGame
        ]
        

        setFootballGame(footballGamePlus);
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
                    footballGame.map((game)=>{
                        return(
                            <FootballGame
                                key={game.id}
                                time1={game.time1}
                                time2={game.time2}
                                placar={game.placar}
                            />
                        )
                    })
                }
            </ThemedView>
            <FootballGameModal
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
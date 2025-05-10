import FootballGame from "@/components/footballGame/FootballGame";
import FootballGameModal from "@/components/modals/FootballGameModal";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IfootballGame } from "@/interfaces/IfootballGame";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FootballGameList (){
    const [footballGame, setFootballGame] = useState <IfootballGame[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectGame, setSelectGame] = useState<IfootballGame>();
    useEffect(() =>{
        const getData = async () => {
            try {
                const data = await AsyncStorage.getItem("@FootballGameApp:footballGame");
                const footballGameData = data != null ? JSON.parse(data) : [];
                setFootballGame(footballGameData)
            } catch (e) {
                console.error("error",e);
            }
        };
        getData();
    },[])


    const onAdd = (time1: string, time2:string, placar:string, id?: number)=>{
        if(!id || id <= 0){
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
            AsyncStorage.setItem("@FootballGameApp:footballGame", JSON.stringify(footballGamePlus))
        }else{
            footballGame.forEach((game) =>{
                if(game.id === id){
                    game.time1= time1;
                    game.time2= time2;   
                    game.placar = placar;
                }
            } );
            AsyncStorage.setItem("@FootballGameApp:footballGame", JSON.stringify(footballGame))
        }
        setModalVisible(false);
    };

    const onDelete =(id:number) =>{
        const newTeams = footballGame.filter((game) => game.id != id);
        setFootballGame(newTeams)
        AsyncStorage.setItem("@FootballGameApp:footballGame", JSON.stringify(footballGame))
        setModalVisible(false);
    }

    const openModal = ()=>{
        setSelectGame(undefined)
        setModalVisible(true);
    };
    
    const openModalEdit = (selectTeam: IfootballGame) =>{
        setSelectGame(selectTeam)
        setModalVisible(true);
    }

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
                    footballGame.map((game, indice)=>{
                        return(
                            <TouchableOpacity key ={indice} onPress={ ()=> openModalEdit(game)}>
                                <FootballGame
                                    key={game.id}
                                    time1={game.time1}
                                    time2={game.time2}
                                    placar={game.placar}
                                />   
                            </TouchableOpacity>

                        )
                    })
                }
            </ThemedView>
            <FootballGameModal
                visible ={modalVisible}
                onCancel={closeModal}
                onAdd={onAdd}
                onDelete={onDelete}
                game ={selectGame}
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
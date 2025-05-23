import FootballGame from "@/components/footballGame/FootballGame";
import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";
import { IfootballGame } from "@/interfaces/IfootballGame";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import ModalDelete from "@/components/modals/ModalDelete";
import * as Location from 'expo-location';

export default function FootballGameList (){
    const [footballGame, setFootballGame] = useState <IfootballGame[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [selectGameId, setSelectGameId] = useState<number | null>( null);

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
                const data = await AsyncStorage.getItem("@FootballGameApp:footballGame");
                const footballGameData = data != null ? JSON.parse(data) : [];
                setFootballGame(footballGameData)
            } catch (e) {
                console.error("error",e);
            }
        };
        getData();
    },[])


    const onDelete = async() =>{
        if(selectGameId !== null){
            const newGame = footballGame.filter((game) => game.id !== selectGameId );
            setFootballGame(newGame)
            await AsyncStorage.setItem("@FootballGameApp:footballGame", JSON.stringify(newGame))
        }
        setModalVisible(false);
    }
  
    const openModal = (selectGame: IfootballGame) =>{
        setSelectGameId(selectGame.id)
        setModalVisible(true);
    }

    const closeModal = ()=>{
        setModalVisible(false);
    };

    const navigateUpdate = (selectGame :IfootballGame) =>{
            router.push({pathname:'/screens/FormTabGame', params:{gameId: selectGame.id, gameTime1: selectGame.time2,
                gameTime2: selectGame.time2, gamePlacar: selectGame.placar}})
        }
        
    const navigateAdd = () =>{
        router.push({pathname:'/screens/FormTabGame'})
            
    }
    

    return(
        <MyScrollView headerBackgroundColor={{light : "#A1CEDC",dark:'#1D3D47'}}>
            <ThemedView style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigateAdd()}>
                    <Text style={styles.headerButton}> + </Text>
                </TouchableOpacity>
            </ThemedView>
            <View style={styles.containerGps}>
                             <Text style={styles.paragraph}>{text}</Text>
                        </View>


            {footballGame.map((game )=>{
                return(

                    <View key={game.id} style={styles.containerElements}>
                        <View style={styles.teamContainer}>
                            
                            
                            <FootballGame
                                key={game.id}
                                time1={game.time1}
                                time2={game.time2}
                                placar={game.placar}
                            />   
                            
                        </View>
                        <View  key={game.id}>
                            <TouchableOpacity   
                                style = {styles.buttonUpdate}
                                onPress={ ()=> navigateUpdate(game)}
                            >
                                <Text style = {styles.buttonText} >
                                    Atualizar
                                </Text>
                            </TouchableOpacity>
                                
                            <TouchableOpacity 
                                style = {styles.buttonDelete}
                                onPress={() =>{openModal(game)}}
                            >
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
    },
     containerElements: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center', 
        
    },
    teamContainer: {
        flex: 1, 
        padding:15,
        
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
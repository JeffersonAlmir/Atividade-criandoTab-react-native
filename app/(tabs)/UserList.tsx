import MyScrollView from "@/components/MyScrollView";
import { ThemedView } from "@/components/ThemedView";


import { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Pressable, View } from "react-native";


import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from "@/interfaces/IUser";
import UserModal from "@/components/modals/UserModal";
import User from "@/components/user/User";


export default function FootballTeamList (){
   const [user, setUser] = useState <IUser[]>([]);
   const [modalVisible, setModalVisible] = useState<boolean>(false);
   const [selectUser, setSelectUser] = useState<IUser>();
  


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
               const data = await AsyncStorage.getItem("@UserApp: Usuario");
               const UserData = data != null ? JSON.parse(data) : [];
               setUser(UserData)
           } catch (e) {
               console.error("error",e);
           }
       };
       getData();
   },[])
  
   const onAdd = (email: string, senha:string, id?: number)=>{


      if(!id || id <= 0){


          const newUser : IUser = {
              id : Math.random() * 1000,
              email: email,
              senha: senha,
             
          };
  
          const userPlus : IUser[] =[
              ...user,
              newUser
          ];
         
          setUser(userPlus );
          AsyncStorage.setItem("@UserApp: Usuario", JSON.stringify(userPlus))
      } else{
           user.forEach((item) =>{
               if(item.id === id){
                   item.email = email;
                   item.senha = senha;


               }
           } );
           AsyncStorage.setItem("@UserApp: Usuario", JSON.stringify(user))
      }
      
       setModalVisible(false);
   };


   const onDelete =(id:number) =>{
       const newUsers = user.filter((item) => item.id != id);
       setUser(newUsers)
       AsyncStorage.setItem("@UserApp: Usuario", JSON.stringify(user))
       setModalVisible(false);
   }


   const openModal = ()=>{
       setSelectUser(undefined)
       setModalVisible(true);
   };
  
   const openModalEdit = (selectUser: IUser) =>{
       setSelectUser(selectUser)
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


           <View style={styles.containerGps}>
                <Text style={styles.paragraph}>{text}</Text>
           </View>
           <ThemedView style={styles.container}>
               {user.map((item, indice)=>{
                       return(
                           <TouchableOpacity key ={indice} onPress={ ()=> openModalEdit(item)}>
                               <User
                                   key={item.id}
                                   email={item.email}
                                   senha ={item.senha}
                               />
                           </TouchableOpacity>
                       );
                   })
               }
           </ThemedView>
           <UserModal
               visible ={modalVisible}
               onCancel={closeModal}
               onAdd={onAdd}
               onDelete={onDelete}
               user ={selectUser}
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
})

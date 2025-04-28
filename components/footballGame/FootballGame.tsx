import { StyleSheet, Text, View } from "react-native";


export type FootballGameProps = {
    time1: string;
    time2: string;
    placar: string;

};

export default function FootballGame({time1,time2,placar}: FootballGameProps){
    return(

        <View style ={styles.box}>
            <View style ={styles.row}>
            <Text style = {styles.title}>{time1}</Text>
            <Text style = {styles.title}>x</Text>
            <Text style = {styles.title}>{time2}</Text>
            </View>
            <Text style = {styles.title}> {placar}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    box:{
        backgroundColor :'white',
        alignItems:'center',
        padding:20,
        margin: 20,
        borderRadius:5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    row: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    title:{
        fontSize:20,
        margin:10,
    } 
})

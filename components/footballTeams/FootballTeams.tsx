import { Image, StyleSheet, Text, View } from "react-native";


export type FootballTeamsProps = {
    title: string;
    image: string;
    numberPlayer: string;

};

export default function FootballTeams({title,image,numberPlayer}: FootballTeamsProps){
    return(

        <View style ={styles.box}>
            <View style ={styles.row}>
            <Image
                style={styles.tinyLogo}
                source={{
                uri: image,
                }}
            />
            <Text style = {styles.title}>{title}</Text>
            </View>
            <Text> Número de Jogadores: {numberPlayer}</Text>
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
        fontSize:20
    } 
})

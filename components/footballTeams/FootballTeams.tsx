import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import FootballTeamsModal from "../modals/FootballTeamsModal";


export type FootballTeamsProps = {
    title: string;
    image: string;
    numberPlayer: string;

};

export default function FootballTeams({title, image, numberPlayer}: FootballTeamsProps) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    return (
        <>
        <View style={styles.box}>
            {/* Alinhamento horizontal */}
            <View style={styles.row}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: image,
                    }}
                />
                <Text style={styles.title}>{title}</Text>
                
            </View>

            <Text> Número de Jogadores: {numberPlayer}</Text>
        </View>

    
        </>
    );
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderRadius: 5,
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
    title: {
        fontSize: 20,
    }
});


import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-reanimated-table';
import dados from '@/data/data.json'

const Tabela = () => {

    const tableHead = ['Posição','Nome', 'Pontos', 'Partidas', 'Vitórias', 'Derrotas', 'Empates'];
    const tableData = dados.map((time) => [
      time.posicao,
      time.nome,
      time.pts,
      time.totalPartida,
      time.vitoria,
      time.derrota,
      time.empate,
    ]);
    
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  
}

export default Tabela;
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
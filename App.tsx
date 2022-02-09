import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {Cita} from './src/components/Cita';
import {Form} from './src/components/Form';
import 'react-native-get-random-values';
export interface CitasInterface {
  id: string;
  paciente: string;
  propietario: string;
  sintomas: string;
  date: Date;
  time: Date;
}

const App = () => {
  const [citas, setCitas] = useState<CitasInterface[]>([]);
  const [showForm, setShowForm] = useState(false);

  // delete citas
  const deleteCita = (id: string) => {
    setCitas(citasAct => {
      return citasAct.filter(cita => cita.id !== id);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenido}>
        <TouchableHighlight
          onPress={() => setShowForm(!showForm)}
          activeOpacity={0.5}
          underlayColor="#2471A3"
          style={styles.btnShowform}>
          <Text style={styles.btnShowFormText}>
            {!showForm ? 'Nueva cita' : 'Ver citas'}
          </Text>
        </TouchableHighlight>
        {showForm ? (
          <>
            <Text style={styles.title}>Agregar Nueva cita</Text>
            <Form citas={citas} setCitas={setCitas} setShowForm={setShowForm} />
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {citas.length > 0
                ? 'Administra Tus citas'
                : 'No hay citas, agregar una'}
            </Text>
            <FlatList
              style={styles.flatList}
              data={citas}
              renderItem={({item}) => (
                <Cita cita={item} deleteCita={deleteCita} />
              )}
              keyExtractor={cita => cita.id}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#34495E',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    marginTop: 4,
    paddingTop: 8,
  },
  contenido: {
    flex: 1,
  },
  flatList: {
    flex: 1,
    marginHorizontal: 8,
  },
  btnShowform: {
    padding: 8,
    backgroundColor: '#2980B9',
    borderColor: '#2471A3',
    borderWidth: 1,
    marginTop: 18,
    borderRadius: 4,
    marginHorizontal: 16,
  },
  btnShowFormText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;

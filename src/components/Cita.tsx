import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {CitasInterface} from '../../App';

interface CitaProps {
  cita: CitasInterface;
  deleteCita: (id: string) => void;
}

export const Cita = ({cita, deleteCita}: CitaProps) => {
  const handleDelete = (id: string) => {
    deleteCita(id);
  };

  return (
    <View style={styles.citacontainer}>
      <View style={styles.citaFlex}>
        <View style={styles.info}>
          <View style={styles.citaItem}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.text}>{cita.paciente}</Text>
          </View>
          <View style={styles.citaItem}>
            <Text style={styles.label}>Propietario:</Text>
            <Text style={styles.text}>{cita.propietario}</Text>
          </View>
          <View style={styles.citaItem}>
            <Text style={styles.label}>Sintomas: </Text>
            <Text style={styles.text}>{cita.sintomas}</Text>
          </View>
        </View>
        <View style={styles.dateInfo}>
          <View style={styles.citaItem}>
            <Text style={styles.label}>Fecha: </Text>
            <Text style={styles.date}>
              {cita.date.toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'long',
                day: '2-digit',
              })}
            </Text>
          </View>
          <View style={styles.citaItem}>
            <Text style={styles.label}>Hora: </Text>
            <Text style={styles.date}>
              {`${cita.time.getHours()}:${cita.time.getMinutes()}`}
            </Text>
          </View>
        </View>
      </View>
      <TouchableHighlight
        onPress={() => handleDelete(cita.id)}
        style={styles.btnDelete}>
        <Text style={styles.btnText}>Eliminar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  citacontainer: {
    backgroundColor: '#E5E7E9',
    borderBottomColor: '#CACFD2',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: '#D7DBDD',
    borderWidth: 1,
    flexDirection: 'column',
  },
  citaFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
  },
  dateInfo: {
    alignItems: 'flex-start',
  },
  citaItem: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    marginRight: 8,
  },
  date: {
    color: '#16A085',
  },
  btnDelete: {
    padding: 6,
    backgroundColor: '#FADBD8',
    borderColor: '#E6B0AA',
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 4,
  },
  btnText: {
    color: '#943126',
    fontSize: 14,
    textAlign: 'center',
  },
});

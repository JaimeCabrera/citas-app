import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {CitasInterface} from '../../App';
import {v4 as uuid} from 'uuid';

interface Props {
  citas: CitasInterface[];
  setCitas: (cita: CitasInterface[]) => void;
  setShowForm: (value: boolean) => void;
}

export const Form = ({citas, setCitas, setShowForm}: Props) => {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [contacto, setContacto] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // console.log(paciente, dueno, contacto, date, time, sintomas);

  const [openTimePick, setOpenTimePick] = useState(false);
  const [openDatePick, setOpenDatePick] = useState(false);

  const openDatePicker = () => {
    setOpenDatePick(true);
  };
  const onCloseDatePick = () => {
    setOpenDatePick(false);
  };

  // const options = {year: 'numeric', month: 'long', day: '2-digit'};
  const onConfirmDate = (dat: any) => {
    console.log(dat.toLocaleDateString('es-ES'));

    setOpenDatePick(false);
    setDate(dat);
    // setDate(dat.toLocaleDateString('es-ES', options));
  };
  const openTimePicker = () => {
    setOpenTimePick(true);
  };
  const onCloseTimePick = () => {
    setOpenTimePick(false);
  };

  const onConfirmTime = (tim: Date) => {
    setOpenTimePick(false);
    setTime(tim);
  };
  const currentDate = () => {
    const month = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  };

  const currentTime = () => {
    return `${time.getHours()}:${time.getMinutes()}`;
  };
  // mostrar alerta
  const showAlert = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [{text: 'Ok'}]);
  };
  // save cita
  const handleNewCita = () => {
    // validate
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      contacto.trim() === '' ||
      sintomas.trim() === ''
    ) {
      showAlert();
    }
    const cita = {
      id: '',
      paciente,
      propietario,
      contacto,
      date,
      time,
      sintomas,
    };
    cita.id = uuid();
    const cits = [...citas, cita];
    setCitas(cits);
    // hide form
    setShowForm(false);
    // reset form values
  };
  // show alert if validate fail

  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Paciente</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            onChangeText={text => setPaciente(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño</Text>
          <TextInput
            keyboardType="default"
            style={styles.input}
            onChangeText={text => setPropietario(text)}
          />
        </View>
        <View>
          <Text style={styles.label}>contacto</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={text => setContacto(text)}
          />
        </View>
        {/* datepicker */}
        <>
          <Text style={styles.label}>Fecha:</Text>
          <TouchableHighlight
            onPress={openDatePicker}
            activeOpacity={0.4}
            underlayColor="#E5E7E9"
            style={styles.btnPicker}>
            <Text style={styles.btnPickerText}>{currentDate()}</Text>
          </TouchableHighlight>
          {/* <Button title="Seleciona la fecha" onPress={openDatePicker} /> */}
          <DatePicker
            modal
            mode="date"
            open={openDatePick}
            date={date}
            onConfirm={dat => onConfirmDate(dat)}
            onCancel={onCloseDatePick}
            locale="es_US"
            title="Seleciona la Fecha:"
            confirmText="confirmar"
            cancelText="cancelar"
          />
        </>
        {/* time picker */}
        <>
          <Text style={styles.label}>Hora:</Text>
          {/* <Button title="Seleciona la Hora" onPress={openTimePicker} /> */}
          <TouchableHighlight
            onPress={openTimePicker}
            activeOpacity={0.4}
            underlayColor="#E5E7E9"
            style={styles.btnPicker}>
            <Text style={styles.btnPickerText}>{currentTime()}</Text>
          </TouchableHighlight>
          <DatePicker
            modal
            mode="time"
            open={openTimePick}
            date={time}
            onConfirm={tim => onConfirmTime(tim)}
            onCancel={onCloseTimePick}
            locale="es_US"
            is24hourSource="device"
            title="Selecciona la Hora:"
            confirmText="confirmar"
            cancelText="cancelar"
          />
        </>
        <View>
          <Text style={styles.label}>Sintomas</Text>
          <TextInput
            multiline
            keyboardType="default"
            style={styles.input}
            onChangeText={text => setSintomas(text)}
          />
        </View>
        <TouchableHighlight
          onPress={handleNewCita}
          activeOpacity={0.5}
          underlayColor="#FAD7A0"
          style={styles.btnSave}>
          <Text style={styles.btnSaveText}>Guardar Nueva Cita</Text>
        </TouchableHighlight>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    // paddingVertical: 4,
    // marginHorizontal: 4,
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
  input: {
    height: 36,
    borderColor: '#ABB2B9',
    borderWidth: 1,
    padding: 0,
    borderRadius: 4,
    borderStyle: 'solid',
  },
  btnPicker: {
    padding: 8,
    backgroundColor: '#D7DBDD',
    borderColor: '#AEB6BF',
    borderWidth: 1,
    marginVertical: 2,
    borderRadius: 4,
  },
  btnPickerText: {
    color: '#566573',
    fontSize: 14,
    textAlign: 'center',
  },
  btnSave: {
    padding: 8,
    backgroundColor: '#F4D03F',
    borderColor: '#F1C40F',
    borderWidth: 1,
    marginTop: 18,
    borderRadius: 4,
  },
  btnSaveText: {
    color: '#34495E',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

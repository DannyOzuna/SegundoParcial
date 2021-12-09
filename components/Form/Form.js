import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from "react-native";

export const Form = () => {
  const [data, setData] = useState({
    nombre: "",
    tipo: "",
    telefono: "",
    direccion: "",
    longitud: "",
    latitud: "",
  });

  const handleChange = (key, value) => {
    setData({ [key]: value });
  };

  const handleSubmit = () => {
    let value = {
      nombre: data.nombre,
      tipo: data.tipo,
    };

    console.log(value);
  };

  console.log(data);

  return (
    <ScrollView>
      <View style={styles.formulario}>
        <View>
          <Text style={styles.label}>Nombre: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange("nombre", value)}
          />
        </View>
        <View>
          <Text style={styles.label}>Tipo: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange("tipo", value)}
          />
        </View>
        <View>
          <Text style={styles.label}>Foto: </Text>
          <TextInput style={styles.input} />
        </View>
        <View>
          <Text style={styles.label}>Telefono: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleChange("telefono", value)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dirección: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange("direccion", value)}
          />
        </View>
        <View>
          <Text style={styles.label}>Longitud: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleChange("longitud", value)}
          />
        </View>
        <View>
          <Text style={styles.label}>Latitud: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => handleChange("latitud", value)}
          />
        </View>
        <View>
          <TouchableHighlight
            style={styles.btnSubmit}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.textoSubmit}>Crear Nueva Citas</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formulario: {
    marginTop: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: "2.5%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e1e1e1",
    borderWidth: 1,
    borderStyle: "solid",
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10,
  },
  textoSubmit: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

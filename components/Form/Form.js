import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Link } from 'react-router-native';

import { Camera } from 'expo-camera';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app';
import * as storage from 'firebase/storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://negocio-app.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});

const { height, width } = Dimensions.get('screen');
export default function Form() {
  const [data, setData] = useState({
    nombre: '',
    tipo: '',
    telefono: '',
    direccion: '',
    longitud: '',
    latitud: '',
  });
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [telefeno, setTelefono] = useState(0);
  const [direccion, setDirrection] = useState('');
  const [longitud, setLongitud] = useState(0);
  const [latitud, setLatitud] = useState(0);

  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [startCamera, setStartCamera] = useState(false);
  const refCamera = useRef(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,

      aspect: [4, 3],
    });

    if (!result.cancelled) {
      // console.log(result.base64.split(','));

      uploadImageAsync(result.uri);
      let base64Img = `data:image/jpg;base64,${result.base64}`;

      //Add your cloud name
      let apiUrl = 'https://api.cloudinary.com/v1_1/drcr00s2s/image/upload';
      let data = {
        file: base64Img,
        upload_preset: 'zb5homf3',
      };
      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then(async (r) => {
          console.log(JSON.stringify(r));
          let data = await r.json();
          setImage(data.url);
          return data.secure_url;
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = () => {
    const dataObject = {
      nombre: nombre,
      tipo: tipo,
      telefeno: telefeno,
      direccion: direccion,
      longitud: longitud,
      latitud: latitud,
      foto: image,
    };
    const toJSON = dataObject;
    console.log(toJSON);

    fetch('https://negocio-app.herokuapp.com/negocio', {
      body: JSON.stringify({
        direccion: direccion,
        foto: image,
        latitud: 18.90919,
        longitud: -70.74499,
        nombre: nombre,
        telefono: telefeno,
        tipo: tipo,
      }),
      headers: {
        'Content-type': 'application/json',
      },
      method: 'POST',
    })
      .then((v) => {
        return v.json();
      })
      .then((r) => {
        console.log(r);
      })
      .catch(console.error);
    const rq = api.post('/negocio', {
      ...dataObject,
    });
    // rq.then(console.log);
  };
  const handleChange = (key, value) => {};

  async function uploadImageAsync(uri) {
    try {
      const f = await fetch(uri, { method: 'GET' });
      const blob = await f.blob();
      //console.log(JSON.stringify(blob));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.formulario}>
        <View>
          <Text style={styles.label}>Nombre: </Text>
          <TextInput style={styles.input} onChangeText={(value) => setNombre(value)} />
        </View>
        <View>
          <Text style={styles.label}>Tipo: </Text>
          <TextInput style={styles.input} onChangeText={(value) => setTipo(value)} />
        </View>

        <View>
          <Text style={styles.label}>Telefono: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => setTelefono(value)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dirección: </Text>
          <TextInput style={styles.input} onChangeText={(value) => setDirrection(value)} />
        </View>
        <View>
          <Text style={styles.label}>Longitud: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => setLongitud(parseFloat(value))}
          />
        </View>
        <View>
          <Text style={styles.label}>Latitud: </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => setLatitud(parseFloat(value))}
          />
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.label}>Foto: </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 400,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableHighlight
              onPress={pickImage}
              style={{
                width: 130,
                borderRadius: 4,
                backgroundColor: '#14274e',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              }}
            >
              <Text style={{ color: '#fff' }}>Capturar foto</Text>
            </TouchableHighlight>
          </View>

          <View style={{ padding: 20, height: 20 }}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          <Link
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
            }}
            onPress={handleSubmit}
            to="/map"
          >
            <Text style={{ color: '#fff' }}>Guardar</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formulario: {
    marginTop: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 10,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

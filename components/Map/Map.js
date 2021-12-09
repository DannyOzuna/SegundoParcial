import * as React from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";

function useDebounce(input, delay = 1200) {
  const [value, setValue] = React.useState(input);
  React.useEffect(() => {
    const handleTimeout = setTimeout(() => {
      setValue(input);
    }, delay);

    return () => {
      clearTimeout(handleTimeout);
    };
  }, [input, delay]);
  return value;
}

export default function Map() {
  const [latitude, setLatitude] = React.useState(19.45);
  const [longitude, setLongitude] = React.useState(-70.7);
  const mapRef = React.useRef(null);
  const dLatitude = useDebounce(latitude, 1500);
  const dLongitude = useDebounce(longitude, 1500);
  const [region, setRegion] = React.useState({
    latitude: dLatitude,
    longitude: dLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [pin, setPin] = React.useState({
    latitude: dLatitude,
    longitude: dLongitude,
  });

  const handleChangeLocation = (e) => {
    e.preventDefault();
    console.log(e);
    setRegion({
      latitude: dLatitude,
      longitude: dLongitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    mapRef.current.animateToRegion(
      {
        latitude: dLatitude,
        longitude: dLongitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      3 * 1000
    );

    setPin({
      latitude: dLatitude,
      longitude: dLongitude,
    });
  };
  React.useEffect(() => {}, [dLatitude, dLongitude]);

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <View
        style={{
          marginBottom: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <TextInput
            onChangeText={(value) => {
              setLatitude(Number(value));
              console.log(Number(value));
            }}
            onChange={(e) => {
              e.preventDefault();
            }}
            placeholder="Latitud"
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            onChangeText={(value) => {
              setLongitude(Number(value));
            }}
            onChange={(e) => {
              e.preventDefault();
            }}
            placeholder="Longitud"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
        <View>
          <View style={{ padding: 10 }}>
            <Button
              title="Get location"
              onPress={(e) => {
                handleChangeLocation(e);
              }}
            />
          </View>
        </View>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...region,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        onRegionChangeComplete={(_) => setRegion(_)}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  input: {
    borderRadius: 10,
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

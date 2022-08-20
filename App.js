import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';


const App = () => {
  const [selectedImage, setselectedImage] = useState(null)

  //Permisos para acceder a la carpeta de imagenes

  let openImagePicker = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false) {
      alert ('Se requiere los permisos de acceso a la camara');
      return;
    }

    //Mostrar la imagen seleccionada

    const pickerResult = await ImagePicker.launchImageLibraryAsync();  //Mostrar todas las imagenes con imagePicker

    if (pickerResult.cancelled === true) {
      return;
    }
      setselectedImage({localUri: pickerResult.uri});    
  };

  const openShareDialog = async() => {
    if (!(await Sharing.isAvailableAsync())) {
      alert (`La imagen esta disponible en : ${selectedImage.remoteUri}`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }
  return (
    <View style= {styles.container}>
        <Text
          style= {styles.title}
        >Selecciona una imagen
        </Text>
      <TouchableOpacity
        onPress={openImagePicker}
      >
      <Image
      source = {{
        uri: 
          selectedImage !== null 
            ? selectedImage.localUri 
            : 'https://picsum.photos/200/200'
      }}
      style = {styles.image}
      />
      </TouchableOpacity>
      {
        selectedImage ? (
          <TouchableOpacity  //Boton personalizable con estilos
            onPress={openShareDialog}
            style = {styles.touch}
            >
            <Text
            style= {styles.text_button}
            >Comparte</Text>
          </TouchableOpacity>
        ):( <View/>
      )}
    </View>
  )
}
const styles = StyleSheet.create ({
  container: {
    flex:1, 
    justifyContent:'center', 
    alignItems:'center',
    backgroundColor: '#292929'
  },
  title: {
    fontSize:30,
    color: '#fff'
  },
  image : {
    width:200,
    height:200,
    margin: 5,
    resizeMode: 'contain',
    borderRadius : 100, //No se pone 50%, se pone la mitad del ancho y alto
  },
  touch : {
    width : 100,
    height : 50,
    backgroundColor : '#000',
    margin : 15,
  },
  text_button : {
    color : '#fff',
    margin : 'auto',
    textAlign : 'center',
    marginTop : 10,
    fontSize : 20,
  },
})

export default App;
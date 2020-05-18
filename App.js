import * as React from 'react';
import { StyleSheet, Button, Image, Text, View, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    image: null,
  };

  // video image test: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>Video App</Text>

        <Button title="Selecciona un vídeo" onPress={this._pickImage} />
        {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {console.log('Render ..image ', image)} */}

        {image &&       
          <Video
            source={{ uri: image }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={styles.video}
          />
        }

      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log('Fin _pickImage' ,result);
    } catch (E) {
      console.log('Leegue al Error catch', E);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E4053',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: width,
    height: height/ 3
  },
  title: {
    padding: 12,
    fontSize: 20,
    color: '#00C0BC'
  }
});
  
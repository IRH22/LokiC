import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import { PricingCard } from 'react-native-elements';
import db from './localDB';
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { text: '', 
                   chunks: [],
                   phonicSounds: [] 
                   };
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#471E51'}
          centerComponent={{
            text: 'Loki Chunky',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <Image
          style={styles.imagenChango}
          source={require('./assets/aligator_loki.png')}
        />
         <TextInput
          style={styles.boxinput}
          onChangeText={text => {
            this.setState({ text: text });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toString().toLowerCase().trim();
            console.log(word);
            db[word]
              ? (this.setState({ chunks: db[word].chunks }),
                this.setState({ phonicSounds: db[word].phones }))
              : Alert.alert('The word does not exist in our database');
          }}>
          <Text style={styles.buttonText}>GO</Text>
        </TouchableOpacity>

        <View>
          {this.state.chunks.map((item, index) => {
            return (
              <PhonicSoundButton
                wordChunk={this.state.chunks[index]}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebeded',
  },

  boxinput: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    borderRadius: 15,
    backgroundColor: '#00e0b7',
    borderColor: '#367a6e',
  },

  goButton: {
    marginTop: 30,
    width: 250,
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#9305a3',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  imagenChango: {
    width: 150,
    height: 150,
    marginLeft: 120,
  },
});

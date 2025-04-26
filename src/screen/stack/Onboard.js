import {Image, ImageBackground, Text, View} from 'react-native';

const Onboard = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: 100,
        alignItems: 'center',
      }}>
      <ImageBackground
        source={require('../../../assets/images/onboardBg.png')}
        style={{
          flex: 1,
          width: '100%',
          top: 100,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5,
        }}>
        <View>
          <View>
            <Text>fffff</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Onboard;

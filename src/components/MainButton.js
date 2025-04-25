import {Text, TouchableOpacity, View} from 'react-native';

const MainButton = ({text}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        width: '100%',
        height: 56,
        borderRadius: 20,
        backgroundColor: '#FFC20E',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MainButton;

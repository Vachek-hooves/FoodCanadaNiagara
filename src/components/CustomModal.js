import {useState} from 'react';
import {Modal, View} from 'react-native';

const CustomModal = ({visible, children}) => {
  const [showModal, setShowModal] = useState(visible);

  return (
    <Modal transparent visible={showModal} statusBarTranslucent={true}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            paddingBottom: 25,
            backgroundColor: '#1C5839',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            paddingTop: 25,
            paddingBottom: 60,
            position: 'absolute',
            bottom: 0,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

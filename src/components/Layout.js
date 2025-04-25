import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Layout = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 1.1}}
      colors={['#2CB76F', '#0B4D2B']}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Layout;

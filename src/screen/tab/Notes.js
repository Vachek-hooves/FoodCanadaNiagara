import {Image, StyleSheet, Text, View} from 'react-native';

const Notes = () => {
  return (
    <View style={styles.container}>
      <Text>Notes</Text>
      <View style={{marginTop: 50, flexDirection: 'row', marginHorizontal: 30}}>
        <Text>Homeeee</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Notes;

import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Receipts = () => {
  const [sliderValues, setSliderValues] = useState([20, 80]);

  const handleValuesChange = values => {
    setSliderValues(values);
  };

  return (
    <View style={styles.container}>
      <Text>
        Selected Range: {sliderValues[0]} - {sliderValues[1]}
      </Text>
      <MultiSlider
        style={styles.slider}
        values={sliderValues}
        sliderLength={300}
        onValuesChange={handleValuesChange}
        min={0}
        max={100}
        step={1}
        allowOverlap={false}
        snapped
        markerStyle={styles.marker}
        pressedMarkerStyle={styles.pressed}
        selectedStyle={styles.selectedTrack}
        unselectedStyle={styles.unselectedTrack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  marker: {
    backgroundColor: '#FFC20E',
    width: 24,
    height: 24,
  },
  selectedTrack: {
    backgroundColor: '#FFC20E',
  },
  unselectedTrack: {
    backgroundColor: '#fff',
  },
  pressed: {backgroundColor: '#FFC20E', width: 24, height: 24},
});

export default Receipts;

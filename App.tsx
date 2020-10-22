import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <Text>Hello World</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inner: {alignItems: 'center', flexDirection: 'column', width: '100%'},
});

export default App;

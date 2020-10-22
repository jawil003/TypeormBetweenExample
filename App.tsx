import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const App: React.FC = () => {
  return (
    <View style={styles.root}>
      <Text>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default App;

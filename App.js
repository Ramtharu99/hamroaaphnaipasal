import React from 'react';
import { AuthProvider } from './src/(auth)/authContex';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => (
  <AuthProvider>
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  </AuthProvider>
);

export default App;

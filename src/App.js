import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Apps from './routes/Apps';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Apps/>
    </ChakraProvider>
  );
}

export default App;

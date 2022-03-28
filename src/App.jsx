import React from 'react';
import { ChakraProvider, extendTheme  } from '@chakra-ui/react';
import { createBreakpoints } from "@chakra-ui/theme-tools";
import Apps from './routes/Apps.jsx';
import { RecoilRoot } from 'recoil';

const breakpoints = createBreakpoints({
  sm: "480px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
});

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={extendTheme(breakpoints)}>
        <Apps />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;

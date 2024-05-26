import {ThemeProvider} from 'styled-components'
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/themes/global';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { CyclesContextProvider } from './contexts/CyclesContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <BrowserRouter>
          <Router/>
        </BrowserRouter>
      </CyclesContextProvider>
        
      <GlobalStyle/>
    </ThemeProvider>
  )
}
import { createGlobalStyle } from "styled-components";
import React from "react";

import THEME from "./theme/Theme";
import ThemeProvider from "./components/themeProvider/ThemeProvider";
import Router from "./components/router/Router";
import Routes from "./components/routes/Routes";

const setDefaultColors = (variant = "dark") => {
  return Object.entries(THEME.colors[variant]).reduce((accu, [rule, value]) => {
    return `${rule}:${value}; ${accu}`;
  }, "");
};

const setFonts = () => {
  const strings = Object.entries(THEME.font).map(([_, category]) => {
    return Object.entries(category).reduce((accu, [rule, value]) => {
      return `${rule}:${value}; ${accu}`;
    }, "");
  });
  return strings.join(";");
};

const GlobalStyle = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;  
    margin: 0;
    
    *, *:before, *:after {
        box-sizing: border-box;
    }  
  } 
  
  :root{  
    ${setDefaultColors()};    
    ${setFonts()}; 
  }
  
  #root{      
    height:100vh;   
    background-color: var(--color-background);     
  }
  
  button {
    color: var(--color-background);
    font-size: 1em;
    margin: 1em;
    padding: 0.6em 1em;
    border-radius: 30px;
    background-color: var(--color-primary);
    border: none;
    outline: none;
    &:hover {
      background-color: var(--color-error);
    }
  }
`;

function App({ history }) {
  return (
    <ThemeProvider theme={THEME}>
      <Router history={history}>
        <Routes />
      </Router>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;

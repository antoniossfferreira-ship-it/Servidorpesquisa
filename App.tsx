import React from 'react';
import MainApp from './MainApp';

// Este arquivo atua como um fallback/proxy para garantir que builds 
// que procurem por "App" (seja por cache ou import antigo) funcionem corretamente.
const App = () => {
  return <MainApp />;
};

export default App;
import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles_folder/index.css' 
import './styles_folder/header_styles.css' 
import './styles_folder/left_styles.css' 
import './styles_folder/right_styles.css' 



import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



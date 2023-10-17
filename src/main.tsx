import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import PhotoProvider from './context/PhotoContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
   <PhotoProvider>
      <App />
   </PhotoProvider>
);

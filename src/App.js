import React from 'react';
import UploadPage from './Pages/UpoadPage';
import './style.css';

const App = () => {
  return (
    <div>
      <h1 style={{justifyContent:'center',alignContent:'center',marginLeft:'23%'}}>AWS-TEXTRACT POWERED GLASS INVOICE PARSER</h1>
      <UploadPage />
    </div>
  );
};

export default App;

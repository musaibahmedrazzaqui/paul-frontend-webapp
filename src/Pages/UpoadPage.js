import React, { useState } from 'react';
import Card from "../Card"

const UploadPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    // Handle browse functionality based on selectedCard and selectedFiles
    if (selectedCard && selectedFiles.length > 0) {
      console.log(`Browse ${selectedCard}`, selectedFiles); // Example: Log selected card and files
    } else {
      console.log('Please select a card and some files');
    }
  };

  return (
    <div className="card-container" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
      <Card
        title="Business Macro"
        description="Business Macro"
        shortcode="business-macro"
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
      />
      <Card
        title="Trade Direct First Degree"
        description="Trade Direct First Degree"
        shortcode="trade-direct"
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
      />
      <Card
        title="Wiltshire"
        description="Wiltshire"
        shortcode="wiltshire"
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
      />
      <Card
        title="WindoorMate"
        description="WindoorMate"
        shortcode="windoormate"
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
      />
      <input type="file" multiple onChange={handleFileChange} className='centered-div'/>
      <div className='centered-div'>
        <button disabled={!selectedCard || selectedFiles.length === 0} onClick={handleUpload} className='button' style={{marginTop:"10rem"}}>
          Upload Files
        </button>
      </div>
    </div>
  );
};

export default UploadPage;

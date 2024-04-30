import React, { useState } from 'react';
import Card from "../Card";
import axios from 'axios';

const UploadPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading,setIsloading]=useState(false)
  const handleCardClick = (cardTitle) => {
    setSelectedCard(cardTitle);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    if (selectedCard && selectedFiles.length > 0) {
      const formData = new FormData();
      console.log("select",selectedFiles,selectedCard)
      setIsloading(true)
      // Append all files to FormData
      for (const file of selectedFiles) {
        formData.append('files', file);
      }
      let url =""
      if(selectedCard == "wiltshire" || selectedCard =="business-macro"){
        url = 'http://13.40.49.127:5000/process-pdf/'
      }else{
        url ="http://13.40.49.127:5000/process-pdf/trade-first"
      }
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        setUploadMessage('Upload successful!');
        setIsloading(false)
        // Handle rejected files, if any
        const rejectedFilesHeader = response.headers.rejected_files;
        if (rejectedFilesHeader) {
          setUploadMessage(`Rejected Files: ${rejectedFilesHeader}`);
        }

        // Prepare download link for processed data
        const csvHeader = 'Ref, Job No, Customer, Location B, Qty, Width, Height, Glass type, Location A, Glass Required';
        const csvDataWithHeader = csvHeader + '\n' + response.data;
        const blob = new Blob([csvDataWithHeader], { type: 'text/csv' });
        const downloadUrl = URL.createObjectURL(blob);

        setDownloadLink({
          href: downloadUrl,
          text: 'Download Processed Data',
          download: 'processed_data.csv',
        });

      })
      .catch(error => {
        setUploadMessage('Error uploading files. Please try again.');
        console.error('Error processing files:', error);
      });
    } else {
      setUploadMessage('Please select a card and some files before uploading.');
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
      <input type="file" multiple onChange={handleFileChange} className="centered-div" />
      <div className="centered-div">
        {loading ? (<h1>Loading..</h1>): (  <button
          disabled={!selectedCard || selectedFiles.length === 0}
          onClick={handleUpload}
          className="button"
          style={{ marginTop: "10rem" }}
        >
          Upload Files
        </button>)}
      
      </div>
      <div>
        {uploadMessage && <p>{uploadMessage}</p>}
        {downloadLink && (
          <a
            href={downloadLink.href}
            download={downloadLink.download}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'green')}
            className="downloadBtn"
          >
            {downloadLink.text}
          </a>
        )}
      </div>
    </div>
  );
};

export default UploadPage;

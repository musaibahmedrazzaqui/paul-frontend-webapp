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
        //url = 'http://0.0.0.0:5000/process-pdf/'
      }else if(selectedCard=='choice'){
        url ="http://13.40.49.127:5000/process-pdf/choice"
        //url ="http://localhost:5000/process-pdf/choice"
      }else if(selectedCard=="alumate"){
        url ="http://13.40.49.127:5000/process-pdf/alumate"
        //url ="http://localhost:5000/process-pdf/alumate"
      }
      else{
        url ="http://13.40.49.127:5000/process-pdf/trade-first"
        //url ="http://localhost:5000/process-pdf/trade-first"
      }
      let promises=[]
      promises.push(
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        //console.log(response.headers)
        return response

      })
      .catch(error => {
        setUploadMessage('Error uploading files. Please try again.');
        console.error('Error processing files:', error);
      }));
      Promise.all(promises)
      .then(res=>{
        console.log(res[0])
        const rejectedFilesHeader = res[0].headers.rejected_files;
        if (rejectedFilesHeader) {
          setUploadMessage(`Parsing successful!\nRejected Files: ${rejectedFilesHeader}`);
        }else{
          setUploadMessage('Parsing Successful with no Rejected files!');
        }
        
        setIsloading(false)
        // Handle rejected files, if any
        
        

        // Prepare download link for processed data
        const csvHeader = 'Ref,JobNo,Customer,LocationB,Qty,Width,Height,GlassType,LocationA,GlassRequired';
        const csvDataWithHeader = csvHeader + '\n' + res[0].data;
        const blob = new Blob([csvDataWithHeader], { type: 'text/csv' });
        const downloadUrl = URL.createObjectURL(blob);

        setDownloadLink({
          href: downloadUrl,
          text: 'Download Processed Data',
          download: 'processed_data.csv',
        });
      })
    } else {
      setUploadMessage('Please select a card and some files before uploading.');
    }
  };

  return (
    <div className="card-container-two" >
    <div className="card-container">
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
      <Card
        title="Choice"
        description="Choice"
        shortcode="choice"
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
      />
      <Card
        title="Alumate"
        description="Alumate"
        shortcode="alumate"
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
      />
      </div>
      
      
    <input type="file" multiple onChange={handleFileChange}  />
      <div >
        {loading ? (<h3 className='loading-text' style={{ marginTop: "22rem",marginLeft:'-35rem' }}>Loading..</h3>): ( 
          <button
          disabled={!selectedCard || selectedFiles.length === 0}
          onClick={handleUpload}
          className="button"
          style={{ marginTop: "22rem",marginLeft:'-35rem' }}
        >
          Upload Files
        </button>)}
      
      </div>
      <div>
        {uploadMessage && <pre style={{fontFamily:'sans-serif',marginLeft:'-12rem',marginTop:'20rem'}}>{uploadMessage}</pre>}
        {downloadLink && (
          <a
            href={downloadLink.href}
            download={downloadLink.download}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#2b6cb0')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'green')}
            
          style={{marginLeft:'-8rem' }}
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

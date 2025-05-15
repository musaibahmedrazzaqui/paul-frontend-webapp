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
    console.log(cardTitle)
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
        url = 'http://13.51.72.253:5000/process-pdf/'
        //url = 'http://0.0.0.0:5000/process-pdf/'
      }else if(selectedCard=='choice'){
        url ="http://13.51.72.253:5000/process-pdf/choice"
        //url ="http://localhost:5000/process-pdf/choice"
      }else if(selectedCard=="alumate"){
        url ="http://13.51.72.253:5000/process-pdf/alumate"
        //url ="http://localhost:5000/process-pdf/alumate"
      }else if(selectedCard =="thermaglaze"){
          url ="http://13.51.72.253:5000/process-pdf/thermaglaze"
          //url ="http://localhost:5000/process-pdf/thermaglaze"
      }
      else if(selectedCard =="central"){
        url ="http://13.51.72.253:5000/process-pdf/central"
        //url ="http://localhost:5000/process-pdf/central"
    }
    else if(selectedCard =="camden"){
      url ="http://13.51.72.253:5000/process-pdf/camden"
      //url ="http://localhost:5000/process-pdf/camden"
  }
  else if(selectedCard =="aph"){
    url ="http://13.51.72.253:5000/process-pdf/aph"
    //url ="http://localhost:5000/process-pdf/aph"
    } else if(selectedCard =="midwales"){
      url ="http://13.51.72.253:5000/process-pdf/midwales"
      //url ="http://localhost:5000/process-pdf/midwales"
    }
    else if(selectedCard =="centraframe"){
      //url ="http://13.51.72.253:5000/process-pdf/centraframe"
      url ="http://localhost:5000/process-pdf/centraframe"
    }
    else if(selectedCard =="vintage"){
      url ="http://13.51.72.253:5000/process-pdf/vintage"
      //url ="http://localhost:5000/process-pdf/vintage"
  }
  else if(selectedCard =="alanhill"){
    url ="http://13.51.72.253:5000/process-pdf/alanhill"
    //url ="http://localhost:5000/process-pdf/alanhill"
}
      else{
        url ="http://13.51.72.253:5000/process-pdf/trade-first"
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
        
        
        let csvHeader;
        // Prepare download link for processed data
        if(selectedCard == 'aph'){
          csvHeader = 'JobNo,reference,Customer,Item,Qty,Width,Height,Description,Location,Date'
      }else if(selectedCard =='midwales'){
        csvHeader='JobNo,Ref,Customer,Position,Qty,Width,Height,Description,Location,Date'
      }else if(selectedCard =='alanhill'){
        csvHeader='JobNo,Ref,Customer,Location,Qty,Width,Height,GlassType,Item,Date'
      }
      else{
        csvHeader = 'Ref,JobNo,Customer,LocationB,Qty,Width,Height,GlassType,LocationA,GlassRequired'
      }
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
    <div className="upload-page">
      <div className="card-container">
        {/* Render cards */}
        {[
          { title: 'Business Macro', shortcode: 'business-macro' },
          { title: 'Trade Direct First Degree', shortcode: 'trade-direct' },
          { title: 'Wiltshire', shortcode: 'wiltshire' },
          { title: 'WindoorMate', shortcode: 'windoormate' },
          { title: 'Choice', shortcode: 'choice' },
          { title: 'Alumate', shortcode: 'alumate' },
          { title: 'Thermaglaze', shortcode: 'thermaglaze' },
          { title: 'Central', shortcode: 'central' },
          { title: 'Camden', shortcode: 'camden' },
          { title:'APH', shortcode:'aph'},
          { title:'Midwales', shortcode:'midwales'},
          
          { title:'Vintage', shortcode:'vintage'},
          
          { title:'Centraframe', shortcode:'centraframe'},
          { title:'Alan Hill', shortcode:'alanhill'},
        ].map((card) => (
          <Card
            
            title={card.title}
            description={card.title}
            shortcode={card.shortcode}
            selectedCard={selectedCard}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>

      <div className="file-upload-container">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          disabled={!selectedCard || selectedFiles.length === 0}
          onClick={handleUpload}
          className={`upload-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Uploading...' : 'Upload Files'}
        </button>
      </div>

      <div className="message-container">
        {uploadMessage && <pre style={{fontFamily:'sans-serif'}}>{uploadMessage}</pre>}
        {downloadLink && (
          <a
            href={downloadLink.href}
            download={downloadLink.download}
            className="download-button"
          >
            {downloadLink.text}
          </a>
        )}
      </div>
    </div>
  );
};

export default UploadPage;

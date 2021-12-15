import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import  QRCode from 'qrcode.react'; 
var QRCode = require('qrcode.react');

const SettingsView = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    setInterval(() => {
      SpeechRecognition.stopListening();
    }, 10000);
  }, []);

  useEffect(() => {
    querySearch();
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const querySearch = () => {
    console.log("transcript ", transcript);
    SpeechRecognition.stopListening();
    if (transcript === "Buscar") {
      SpeechRecognition.startListening({ continuous: true });
      console.log("transcript dentro de if ", transcript);
    }
  };

  return (
    <div className="background">
      <div className="settings-container">
        <label>Uno</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>

        <label>Uno</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>

        <p style={{ color: "white" }}>Microphone: {listening ? "on" : "off"}</p>
        {/* <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button> */}
        <p style={{ color: "white" }}>{transcript}</p>
        {/* style={{border:"1px solid #fff"}} */}
        {
          transcript && <div style={{textAlign:'center', marginBottom:50}}>
          <QRCode value="https://github.com/cazabe" size={250} includeMargin={true} bgColor="#ea00d9" fgColor="#000" level="Q"/>
          </div>
        }
        

        <button>Guardar</button>
      </div>
    </div>
  );
};

export default SettingsView;

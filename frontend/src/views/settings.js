import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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

        <button>Guardar</button>
      </div>
    </div>
  );
};

export default SettingsView;

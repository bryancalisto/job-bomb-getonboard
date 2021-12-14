import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const SettingsView = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='background'>
      <div className='settings-container'>
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

        <p style={{ color: 'white' }}>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p style={{ color: 'white' }}>{transcript}</p>

        <button>Guardar</button>
      </div>

    </div>
  )
}

export default SettingsView;
import React, { useRef } from 'react';
import backgroundVideo from '../assets/cyberpunk_video.mp4';
import { GrSettingsOption } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const JobMonitorView = () => {
  const navigate = useNavigate();
  let keepAliveId = useRef(null);

  function connect(url, keepAlive, keepAlivePeriod) {
    try {
      const ws = new WebSocket(url);

      if (keepAlive) {
        clearInterval(keepAliveId.current);
        keepAliveId.current = setInterval(() => {
          ws.send('ping');
        }, keepAlivePeriod || 5000);
      }

      ws.onopen = () => {
        console.log('Websocket is open');
      }

      ws.onclose = () => {
        console.log('Websocket closed');
      }

      ws.onerror = (e) => {
        console.log('Websocket error', e);
      }

      ws.onmessage = (message) => {
        console.log('Websocket data', message.data);
      }

    } catch (e) {
      console.log('Error in websocket connection: ', e);
    }
  }

  const buildJobsRows = () => {
    const rows = [];

    for (let i = 0; i < 9; i++) {
      rows.push(
        (<div className='jobs-row' key={i}>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
        </div>)
      );
    }

    return rows;
  };

  return (
    <>
      {/* <button onClick={() => connect('ws://localhost:8000', true, 5000)}>CONNECT</button> */}
      <video autoPlay loop muted>
        <source src={backgroundVideo} type='video/mp4' />
      </video>

      <div className='jobs-container'>
        {buildJobsRows()}
      </div>

      <GrSettingsOption className='settings-btn' onClick={() => navigate('/settings')} />
    </>
  )
}

export default JobMonitorView;
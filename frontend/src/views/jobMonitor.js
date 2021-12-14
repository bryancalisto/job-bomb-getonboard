import React, { useEffect, useRef, useState } from 'react';
import backgroundVideo from '../assets/cyberpunk_video.mp4';
import { GrSettingsOption } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const JobMonitorView = () => {
  const navigate = useNavigate();
  let keepAliveId = useRef(null);
  let isMounted = useRef(false);
  const [displaySettingsBtn, setDisplaySettingsBtn] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);

  const buildJobsRows = () => {
    const rows = [];

    for (let i = 0; i < 9; i++) {
      rows.push(
        (<div className='jobs-row' key={i}>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdffasd</div>
          <div className='jobs-cell'>asdff</div>
          <div className='jobs-cell'>asdf</div>
          <div className='jobs-cell'>asdf</div>
        </div>)
      );
    }

    return rows;
  };

  const displayBtn = async () => {
    if (!displaySettingsBtn) {
      setDisplaySettingsBtn(true);

      setTimeout(() => {
        if (isMounted.current) {
          setDisplaySettingsBtn(false);
        }
      }, 5000);
    }
  }

  return (
    // <div onMouseMove={displayBtn}>
    <div>
      {/* <button onClick={() => connect('ws://localhost:8000', true, 5000)}>CONNECT</button> */}
      <video autoPlay loop muted>
        <source src={backgroundVideo} type='video/mp4' />
      </video>

      <div className='jobs-container'>
        <div className='jobs-row'>
          <div className='jobs-header'>Puesto</div>
          <div className='jobs-header'>Compañía</div>
          <div className='jobs-header'>Salario</div>
          <div className='jobs-header'>Tipo</div>
          <div className='jobs-header'>Beneficios</div>
          <div className='jobs-header'>Remoto</div>
          <div className='jobs-header'>Lugar</div>
        </div>
        {buildJobsRows()}
      </div>

      {displaySettingsBtn && <GrSettingsOption className='settings-btn' onClick={() => navigate('/settings')} />}
    </div >
  )
}

export default JobMonitorView;
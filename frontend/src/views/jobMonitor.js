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
        (<tr key={i}>
          <td>asdf</td>
          <td>asdf</td>
          <td>asdf</td>
          <td>asdf</td>
          <td>asdf</td>
          <td>asdffasd</td>
          <td>asdff</td>
        </tr>)
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

      <table>
        <thead>
          <th>Puesto</th>
          <th>Compañía</th>
          <th>Salario</th>
          <th>Tipo</th>
          <th>Beneficios</th>
          <th>Remoto</th>
          <th>Lugar</th>
        </thead>
        <tbody>
          {buildJobsRows()}
        </tbody>
      </table>

      {displaySettingsBtn && <GrSettingsOption className='settings-btn' onClick={() => navigate('/settings')} />}
    </div >
  )
}

export default JobMonitorView;
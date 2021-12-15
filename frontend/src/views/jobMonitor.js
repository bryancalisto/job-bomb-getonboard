import React, { useEffect, useRef, useState } from "react";
import backgroundVideo from "../assets/cyberpunk_video.mp4";
import { GrSettingsOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import getJobsOffers from "../controller/JobsOffers";

const JobMonitorView = () => {
  const navigate = useNavigate();
  let keepAliveId = useRef(null);
  let isMounted = useRef(false);
  let [toSearch, setToSearch] = useState('php');
  let [jobsList, setJobsList] = useState([]);
  const [displaySettingsBtn, setDisplaySettingsBtn] = useState(false);

  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    isMounted.current = true;
    SpeechRecognition.startListening({ continuous: true });

    keepAliveId.current = setInterval(async () => {
      console.log('data: ', toSearch);
      const result = await getJobsOffers(toSearch);
      const newJobsList = [...jobsList];

      result.forEach(res => {
        const job = {
          url: res.links.public_url,
          company: res.attributes.company.data.attributes.name,
          country: res.attributes.country,
          isRemote: res.attributes.remote ? 'Sí' : 'No',
          perks: res.attributes.perks.join(', '),
          minSalary: res.attributes.min_salary,
          maxSalary: res.attributes.max_salary,
          position: res.attributes.title,
          type: 'type'
        }

        if (newJobsList.length <= 8) {
          newJobsList.push(job);
        }

        console.log(res.links.public_url);
        console.log(res.attributes.company.data.attributes.name);
        console.log(res.attributes.remote);
        console.log(res.attributes.country);
        console.log(res.attributes.perks.join(', '));
        console.log(res.attributes.min_salary);
        console.log(res.attributes.max_salary);
      });

      console.log('jobs:', newJobsList);

      setJobsList(newJobsList);
    }, 5000);

    return () => {
      clearInterval(keepAliveId.current);
      isMounted.current = false;
    };
  }, []);

  const querySearch = () => {
    console.log("transcript ", transcript);
    if (/borrar/.test(transcript.toLowerCase())) {
      console.log("BORRANDO transcript dentro de if ");
      resetTranscript();
      setToSearch('');
    } else if (/buscar/.test(transcript.toLowerCase())) {
      console.log("BUSCAR transcript dentro de if ");
      const result = /[0-9]/.exec(transcript.toLowerCase());
      if (result) {
        alert(jobsList[Number(result[0])].url);
      }
    } else {
      setToSearch(transcript);
    }
  };

  useEffect(() => {
    querySearch();
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>POR FAVOR, USE GOOGLE CHROME</span>;
  }


  const buildJobsRows = () => {
    return jobsList.map((job, i) => (
      <tr key={i}>
        <td>{job.position}</td>
        <td>{job.company}</td>
        <td>{job.minSalary && job.maxSalary ? `${job.minSalary} - ${job.maxSalary}` : '???'}</td>
        <td>{job.perks}</td>
        <td>{job.isRemote}</td>
        <td>{job.country}</td>
      </tr>
    ));
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
  };

  return (
    // <div onMouseMove={displayBtn}>
    <div>
      {/* <button onClick={() => connect('ws://localhost:8000', true, 5000)}>CONNECT</button> */}
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <table>
        <thead>
          <tr>
            <th>Puesto</th>
            <th>Compañía</th>
            <th>Salario</th>
            <th>Beneficios</th>
            <th>Remoto</th>
            <th>Lugar</th>
          </tr>
        </thead>
        <tbody>{buildJobsRows()}</tbody>
      </table>

      {displaySettingsBtn && (
        <GrSettingsOption
          className="settings-btn"
          onClick={() => navigate("/settings")}
        />
      )}
    </div>
  );
};

export default JobMonitorView;

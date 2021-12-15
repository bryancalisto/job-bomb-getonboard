import React, { useEffect, useRef, useState } from "react";
import backgroundVideo from "../assets/cyberpunk_video.mp4";
import { GrSettingsOption } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import getJobsOffers from "../controller/JobsOffers";
var QRCode = require('qrcode.react');

const JobMonitorView = () => {
  let keepAliveId = useRef(null);
  let isMounted = useRef(false);
  let [toSearch, setToSearch] = useState('javascript');
  let [jobsList, setJobsList] = useState([]);
  let [qr, setQr] = useState('');

  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    isMounted.current = true;
    SpeechRecognition.startListening({ continuous: true, language:'es-EC'});

    keepAliveId.current = setInterval(async () => {
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
        }

        if (newJobsList.length <= 8) {
          newJobsList.push(job);
        }

        // DEBUG
        // console.log(res.links.public_url);
        // console.log(res.attributes.company.data.attributes.name);
        // console.log(res.attributes.remote);
        // console.log(res.attributes.country);
        // console.log(res.attributes.perks.join(', '));
        // console.log(res.attributes.min_salary);
        // console.log(res.attributes.max_salary);
      });

      setJobsList(newJobsList);
    }, 5000);

    return () => {
      clearInterval(keepAliveId.current);
      isMounted.current = false;
    };
  }, [toSearch]);

  useEffect(() => {
    const querySearch = () => {
      console.log("transcript ", transcript);
      if (/borrar/.test(transcript.toLowerCase())) {
        console.log("BORRANDO");
        resetTranscript();
        setToSearch('');
      } else if (/buscar/.test(transcript.toLowerCase())) {
        const result = /[0-9]/.exec(transcript.toLowerCase());
        if (result) {
          console.log("BUSCANDO " + result[0]);
          setQr(jobsList[Number(result[0])].url);
        }
      } else if (/cerrar/.test(transcript.toLowerCase())) {
        console.log("CERRANDO");
        setQr('');
      }
      else {
        setToSearch(transcript);
      }
    };
    querySearch();
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>POR FAVOR, USE GOOGLE CHROME</span>;
  }


  const buildJobsRows = () => {
    return jobsList.map((job, i) => (
      <tr key={i}>
        <td>{i}</td>
        <td>{job.position}</td>
        <td>{job.company}</td>
        <td>{job.minSalary && job.maxSalary ? `${job.minSalary} - ${job.maxSalary}` : '???'}</td>
        <td>{job.perks}</td>
        <td>{job.isRemote}</td>
        <td>{job.country}</td>
      </tr>
    ));
  };

  return (
    <div>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <table>
        <thead>
          <tr>
            <th>#</th>
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

      {
        qr.length > 0 &&
        <div className="qr-background">
          <div className="qr">
            <QRCode value={qr} size={250} includeMargin={true} bgColor="#ea00d9" fgColor="#000" level="Q" />
          </div>
        </div>
      }
    </div>
  );
};

export default JobMonitorView;

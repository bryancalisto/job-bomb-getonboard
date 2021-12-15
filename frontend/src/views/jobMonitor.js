import React, { useEffect, useRef, useState } from "react";
import backgroundVideo from "../assets/cyberpunk_video.mp4";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import getJobsOffers from "../controller/JobsOffers";
import { clearUnwantedWords, fromTextToNumber } from "../utils";
var QRCode = require('qrcode.react');

const JobMonitorView = () => {
  let keepAliveId = useRef(null);
  let isMounted = useRef(false);
  let [toSearch, setToSearch] = useState('javascript');
  let [jobsList, setJobsList] = useState([]);
  let [qr, setQr] = useState('');
  let [msg, setMsg] = useState('');
  const scrollBy = 0.1 * window.innerHeight; // step to scroll by
  let prevScrollY = useRef(0); // To detect bottom or top
  let goDown = useRef(true); // Scroll direction

  const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  useEffect(() => {
    isMounted.current = true;
    // SpeechRecognition.startListening({ continuous: true, language: 'es-EC' });
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });

    keepAliveId.current = setInterval(async () => {
      // const result = await getJobsOffers(toSearch);
      const wordsToSearch = clearUnwantedWords(transcript.toLowerCase()).split(' ');
      if (transcript.length > 0 && wordsToSearch.length > 0) {
        const result = await getJobsOffers(wordsToSearch[0]);
        if (result.length === 0) {
          setMsg('0 resultados para \'' + wordsToSearch[0] + '\'');
        }
        // const newJobsList = [...jobsList];
        const newJobsList = [];
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

          if (newJobsList.length <= 20) {
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
      }


      // Auto scroll
      if (qr.length === 0) { // If showing QR, don't scroll
        prevScrollY.current = window.scrollY;
        window.scrollBy(0, scrollBy * (goDown.current ? 1 : -1));

        if (prevScrollY.current === window.scrollY) { // arrived to page bottom or top. Toggle direction
          goDown.current = !goDown.current;
        }
      }

    }, 5000);

    return () => {
      clearInterval(keepAliveId.current);
      isMounted.current = false;
    };
  }, [toSearch]);

  useEffect(() => {
    const querySearch = () => {
      setToSearch(transcript.toLowerCase());
      let _toSearch = transcript.toLowerCase();
      console.log("transcript ", _toSearch);

      // if (/borrar/.test(_toSearch)) {
      if (/clear/.test(_toSearch)) {
        console.log("BORRANDO");
        resetTranscript();
        setToSearch('');
      }

      // if (/buscar/.test(_toSearch)) {
      if (/show/.test(_toSearch)) {
        const result = /[0-9]/.exec(fromTextToNumber(_toSearch));
        if (result) {
          console.log("BUSCANDO " + result[0]);
          if (jobsList.length >= Number(result[0])) {
            setQr(jobsList[Number(result[0])].url);
          }
        }
      }

      // if (/cerrar/.test(_toSearch)) {
      if (/close/.test(_toSearch)) {
        console.log("CERRANDO");
        resetTranscript();
        setQr('');
      }
      setMsg('');

      setToSearch(clearUnwantedWords(_toSearch));
      // console.log(toSearch);
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
            <QRCode value={qr} size={window.innerHeight * 0.5} includeMargin={true} bgColor="#ea00d9" fgColor="#000" level="Q" />
          </div>
        </div>
      }

      {
        msg.length > 0 &&
        <div className="qr-background">
          <div className="message">
            {msg}
          </div>
        </div>
      }
    </div>
  );
};

export default JobMonitorView;

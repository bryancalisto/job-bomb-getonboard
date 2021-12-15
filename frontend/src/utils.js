import axios from "axios";
// const BASE_URL = "https://sandbox.getonbrd.dev";
const BASE_URL = "https://www.getonbrd.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

const fromTextToNumber = (str) => {
  const nums = {
    cero: '0',
    uno: '1',
    dos: '2',
    tres: '3',
    cuatro: '4',
    cinco: '5',
    seis: '6',
    siete: '7',
    ocho: '8',
    nueve: '9',
    diez: '10',
    once: '11',
    doce: '12',
    trece: '13',
    catorce: '14',
    quince: '15',
    dieciseis: '16',
    diecesiete: '17',
    dieciocho: '18',
    diecinueve: '19',
    veinte: '20',
  }

  const tokens = str.split(' ');

  for (let i = 0; i < tokens.length; i++) {
    if (nums[tokens[i]]) {
      tokens[i] = nums[tokens[i]];
    }
  }

  return tokens.join(' ');
}

export {
  api,
  fromTextToNumber
};

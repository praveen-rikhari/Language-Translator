import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [to, setTo] = useState("en");
  const [from, setFrom] = useState("en");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios.get('https://libretranslate.com/languages',
      {
        headers: { 'accept': 'application/json' }
      }).then(res => {
        console.log(res)
        setOptions(res.data);
      });
  }, [])

  const translate = () => {

    const params = new URLSearchParams();
    params.append('q', input);
    params.append('source', from);
    params.append('target', to);
    params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    axios.post('https://libretranslate.de/translate', params, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(res => {
      console.log(res.data.translatedText)
      setOutput(res.data.translatedText)
    })
  };

  return (
    <>
      <div className="App">
        <h1>Language Translator</h1>
        <div>
          From <b>{from}</b> :
          <select onChange={(e) => setFrom(e.target.value)}>
            {options.map((opt) => (
              <option value={opt.code} key={opt.code} >{opt.name}</option>
            ))}
          </select>
          To <b>{to}</b> :
          <select onChange={(e) => setTo(e.target.value)}>
            {options.map((opt) => (
              <option value={opt.code} key={opt.code} >{opt.name}</option>
            ))}
          </select>
        </div>
        <div>
          <textarea cols="50" rows="8" onInput={(e) => setInput(e.target.value)} ></textarea>
        </div>
        <div>
          <textarea cols="50" rows="8" value={output} ></textarea>
        </div>
        <div>
          <button onClick={e => translate()} >Translate</button>
        </div>
      </div>
    </>
  )
}

export default App;
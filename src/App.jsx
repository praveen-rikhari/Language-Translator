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
        <div className="container">
          <div className="row">
            From <b>{from}</b> :
            <select className="from-dropdown" onChange={(e) => setFrom(e.target.value)}>
              {options.map((opt) => (
                <option value={opt.code} key={opt.code}>{opt.name}</option>
              ))}
            </select>
            To <b>{to}</b> :
            <select className="to-dropdown" onChange={(e) => setTo(e.target.value)}>
              {options.map((opt) => (
                <option value={opt.code} key={opt.code}>{opt.name}</option>
              ))}
            </select>
          </div>
          <div className="row">
            <textarea className="input-text" cols="50" rows="8" onInput={(e) => setInput(e.target.value)} ></textarea>
            <textarea className="output-text" cols="50" rows="8" value={output} ></textarea>
          </div>
          <div className="row">
            <button className="translate-btn" onClick={e => translate()}>Translate</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
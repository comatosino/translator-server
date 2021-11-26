import React, {useState, useEffect} from 'react';

export default function App() {
  // const [target, setTarget] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState();
  const [source, setSource] = useState('en-US');

  // use to set utterance properties
  const [target, setTarget] = useState({
    text: '',   // set by input
    voice: null,  // set by input
    lang: 'es-US',   // set by voice
    volume: 1,  // between 0 and 1, 1 is default
    pitch: 1,   // between 0 (lowest) and 2 (highest), with 1 being the default pitch
    rate: 1,    // between 0.1 (lowest) and 10 (highest), with 1 being the default pitch
  });

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () =>{
      if (!voices) {
        const voiceSet = [...window.speechSynthesis.getVoices()];
        setVoices(voiceSet);
      }
    }
  }, []);

  const handleInputChange = e => {
    const {name, value} = e.target;
    console.log(target)
    // setTarget({
    //   ...target,
    //   [name]: value,
    // });
  }

  return (
    <div>
      <textarea value={target.text}
             name='text'
             onChange={handleInputChange}
             placeholder='Enter a word or phrase'
             type='text'/>


    </div>
  )
}


const { useEffect, useRef, useState } = React;

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const synth = useRef();

  const updateVoices = () => {
    setVoices(synth.current.getVoices());
  };

  const speak = (text, voice, pitch = 1, rate = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    synth.current.speak(utterance);
  }

  useEffect(() => {
    if (typeof window === 'object' && window.speechSynthesis) {
        synth.current = window.speechSynthesis;
        synth.current.onvoiceschanged = updateVoices;
        updateVoices();
    };

    return () => {
      synth.current.onvoiceschanged = null;
    }
  }, []);

  return ([
    voices,
    speak,
  ]);
}

const useSpeechRecognition = () => {
    // const recognition = useRef(new SpeechRecognition());
    // console.log(recognition);

    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

}

export { useSpeechSynthesis, useSpeechRecognition }
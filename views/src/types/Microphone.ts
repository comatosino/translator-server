type Microphone = {
  listening: boolean;
  transcript: string;
  listen: () => void;
  stop: () => void;
  abort: () => void;
  clear: () => void;
};

export default Microphone;

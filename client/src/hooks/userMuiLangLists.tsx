import { useMemo } from "react";
import { Speaker } from "./useTextToSpeech/types";

export type MuiLists = {
  srcCodeList: string[];
  // trgCodeList: { type: string; content: string; lang: string }[];
};

const useMuiLangLists = (
  speaker: Speaker
): [MuiLists["srcCodeList"]] => {
  // source language select options
  // creates a list of BCP 47 language tags for display
  const srcCodeList = useMemo<MuiLists["srcCodeList"]>(() => {
    const voices = speaker.getVoiceArray();

    let result: string[] = [];
    if (voices.length) {
      const langCodes = voices.map((voice) => voice.lang);
      result = [...new Set(langCodes)];
    }
    return result;
  }, [speaker]);

  // target language & voice select options
  // creates list of objects with info for MUI MenuItem & Subheader components
  // const trgCodeList = useMemo<MuiLists["trgCodeList"]>(() => {
  //   const voiceArr = speaker.getVoiceArray();

  //   let result: MuiLists["trgCodeList"] = [];
  //   if (voiceArr.length) {
  //     const voiceMap = speaker.getVoiceMap();
  //     const langList = Object.keys(voiceMap!);

  //     for (let i = 0; i < langList.length; i++) {
  //       const langCode = langList[i];
  //       const langVoices = voiceMap![langCode];
  //       result.push({ type: "subheader", content: langCode, lang: langCode });

  //       for (let j = 0; j < langVoices.length; j++) {
  //         const voice = langVoices[j];
  //         result.push({ type: "item", content: voice.name, lang: voice.lang });
  //       }
  //     }
  //   }
  //   return result;
  // }, [speaker]);

  return [srcCodeList];
};

export default useMuiLangLists;

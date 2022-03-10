import React, { useEffect, useState } from "react";
import useSpeechToText from "./hooks/useSpeechToText";

import {
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
  Button,
} from "@mui/material";

import { useAppDispatch } from "./store/hooks";
import { getUser } from "./store/userSlice/thunks";

import { Auth, Loading } from "./pages";

const Translator: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) dispatch(getUser());
  }, [dispatch]);

  const { speechToTextAvailable, microphone, transcript, options } =
    useSpeechToText();

  // FOR REACT DEV TOOLS HOOK PARSING
  const useTranslation = (
    init = ""
  ): [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [t, sT] = useState(init);
    return [t, sT];
  };
  const [translation, setTranslation] = useTranslation("");

  // const srcLang = useSpeechToTextOptions[0].lang;
  // const trgLang = useTextToSpeechOptions[0].voice.substring(0, 5);

  // const startListening = (): void => {
  //   setTranslation("");
  //   // microphone.listen();
  // };

  // const translate = useCallback(
  //   async (text: string) => {
  //     try {
  //       console.log("TRANSLATE");
  //       console.log(text);
  //       // console.log(`FROM ${srcLang} TO ${trgLang}`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   []
  // );

  // useEffect(() => {
  //   if (microphone.transcript) {
  //     translate(microphone.transcript);
  //   }
  // }, [microphone.transcript, translate]);

  // useEffect(() => {
  //   if (translation) {
  //     const options = useTextToSpeechOptions[0];
  //     speaker.speak(translation, options);
  //     setTranslation("");
  //   }
  // }, [speaker, translation, useTextToSpeechOptions]);

  // if (!speechToTextAvailable) {
  //   return (
  //     <>
  //       {!speechToTextAvailable && (
  //         <Typography> Speech Recognition not available</Typography>
  //       )}
  //       {/* {!textToSpeechAvailable && (
  //         <Typography>Speech Synthesis not available</Typography>
  //       )} */}
  //     </>
  //   );
  // }

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  if (!speechToTextAvailable)
    return <Typography> Speech Recognition not available</Typography>;

  return (
    <Container fixed maxWidth="sm" sx={{ height: 1 }}>
      {page === 0 && <Loading />}
      {page === 1 && <Auth />}
      {/* {page === 2 && <Register />} */}
      {/* {page === 3 && <Main />} */}
      {/* {page === 4 && <Options />} */}

      {/* <Button onClick={handleLogout}>logout</Button> */}

      {/* <Paper sx={{ width: "auto" }} elevation={3}>
        <BottomNavigation
          showLabels
          value={page}
          onChange={(
            _e: React.SyntheticEvent<Element, Event>,
            value: number
          ) => {
            setPage(value);
          }}
        >
          <BottomNavigationAction label="Main" value={3} />
          <BottomNavigationAction label="Options" value={4} />
        </BottomNavigation>
      </Paper> */}
    </Container>
  );
};

export default Translator;

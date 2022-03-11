import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import useSpeechToText from "./hooks/useSpeechToText";

import { Loading, Auth } from "./pages";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUser } from "./store/userSlice/thunks";

const Translator: React.FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);

  // USER STATE/DISPATCH
  const userProfile = useAppSelector((state) => state.user.profile);
  const userDispatch = useAppDispatch();

  useSpeechToText();

  useEffect(() => {
    const token = localStorage.getItem("translator-token");
    if (token) userDispatch(getUser());
  }, [userDispatch]);

  console.log(userProfile);

  // FOR REACT DEV TOOLS HOOK PARSING
  // const useTranslation = (
  //   init = ""
  // ): [string, React.Dispatch<React.SetStateAction<string>>] => {
  //   const [t, sT] = useState(init);
  //   return [t, sT];
  // };
  // const [translation, setTranslation] = useTranslation("");

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

  return (
    <Container fixed maxWidth="sm" sx={{ height: 1 }}>
      {page === 0 && <Loading />}
      {page === 1 && <Auth />}
      {/* {page === 2 && <Main />} */}
      {/* {page === 3 && <Options />} */}

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

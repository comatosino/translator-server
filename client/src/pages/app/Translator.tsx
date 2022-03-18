import { useState } from "react";
import { UserProfile } from "../../store/userSlice";
import useSpeechToText from "../../hooks/useSpeechToText";
import useTextToSpeech from "../../hooks/useTextToSpeech";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/userSlice/thunks";
import useMuiLangLists from "../../hooks/userMuiLangLists";
import { Main, Options, Record } from ".";
import { Typography, SpeedDial, SpeedDialAction, Fab } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import MicNoneIcon from "@mui/icons-material/MicNone";

export enum Page {
  HISTORY,
  MAIN,
  OPTIONS,
}

const Translator: React.FC<{ user: UserProfile }> = (): JSX.Element => {
  const userDispatch = useAppDispatch();
  const [page, setPage] = useState(Page.MAIN);

  const {
    speechToTextAvailable,
    microphone,
    options: micOptions,
  } = useSpeechToText();

  const {
    textToSpeechAvailable,
    speaker,
    options: speakOptions,
  } = useTextToSpeech();

  const [langCodes] = useMuiLangLists(speaker);

  const handleLogout = () => {
    userDispatch(logout());
  };

  if (!speechToTextAvailable || !textToSpeechAvailable) {
    return (
      <>
        {!speechToTextAvailable && (
          <Typography>Speech to Text not supported on this browser</Typography>
        )}
        {!textToSpeechAvailable && (
          <Typography>Text to Speech not supported on this browser</Typography>
        )}
      </>
    );
  }

  return (
    <>
      <SpeedDial
        ariaLabel="speed dial menu"
        direction="down"
        sx={{ position: "absolute", top: 20, right: 20 }}
        icon={<MenuIcon />}
      >
        <SpeedDialAction
          onClick={() => setPage(Page.OPTIONS)}
          icon={<TuneIcon />}
          tooltipTitle={"Options"}
        />

        <SpeedDialAction
          onClick={handleLogout}
          icon={<LogoutIcon />}
          tooltipTitle={"Logout"}
        />
      </SpeedDial>

      {/* GOTO HISTORY */}
      {page === Page.MAIN && (
        <Fab
          onClick={() => setPage(Page.HISTORY)}
          sx={{ position: "absolute", bottom: 20 }}
          color="primary"
          aria-label="add"
        >
          <HistoryIcon />
        </Fab>
      )}

      {/* GOTO MAIN */}
      {(page === Page.HISTORY || page === Page.OPTIONS) && (
        <Fab
          onClick={() => setPage(Page.MAIN)}
          sx={{ position: "absolute", bottom: 20, right: 20 }}
          color="primary"
          aria-label="add"
        >
          <MicNoneIcon />
        </Fab>
      )}

      {page === Page.MAIN && (
        <Main speaker={speaker} microphone={microphone} langCodes={langCodes} />
      )}
      {page === Page.OPTIONS && (
        <Options
          micOptions={micOptions}
          speakOptions={speakOptions}
          getVoices={speaker.getVoiceMap}
        />
      )}
      {page === Page.HISTORY && <Record />}
    </>
  );
};

export default Translator;

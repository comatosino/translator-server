import { Page } from "../pages/app/Translator";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import MicNoneIcon from "@mui/icons-material/MicNone";
import HistoryIcon from "@mui/icons-material/History";
import TuneIcon from "@mui/icons-material/Tune";

const Nav: React.FC<{
  page: number;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}> = ({ page, setPage }) => {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        value={page}
        onChange={(e, newValue: number) => {
          setPage(newValue);
        }}
      >
        <BottomNavigationAction
          value={Page.HISTORY}
          label="History"
          icon={<HistoryIcon />}
        />
        <BottomNavigationAction
          value={Page.MAIN}
          label="Microphone"
          icon={<MicNoneIcon />}
        />
        <BottomNavigationAction
          value={Page.OPTIONS}
          label="Options"
          icon={<TuneIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Nav;

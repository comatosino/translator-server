import { useAppSelector } from "../../store/hooks";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Record: React.FC = (): JSX.Element => {
  const translations = useAppSelector(
    (state) => state.user.profile?.translations
  );

  if (!translations || !translations.length) {
    return <Typography>No history to display!</Typography>;
  }

  return (
    <Stack
      overflow={"auto"}
      maxHeight={0.8}
      minHeight={0.8}
      padding={1}
      boxSizing={"border-box"}
    >
      {translations.map((translation) => {
        const [srcLangCode, srcCountryCode] = translation.source.split("-");
        const [trgLangCode, trgCountryCode] = translation.target.split("-");

        return (
          <Box
            key={translation._id}
            height={1}
            margin={1}
            position={"relative"}
          >
            <Card elevation={10}>
              <Box position={"absolute"} top={10} right={0}>
                <IconButton aria-label="delete">
                  <DeleteForeverIcon />
                </IconButton>
              </Box>

              <CardContent>
                <Stack paddingBottom={1}>
                  <Typography>{srcLangCode}</Typography>
                  <img
                    loading="lazy"
                    width="50"
                    src={`https://flagcdn.com/${srcCountryCode.toLowerCase()}.svg`}
                    alt={""}
                  />
                  <Typography>{translation.sourceText}</Typography>
                </Stack>
                <Divider variant="middle" />
                <Stack alignItems={"flex-end"} paddingTop={1}>
                  <Typography>{trgLangCode}</Typography>
                  <img
                    loading="lazy"
                    width="50"
                    src={`https://flagcdn.com/${trgCountryCode.toLowerCase()}.svg`}
                    alt={""}
                  />
                  <Typography>{translation.targetText}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};
export default Record;

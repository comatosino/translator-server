import { useAppSelector } from "../../store/hooks";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

const Record: React.FC = (): JSX.Element => {
  const translations = useAppSelector(
    (state) => state.user.profile?.translations
  );

  if (!translations || !translations.length) {
    return <Typography>No history to display!</Typography>;
  }
  return (
    <Stack
      spacing={1}
      overflow={"auto"}
      maxHeight={0.8}
      padding={1}
      boxSizing={"border-box"}
    >
      {translations.map((translation) => {
        const [srcLangCode, srcCountryCode] = translation.source.split("-");
        const [trgLangCode, trgCountryCode] = translation.target.split("-");

        return (
          <Box key={translation._id} height={1} padding={1}>
            <Card elevation={2}>
              <CardContent>
                <Box>
                  <Typography>{srcLangCode}</Typography>
                  <img
                    loading="lazy"
                    width="50"
                    src={`https://flagcdn.com/${srcCountryCode.toLowerCase()}.svg`}
                    alt={""}
                  />
                  <Typography>{translation.sourceText}</Typography>
                </Box>

                <Box>
                  <Typography>{trgLangCode}</Typography>
                  <img
                    loading="lazy"
                    width="50"
                    src={`https://flagcdn.com/${trgCountryCode.toLowerCase()}.svg`}
                    alt={""}
                  />
                  <Typography>{translation.targetText}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};
export default Record;

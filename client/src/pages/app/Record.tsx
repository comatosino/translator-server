import { useAppSelector } from "../../store/hooks";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";

const Record: React.FC = (): JSX.Element => {
  const translations = useAppSelector(
    (state) => state.user.profile?.translations
  );

  if (!translations || !translations.length) {
    return <Typography>No history to display!</Typography>;
  }
  return (
    <Container>
      <Stack>
        <Typography align="center">HISTORY</Typography>

        {translations.map((translation) => {
          return (
            <Card key={translation._id}>
              <CardContent>
                <Typography>{`source lang: ${translation.source}`}</Typography>

                <Typography>
                  {`source text: ${translation.sourceText}`}
                </Typography>

                <Typography>{`target lang: ${translation.target}`}</Typography>

                <Typography>
                  {`target lang: ${translation.targetText}`}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
};
export default Record;

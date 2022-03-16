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
                <Typography>{translation.source}</Typography>
                <Typography>{translation.sourceText}</Typography>
                <Typography>{translation.target}</Typography>
                <Typography>{translation.targetText}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Container>
  );
};
export default Record;

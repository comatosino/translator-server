import express from 'express';
import path from 'path';

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
}

// TESTING
app.get('/', (req, res) => {
    res.json('ding ding ding');
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.listen(PORT, function() {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
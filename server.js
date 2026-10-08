import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

const ERROR_MESSAGE = "Invalid Date";

app.get("/api", (req, res) => {
  const date = new Date();

  res.json({
    unix: date.valueOf(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:date", (req, res) => {
  const rawDate = req.params.date;
  const rawDateToNumber = Number(rawDate);

  try {
    const date = isNaN(rawDateToNumber) ? rawDate : rawDateToNumber;

    const parsedDate = new Date(date);
    const stringDate = parsedDate.toString();

    const isValidDate = stringDate !== ERROR_MESSAGE;

    if (!isValidDate) {
      throw new Error(ERROR_MESSAGE);
    }

    res.json({
      unix: parsedDate.valueOf(),
      utc: parsedDate.toUTCString(),
    });
  } catch (err) {
    console.error(err);

    res.json({
      error: err.message,
    });
  }
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

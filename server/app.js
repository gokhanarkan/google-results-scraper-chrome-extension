import express from "express";
import cors from "cors";
import * as cheerio from "cheerio";
import axios from "axios";

// Instantiate express
const app = express();

const HEADERS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
  },
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/", async (req, res) => {
  try {
    const request = req.body;
    console.log(req.body);
    const url = request.location.href;
    console.log(url);

    if (!url.startsWith("https://www.google.com/search?q="))
      return res
        .status(422)
        .send("The endpoint can only receive the Google Search results");

    const response = await axios.get(url, HEADERS);
    let $ = cheerio.load(response.data);

    const results = [];

    // Get the title and link values
    $(".DKV0Md").each((index, element) => {
      results.push({
        title: $(element).text(),
        link: element.parent.attribs.href,
      });
    });

    // Match the description values with current array of objects
    $(".lEBKkf").each((index, element) => {
      const description = $(element).text().trim();
      if (description) {
        results[index] = { ...results[index], description };
      }
    });

    console.log(results);

    res.status = 200;
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export const server = app.listen(3000, () => console.log("server started"));

export const stop = () => {
  server.close();
};

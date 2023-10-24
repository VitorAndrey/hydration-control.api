import { prisma } from "./lib/prisma";

const express = require("express");
const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tests", async (req, res) => {
  const tests = await prisma.test.findMany();

  res.send(JSON.stringify(tests)).status(200);
});

app.post("/tests", async (req, res) => {
  const { name } = req.body;

  try {
    const test = await prisma.test.create({
      data: {
        name,
      },
    });
    res.send(JSON.stringify(test)).status(201);
  } catch (error) {
    res.send(error).status(500);
  }
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

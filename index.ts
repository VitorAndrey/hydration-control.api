import { prisma } from "./src/lib/prisma";
import { Request, Response } from "express";

const express = require("express");
const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/tests", async (req: Request, res: Response) => {
  const tests = await prisma.test.findMany();

  res.send(JSON.stringify(tests)).status(200);
});

app.post("/tests", async (req: Request, res: Response) => {
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

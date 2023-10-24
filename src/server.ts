import { prisma } from "./lib/prisma";
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

app.post("/hydration", async (req: Request, res: Response) => {
  const { mls } = req.body;

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const date = `${year}-${month}-${day}`;

  const register = await prisma.hydration.findMany({
    where: {
      date: {
        equals: date,
      },
    },
  });

  if (register.length < 1) {
    const newData = await prisma.hydration.create({
      data: {
        date,
        mls,
      },
    });
    return res.end(JSON.stringify(newData));
  }

  const newData = await prisma.hydration.update({
    where: {
      date,
    },
    data: {
      date,
      mls: register[0].mls + mls,
    },
  });
  return res.end(JSON.stringify(newData));
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

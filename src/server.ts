const express = require("express");
const cors = require("cors");

import { prisma } from "./lib/prisma";
import { Request, Response } from "express";

const app = express();
app.use(cors());

const port = 3333;

app.use(express.json());

app.get("/hydration", async (req: Request, res: Response) => {
  const hydration = await prisma.hydration.findMany();

  res.json(hydration);
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
    return res.json(newData);
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
  return res.json(newData);
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});

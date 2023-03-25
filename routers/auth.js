const express = require("express");
const { isUser } = require("../middlewares");
const router = express.Router();
const prisma = require("../prisma");
const login = require("./auth/login");



router.post("/", async (req, res, next) => {
  try {
    res.send(await login(req.body));
  } catch (error) {
    if (error.code) next(error);
    else
      res.status(401).send({
        error: true,
        message: "Invalid credentials",
      });
  }
});

router.delete("/", isUser, async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = await prisma.token.findFirst({
      where: {
        value: authorization,
      },
    });
    await prisma.token.update({
      where: {
        id: token.id,
      },
      data: {
        isBlacklisted: true,
      },
    });
    res.send({});
  } catch (error) {
    if (error.code) next(error);
    res.status(500).send({
      error: true,
      message: process.env.NODE_ENV === "DEV" ? error.message : undefined,
    });
  }
});

router.get("/", isUser, (req, res) => {
  res.status(200).send({
    success: true,
  });
});

module.exports = router;
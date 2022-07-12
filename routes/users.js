const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  await User.sync();
  const userList = await User.findAll();
  if (!userList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).send(userList);
});

router.post("/", async (req, res) => {
  await User.sync();
  const { name, country } = req.body;
  const user = await User.create({ name, country });
  if (!user) {
    return res.status(500).json({ success: false });
  }
  return res.status(201).send(user);
});

router.delete("/:id", async (req, res) => {
  await User.sync();
  const id = req.params.id;
  const user = await User.destroy({ where: { id } });
  if (!user) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json({ success: true });
});
module.exports = router;

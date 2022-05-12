const config = require("config");
const fs = require("fs");
const User = require("../models/User");
const Uuid = require("uuid");

class FileController {
  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const avatarName = Uuid.v4() + ".jpg";
      file.mv(config.get("staticPath") + "\\avatars\\" + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки аватара." });
    }
  }

  async uploadNews(req, res) {
    try {
      const file = req.files.file;
      const attachmentName = req.files.file.name;
      file.mv(config.get("staticPath") + "\\news\\" + attachmentName);
      return res.json({ attachmentName: attachmentName });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки обложки новости." });
    }
  }

  async uploadEvents(req, res) {
    try {
      const file = req.files.file;
      const attachmentName = req.files.file.name;
      file.mv(config.get("staticPath") + "\\events\\" + attachmentName);
      return res.json({ attachmentName: attachmentName });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки обложки события." });
    }
  }
}

module.exports = new FileController();

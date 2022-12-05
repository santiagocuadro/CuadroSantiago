import express from "express";
import { MessagesDao } from "../../Dao/index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { newMessage } = req.body;
    const message = await MessagesDao.save(newMessage);
    res.send({ success: true, messageId: message.author.id });
  } catch (error) {
    res.send({ success: false});
  }
  
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await MessagesDao.deleteById(Number(id));

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await MessagesDao.getAll();
    res.send({success: true, Message: messages})
  } catch (error) {
    
  }
});


export { router as routerMessages };

const Messages = require("../model/messages");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const cloudinary = require("cloudinary");
const router = express.Router();
const { isSeller } = require('../middleware/auth');

// create new message
router.post(
  "/create-new-message",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messageData = req.body;

      if (req.body.images) {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.images, {
          folder: "messages",
        });
        messageData.images = {
          public_id: myCloud.public_id,
          url: myCloud.url,
        };
      }

      messageData.conversationId = req.body.conversationId;
      messageData.sender = req.body.sender;
      messageData.text = req.body.text;

      const message = new Messages({
        conversationId: messageData.conversationId,
        text: messageData.text,
        sender: messageData.sender,
        images: messageData.images ? messageData.images : undefined,
      });

      await message.save();

      res.status(201).json({
        success: true,
        message,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// get all messages with conversation id
router.get(
  "/get-all-messages/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const messages = await Messages.find({
        conversationId: req.params.id,
      });

      res.status(201).json({
        success: true,
        messages,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message), 500);
    }
  })
);

// Get unread messages for a shop
router.get(
  "/unread-messages/:shopId",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const unreadMessages = await Messages.find({
        shopId: req.params.shopId,
        isRead: false,
      });

      res.status(200).json({
        success: true,
        unreadMessagesCount: unreadMessages.length,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Mark messages as read
router.put(
  "/mark-as-read/:shopId",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      await Messages.updateMany(
        { shopId: req.params.shopId, isRead: false },
        { isRead: true }
      );

      res.status(200).json({
        success: true,
        message: "Messages marked as read.",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

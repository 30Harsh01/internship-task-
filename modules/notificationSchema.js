const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who received the notification
    message: { type: String, required: true },
    type: { type: String, required: true }, // Type of notification (e.g., 'info', 'warning', 'alert')
    createdAt: { type: Date, default: Date.now }, 
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

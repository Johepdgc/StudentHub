const moongose = require('mongoose');

const messageSchema = new moongose.Schema({
    sender: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
    },
    messageType: {
        type: String,
        enum: ['text', 'image'],
    },
    message: String,
    imageURL: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

const Message = moongose.model('Message', messageSchema);

module.exports = Message;
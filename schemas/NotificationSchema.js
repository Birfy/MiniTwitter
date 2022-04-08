const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    replyFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    notificationType: {
        type: String
    },


    opened: {
        type: Boolean,
        default: false
    },

    entityId: {
        type: Schema.Types.ObjectId
    }
}, {timestamps: true});

NotificationSchema.statics.insertNotification = async (userTo, userFrom, notificationType, entityId) => {
    var data = {
        replyTo: userTo,
        replyFrom: userFrom,
        notificationType: notificationType,
        entityId: entityId
    };

    await Notification.deleteOne(data)
    .catch(error => {
        console.log(error);
    });

    return Notification.create(data)
    .catch(error => {
        console.log(error);
    });
}

var Notification = mongoose.model('Notification', NotificationSchema);
module.exports = Notification;
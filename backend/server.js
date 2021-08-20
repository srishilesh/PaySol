const express = require('express');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const cors = require('cors');
require('dotenv').config()

const Messages = require('./schema/messageDb');
const Conversation = require('./schema/converstationDb');
const User = require('./schema/userDb');
const converstationDb = require('./schema/converstationDb');

const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER
  });

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// });

const connection_url = process.env.MONGO_CONNECTION_URL;

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("DB connected");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("change occured", change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                sender: messageDetails.sender,
                content: messageDetails.content,
                conversationId: messageDetails.conversationId,
                timestamp: messageDetails.timestamp
            });
        } else {
            console.log("Error triggering Pusher");
        }
    });
});

app.get('/',(req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Post New Message
app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    // sender_id: sender public key
    // sender: sender name
    // content: message
    // conversation_id: conversation id
    // timestamp: timestamp

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

//Post New User
app.post('/user/new', (req, res) => {
    const newUser = req.body
    // sender_id: publickey
    // username: username
    // password: password
    // received_id: receiver public key

    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(`new user created: \n ${data}`)
        }
    })
})

//Get all users
app.get('/users', (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Post New Conversation and update corresponding Users
app.post('/conversation/new', (req, res) => {
    const senderId = req.body.senderId;

    const receiverId = req.body.receiverId;

    // conversation_id: increment count by one
    // sender_id: sender public key
    // receiver_id: receiver public key

    let conversationId;

    conversationData = {
        participants: [
            senderId,
            receiverId
        ]
    }

    Conversation.create(conversationData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            conversationId = data;
            console.log(conversationId);
            setConversationId(conversationId._id, senderId);
            setConversationId(conversationId._id, receiverId);
            res.status(200).send(`new conversation created: \n ${data}`)
        }
    })
})

function setConversationId(conversationId, userId) {
    var query = {_id: userId};
    newData = {
        "conversations": conversationId
    };

    User.findOneAndUpdate(query, {$push: newData}, {upsert: true}, function(err, data) {
        // if (err) return res.send(500, {error: err});
        // return res.status(200).send(`conversation updated: \n ${data}`);
        console.log(data);
        console.log(err);
    });
}

//Get conversation List for an user
app.get('/user/conversations/', (req, res) => {
    User.find(req.body ,(err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data[0].conversations)
        }
    })
})

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
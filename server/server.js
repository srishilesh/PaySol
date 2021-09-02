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
    //("DB connected");

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        //("change occured", change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                sender_id: messageDetails.sender_id,
                message: messageDetails.message,
                conversationId: messageDetails.conversationId,
                timestamp: messageDetails.timestamp,
                amount: messageDetails.amount
            });
        } else {
            //("Error triggering Pusher");
        }
    });

    const conCollection = db.collection('conversationcontents');
    const changeStreamConversation = conCollection.watch(); 

    changeStreamConversation.on('change', (change) => {
        //("change occured", change);

        if (change.operationType === 'insert') {
            const conversationDetails = change.fullDocument;
            pusher.trigger('conversations', 'inserted',
            {
                conversationId: conversationDetails._id,
                participants: conversationDetails.participants
            });
        } else {
            //("Error triggering Pusher");
        }
    });

});

app.get('/',(req, res) => res.status(200).send('Server is live'));

app.post('/messages/sync', (req, res) => {

    Messages.find(req.body, (err, data) => {
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


app.post('/finduser', (req, res) => {
    User.findOne(req.body,(err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


//Post New Conversation and update corresponding Users
app.post('/conversation/new', (req, res) => {
    const sender = req.body.sender;

    const receiver = req.body.receiver;

    // conversation_id: increment count by one
    // sender_id: sender public key
    // receiver_id: receiver public key

    let conversationId;

    conversationData = {
        participants: [
            sender,
            receiver
        ]
    }

    Conversation.create(conversationData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            conversationId = data;
            //(conversationId);
            setConversationId(conversationId._id, sender);
            setConversationId(conversationId._id, receiver);
            res.status(200).send(`new conversation created: \n ${data}`)
        }
    })
})

function setConversationId(conversationId, user) {
    var query = {_id: user.id};
    newData = {
        "conversations": conversationId
    };

    User.findOneAndUpdate(query, {$push: newData}, {upsert: true}, function(err, data) {
        // if (err) return res.send(500, {error: err});
        // return res.status(200).send(`conversation updated: \n ${data}`);
        //(data);
        //(err);
    });
}

//Get conversation List for an user
app.post('/user/conversations/', (req, res) => {
    User.find(req.body ,(err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            //res.status(200).send(data[0].conversations)
            getParticipants(data[0].conversations, res)
        }
    })
})

async function getParticipants(conversationId, res) {

    let participants = [];

    for(const i of conversationId) {

        await Conversation.find({_id: i}, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                if(data[0]!=null)
                participants.push({participants:data[0].participants, conversationId: i})
            }
        })
        
    }

    setTimeout(function(){ res.status(200).send(participants); }, 1000);
    

    
}

app.listen(port, () => console.log(`Listening on localhost: ${port}`));
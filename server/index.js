require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@webservertest.zazg3ou.mongodb.net/?retryWrites=true&w=majority&appName=webServerTest`;
const client = new MongoClient(uri);
const db = client.db("userDB");
const usersCollection = db.collection("users");

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.error("Connection error:", err);
    }
}
run();

// Routes
app.get('/', (req, res) => {
    res.send('User Management Server');
});

app.get('/users', async (req, res) => {
    try {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const user = await usersCollection.findOne({
            _id: new ObjectId(req.params.id)
        });
        user ? res.send(user) : res.status(404).send('User not found');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                name: updatedUser.name,
                email: updatedUser.email
            }
        };

        const result = await usersCollection.updateOne(filter, updateDoc);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = req.params.id;
        const query = { _id: new ObjectId(deletedUser) };
        const result = await usersCollection.deleteOne(query);
        res.send(result)
    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
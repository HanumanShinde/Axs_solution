const express = require('express');
const app = express();

const { check, validationResult } = require('express-validator')



const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

let list = undefined;

async function connect() {
    await client.connect();
    console.log('connected successfully');
    const db = client.db('axssolution');
    list = db.collection('customer')
}
connect();


app.post('/add_customer', [check('name').isLength({ min: 3, max: 30 }),
check('address').isLength({ min: 0, max: 50 }),
check('mobile_number').isLength({ max: 10 }),
check('email_id').isEmail()
], async (req, res) => {
    const customer_id = req.body;
    const name = req.body;
    const address = req.body;
    const customer_photo = req.body;
    const mobile_number = req.body;
    const email_id = req.body;
    await list.insertOne({ customer_id }, { name }, { address }, { customer_photo }, { mobile_number }, { email_id });
    console.log(list);
    res.send('customer added')
});

app.get('/get_All_customer', (async (req, res) => {
    const result = await list.find({}).toArray();
    console.log(result);
    res.send(result);
}));

app.get('/customer_details/:customer_id', (async (req, res) => {
    const customer_id = req.params.customer_id;
    const result = await list.find({ "customer_id.customer_id": customer_id }).toArray();
    console.log(result);
    res.send(result);
}));




app.listen(8888);
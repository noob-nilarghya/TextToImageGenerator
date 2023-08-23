
const express= require('express');
const dotenv= require('dotenv');
dotenv.config();


const app = express();
app.use(express.json());
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public'))); 

app.use(express.json( { limit: '10kb' } )); // required (called middleware). // response data more than 10kb is not allowed
app.use(express.urlencoded( { extended: true, limit: '10kb'} ));


// ROUTES HANDLING
const webRouter= require('./routes/webRouter');

app.use('/', webRouter); // route mounting


const server = app.listen(PORT,() => {
    console.log(`[status] Listening on port ${PORT}`);
});
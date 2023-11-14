const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/routes');
const Blog = require('./models/users');
// require('dotenv').config();
const session = require('express-session');
const path = require('path');





// express app
const app = express();
// const PORT = process.env.PORT|| 4000;

const dbURI = 'mongodb+srv://johnkennedynnawuihe:johnkennedy12@cluster0.lqqebzy.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(4000))
.catch((err) => console.log(err));





//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
  secret: 'my secret key',
  saveUninitialized:true,
  resave: false,
}));


app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// set template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));


// route prefix 
app.use("", require('./routes/routes'))

// app.listen(PORT, () =>{
//   console.log(`server started at http://localhost:${PORT}`);
// });



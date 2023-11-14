// Create schemas

const mongoose = require('mongoose');
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.setMaxListeners(20); // Set the maximum number of listeners to 20 (or any other suitable number)

const userSchema = new mongoose.Schema({
  id: { 
    type: String,
     required: true },
     
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  monthlyIncome: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: false, // Assuming 'created' is optional
    default: Date.now,
  },
});


module.exports = mongoose.model('User', userSchema);



// const blogSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     snippet: {
//         type: String,
//         required: true,
//     },
//     body: {
//      type : String,
//      required: true,
//     }
// }, {timestamps: true});

// const Blog = mongoose.model('Blog',blogSchema);

// module.exports =Blog;
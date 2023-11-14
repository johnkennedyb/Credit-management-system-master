const express = require('express');
const User = require('../models/users');
const users = require('../models/users');

const router = express.Router();

// Input a user into the database route
router.post("/add", (req, res) => {
  console.log('Form Data:', req.body);

  const user = new User({
    id: req.body.firstname,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    monthlyIncome: req.body.monthlyIncome,
    phonenumber: req.body.phonenumber
  });

  user.save()
    .then(() => {
      res.redirect('/');

      // res.status(200).json({ message: "User added successfully", type: "success" });
      // Move the redirect inside the 'then' block
     
    })
    .catch(err => {
      console.error('Error adding user:', err);
      res.status(500).json({ message: "Failed to add user. Please try again later.", type: 'danger' });
    });
});


// get all users route
router.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.render('index', {
      title: "Home Page",
      users: users
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

// routes.js

// Assuming you have a route like this for rendering the edit page
// routes.js

router.get('/edit/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.render('edit', { title: 'Edit User', user: user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user for edit:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      monthlyIncome: req.body.monthlyIncome,
      phonenumber: req.body.phonenumber
    }, { new: true });

    if (updatedUser) {
      res.redirect('/');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// router.get('/', (req, res) => {
//   res.render('index', { title: 'Home Page' });
// });

router.get('/add', (req, res) => {
  res.render('add', { title: 'Add User' });
});




// Assuming you have a route like this for deleting users
router.get('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      res.redirect('/');
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;

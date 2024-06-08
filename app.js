const express = require('express');
const db = require('./config/database');
const app = express();
// const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
// bringin user scheama 
const User = require("./models/user");
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
// const { check, validationResult } = require('express-validator/check')
const Order = require("./models/order")
const Product = require("./models/product")
const Cart = require("./models/cart")

var orderN = 1;



//set view
app.set('view engine','ejs');
// bring body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session and flash config .
app.use(session({
  secret: 'lorem ipsum',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60000 * 15}
}))
app.use(flash())    

// bring passport 
// bring passport a
app.use(passport.initialize())
app.use(passport.session())



//public
app.use(express.static('public'));




isAuthenticated = (req,res,next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/signin')
}


app.get('*', (req,res,next)=> {
  res.locals.user = req.user || null
  next()
})

// get all users

app.get('/getallusers', async (req, res, next) => {
  try {
    const results = await User.find({ /*display all */ }).exec();
    console.log(results);
    // res.json(results); // Send the results as JSON response
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' }); // Send an error response
    res.redirect("/");
  }
});
app.get('/clothing',(req,res)=>{
  res.render('events/clothing')
});
// route for sign up
app.get('/signup', (req, res) => {
    
  res.render('user/signup' , {error: req.flash('error')});
});
app.get('/signin', (req, res) => {
    
  res.render('user/signin' , {error: req.flash('error')});
});

app.get('/logout', (req,res)=> {
  // req.logout();
  // // res.redirect('/users/login');
  // res.redirect('/users/profile')
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  })
})
// Sign_up a user in db
// Sign_up a user in db

// app.post("/insert", async (req, res, next) => {
//   try {
//     const user = new User({
//       email: req.body.email,
//       name: req.body.name,
//       password: req.body.password,
//       phone: req.body.phone,
//       address: req.body.address  
//     });

//     const result = await user.save();
//     console.log(result);
//     // res.status(201).json(result); // Send a success response
//     res.redirect("/")
//   } catch (err) {
//     console.error(err);
//     // res.status(500).json({ error: 'An error occurred' }); // Send an error response
//     res.redirect("/")
//   }
// });
app.post('/insert',
  passport.authenticate('local.signup', {
    successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true })
      );

// login post request 
app.post('/login',
  passport.authenticate('local.login', {
    successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true })
      );

// creat an order
    app.post("/order", isAuthenticated, async (req, res, next) => {
     
    try {
    
    const order = new Order({
       number : orderN
    });
    orderN+=1;
    const result = await order.save();
    Cart.deleteMany({})
    console.log(result);
    // res.status(201).json(result); // Send a success response
    res.redirect('/')

  } catch (err) {
    console.error(err);
    // res.status(500).json({ error: 'An error occurred' }); // Send an error response
    res.redirect("/")
  }
});
// app.get("/profile",(req,res)=>{
//   res.render('user/profile')
// });

/* routes */


//route for/about
app.get('/about',(req,res)=>{
    res.render('events/about')
});






app.get('/home', (req, res) => {
    
  res.render('events/cart');
});
app.get('/', (req, res) => {
    res.render('events/home');
    
  });
// Route for viewing the cart
app.get('/cart', (req, res) => {
    
    res.render('events/cart');
  });
  
 
  app.get('/shoes', (req, res) => {
    
    res.render('events/shoes');
});
//route for/men
app.get('/clothing',(req,res)=>{
    res.render('events/clothing')
});

//route for/Accesories
app.get('/accessories',(req,res)=>{
    res.render('events/accessories')
});

app.get('/suits',(req,res)=>{
    res.render('events/suits')
});
  
  


  

  
// routes
// const events = require('./routes/eventRoutes')
// app.use('/events', events)
// const users = require('./routes/userRoute')
// app.use('/users', users)
// const orders = require('./routes/orderRoutes')
// app.use('/users', orders)

//creating the server
app.listen(3000,()=>{
    console.log("running.. ")

})


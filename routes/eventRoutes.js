const express = require('express')
const app = express.Router()
const Pruduct = require('../models/product')
const passport = require('passport')

// const { check, validationResult } = require('express-validator/check')


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

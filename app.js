const express = require('express')
const app = express()
const port = 3333

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
//requiring the model
const user = require('./models/users.js')

const dburl = "mongodb://localhost:27017/foodie"
mongoose.connect(dburl).then(() => {
    console.log('connected to database');
})
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())  // cross origin resource sharing

app.post('/signup', async (req, res) => {
    user.findOne({ email: req.body.email }, (err, userdata) => {
        if (userdata) {
            res.send({ message: "User already exists" })
        } else {
            const data = new user({
                name: req.body.name,
                email: req.body.email,
                mobileno: req.body.mobileno,
                password: req.body.password,
            })
            data.save(()=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"User registered successfully"})
                }
            })
        }
    })

})

app.listen(port, () => {
    console.log(`Running at port ${port}`);
})
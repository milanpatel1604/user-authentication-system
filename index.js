const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const User=require('./model/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const port=800;

const JWT_SECRET='kdjsnfakjh7325y8178934tho4nuifbu#%#$%#uihfuehrirniwjgijioe';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/login-app-db',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


const app=express();

app.use('/static', express.static('static'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyparser.json());

app.get('/',(req, res)=>{
    res.render('index.html');
})

app.post('/api/signup', async (req,res)=>{

    // ***************************
    const {username, email,password: password}=req.body;

    // validation part
    if(!username || typeof username !== 'string' || username.length < 5){
        return res.json({status:'error', error:'invalid Username'})
    }
    if(!email || typeof email !== 'string' || !email.endsWith('@gmail.com')){
        return res.json({status:'error', error:'invalid Email'})
    }
    if(!password || typeof password !== 'string' || password.length < 5){
        return res.json({status:'error', error:'Invalid password (atleast 5 characters)'})
    }

    const encryptedPassword= await bcrypt.hash(password, 10);
    try{
        const response= await User.create({
            username,
            email,
            encryptedPassword
        })
        console.log('User created successfully: ', response)
        return res.json({status:'ok', message: 'Account created successfully'})
    }catch (error){
        if(error.code === 11000){
            return res.json({status: 'error', error: 'User already exist with this username or email.'});
        }
        throw error
    }
})

app.post('/api/login', async (req,res)=>{

    // ***************************
    const {username, password}=req.body;
    const user = await User.findOne({username}).lean()

    if(!user){
        return res.json({status:'error', error:'User not exixt plese Signup'})
    }

    if(await bcrypt.compare(password, user.encryptedPassword)){

        const token=jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )

        return res.json({status:'ok', data:token, message:'Welcome Back, Login successful'});
    }
    else{

        return res.json({status:'error', error:'invalid Password'});
    }
})



app.listen(process.env.PORT || port,()=>{
    console.log(`this site is active at localhost:${port}`);
})
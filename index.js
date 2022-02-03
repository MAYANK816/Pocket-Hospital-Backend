import express from "express";
import mongoose from 'mongoose'
import Cors from 'cors';
import bodyParser from "body-parser";
import User from './models/user.js'
import oxygenUsers from './models/oxygenCylinder.js'
import needDoctor from './models/needDoctor.js'
import hospitalbeds from './models/hospitalBeds.js'
import needAmbulance from './models/needAmbulance.js'
import needDietitian from './models/needDietitian.js'
import emailSubs from './models/emailSubs.js';
import Stripe from 'stripe';
import checkout from "./models/checkout.js";

import findMedicine from './models/findMedicine.js';

//App Config
const app=express();
const port=process.env.PORT||8001;
const stripe = new Stripe('sk_test_51KOyxOSAA6LbWVNhntMlV7mvJXuqWwsYqa5KYfTsseJ6CrJXFHVSVU7Mxk0Nm1UmRqN6FMCF7AreJv0UlkhezdGY00UzDLja1q');
app.use(express.json());
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const connectionurl='mongodb+srv://Mayank_admin:6jlPThP9xfBEB8xQ@cluster0.eh1h4.mongodb.net/Users?retryWrites=true&w=majority';

mongoose.connect(connectionurl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})   .then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Step 5 - set up multer for storing uploaded files



app.get('/',(req,res)=>res.status(200).send("Hello Programmers"));
app.post('/checkout',async(req,res)=>{
    console.log(req.body);
    let error,status;
    try {
        const {product,token}=req.body;
        const customer = await stripe.customers.create({
            email: req.body.email,
            source:req.body.id,
         
          }).then((customer) => {
            // have access to the customer object
            return stripe.invoiceItems
              .create({
                customer: customer.id, 
                amount: req.body.price*100, 
                currency: 'inr',
                description: 'One-time setup fee',
              })
    });
    checkout.create(req.body,function(err,user){
        if(err){
            console.log("error found",err);
            return;
        }
        return res.status(200);
    })
    status="success";
    
} catch (error) {
        console.log("error",error);
        status="failure";
    }
    res.json({error,status});
});
app.post('/userCreate',function(req,res){
    if(req.body.password != req.body.cpassword){
        console.log("passsword not matched");
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            res.status(403).send(err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
        
                if(err){
                    console.log("error found",err);
                    return;
                }
                return res.status(200).redirect('/')
            })
        }
        else{
            return res.status(200).redirect('/');
        }
    });

    
})

app.post('/oxygenCylinderData',function(req,res){

            oxygenUsers.create(req.body,function(err,user){
                if(err){
                    console.log("error found",err);
                    return;
                }
                return res.redirect('/');
            })
        });
        app.post('/hospitalbeds',function(req,res){

                    hospitalbeds.create(req.body,function(err,user){
                        if(err){
                            console.log("error found",err);
                            return;
                        }
                        return res.redirect('/');
                    })
                });
         app.post('/needdoctor',function(req,res){
                            needDoctor.create(req.body,function(err,user){
                                if(err){
                                    console.log("error found",err);
                                    return;
                                }
                                return res.redirect('/');
                            })
                        });
                        app.post('/needAmbulance',function(req,res){
                      
                            needAmbulance.create(req.body,function(err,user){
                                        if(err){
                                            console.log("error found",err);
                                            return;
                                        }
                                        return res.redirect('/');
                                    })
                                });
                                app.post('/needDietitian',function(req,res){

                                    needDietitian.create(req.body,function(err,user){
                                                if(err){
                                                    console.log("error found",err);
                                                    return;
                                                }
                                                return res.redirect('/');
                                            })
                                        });
                                        app.post('/emailSubs',function(req,res){
                                            emailSubs.findOne({email : req.body.email},function(err,user){
                                                console.log("user",user)
                                                if(err)
                                                {   
                                                    return res.send(err);
                                                }
                                                if(user===req.body.email){
                                                    return res.send(403);
                                                }
                                                else{
                                                    emailSubs.create(req.body,function(err,user){
                                                        if(err){
                                                            return res.status(403).send(err);
                                                        }
                                                        return res.status(200).redirect('/');
                                                    })
                                                   
                                                }
                                            })
                                         });

                                         app.post('/findMedicine',function(req,res){

                                            findMedicine.create(req.body,function(err,user){
                                                if(err){
                                                    console.log("error found",err);
                                                    return;
                                                }
                                                return res.redirect('/');
                                            })
                                        });                     
//

app.get('/SignIn',(req,res)=>{
    User.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

//Listner 
app.listen(port,()=>console.log(`listening :${port}`));
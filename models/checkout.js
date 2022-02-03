// Step 3 - this is the code for ./models.js

import mongoose from 'mongoose';

var userSchema = new mongoose.Schema({
    number : {
        type : String,
        required: true,
    },

    name : {
        type : String,
        required: true
    },

    address : {
        type : String,
        required: true
    },
	id:
	{
        type : String,
        required: true
	},
    price:
	{
        type : String,
        required: true
	},
    email:
	{
        type : String,
        required: true
	}

},
{
    timestamps : true
}

);

//Image is a model which has a schema imageSchema

export default mongoose.model('donations',userSchema);

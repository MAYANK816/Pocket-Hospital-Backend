import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    number : {
        type : String,
        required: true,
    },
    quantity : {
        type : String,
        required: true
    },
    need : {
        type : String,
        required: true
    },
    name : {
        type : String,
        required: true
    },
    emergency : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    }
 },
 {
     timestamps : true
 }
 );
 

export default mongoose.model('oxygenCylinder',userSchema);




import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    number : {
        type : String,
        required: true,
    },
    time : {
        type : String,
        required: true
    },
    problem : {
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
 

export default mongoose.model('needDoctor',userSchema);




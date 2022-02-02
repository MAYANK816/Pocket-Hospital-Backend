import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    number : {
        type : String,
        required: true,
    },
    Address : {
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
    Depart_time : {
        type : String,
        required: true
    }
 },
 {
     timestamps : true
 }
 );
 

export default mongoose.model('needAmbulance',userSchema);





const mongoose = require('mongoose');
const Vendor=require('./vendor');

const proposalmodel= mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    eventPlace:{
        type:String,
        required:true
    },
    proposaltype:{
        type:String,
        required:true
    },
    eventName:{
        type:String,
        required:true
    },
    eventType:{
        type:String,
        required:true
    },
    budget:{
        type:Number,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true,
        default:[]
    },
    foodprefernces:{
        type:String,
        required:true
    },
    events:{
        type:String,
        required:true
    },
    VendorId:{
        type:mongoose.Schema.Types.ObjectID,//VendorId: A reference field to the "Vendor" model using the vendor's object ID.
        ref:"Vendor",
        required:true
    },
},
{
    timestamp:true
});

module.exports=mongoose.model('Proposal',proposalmodel)

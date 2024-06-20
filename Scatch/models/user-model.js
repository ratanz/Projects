const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({ 
    fullname : {
        type : String,
        minLentgh : 3,
        trim : true,
    },
    email : String,
    password : String,
    card : {
        type : Array,
        default : []
    } ,
    isadmin : Boolean,
    orders : {
        type : Array,
        default: []
    },
    contact : Number,
    picture : String,
})


module.exports = mongoose.model("user", userSchema)

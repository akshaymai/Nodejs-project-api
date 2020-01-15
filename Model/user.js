const {mongoose}=require('../connection')
const schema=mongoose.Schema;
const validator=require('validator')
const bcrypt=require('bcryptjs')
const {Task}=require('../Model/task')
const jwt=require('jsonwebtoken')
const userschema=new schema({
    _id:mongoose.Schema.Types.ObjectId,
Name:{
    type:String,
    required:true,
    trim:true
},
Email:{
    type:String,
    required:true,
    lowercase:true,
    validate:{
        validator:validator.isEmail,
        message:'${VALUE} is not a valide Email'
    },
    trim:true,
    unique:true
},
Password:{
    type:String,
    required:true

},
Age:{
    type:Number,
    default:0,
},
tokens:[{

token:{
type:String,
required:true
}
}

],
profileimage:{
    type:Buffer
}


},{
    timestamps:true
})

// userschema.virtual('tasks',{
//     ref:'task',
//     foreignField:'Owner',
//     localField:'_id',

// })
userschema.virtual('tasks',{
  ref:'task',
  foreignField:'Owner',
  localField:'_id'
})





userschema.statics.logincredential=async function (Email,Password){

const user=await User.findOne({Email});
if(!user)
{
           return 'unable to login!!'
}

const isMatch= await bcrypt.compare(Password,user.Password)
if(!isMatch)
{   
    return "Password not match"
}
return user
}

userschema.pre('save',async function (next){

const user=this;

if(user.isModified('Password')){

 user.Password=await bcrypt.hash(user.Password,8)

}

    next();
})


userschema.methods.genaratetoken=async function(){
const user=this;
const token= jwt.sign({_id:user._id},'abc123')
user.tokens=user.tokens.concat({token})
await user.save()
return token
}


userschema.methods.toJSON=function(){
    var user=this

    var  userobj=user.toObject()
    // delete userobj.Password
    // delete userobj.tokens;

    return userobj;
}



userschema.pre('remove',async function(next){

var user=this;
await Task.deleteMany({Owner:user._id})
next();

})


const User=mongoose.model('user',userschema)
module.exports={User}















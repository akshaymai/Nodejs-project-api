const {mongoose}=require('../connection')
const schema=mongoose.Schema;
const taskschema=new schema({

 Discription:{
     type:String,
     required:true
 },
 Completed:{
     type:Boolean,
     required:true
 },
 Owner:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'user'
 }
},{
    timestamps:true
})





const Task=mongoose.model('task',taskschema)
module.exports={Task}
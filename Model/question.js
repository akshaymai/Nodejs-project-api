const {mongoose}=require('../connection')

const schema=mongoose.Schema;

const questionschema=new schema({
QuestionPaper:{
    type:String,
    required:true
},
DifficultyLevel:{

    type:Number,
    required:true
},
Answer:{
    type:String,
    required:true
},
TotalMarks:{
    type:Number,
    required:true
} 
})

const question=mongoose.model('Question',questionschema)

module.exports={question}
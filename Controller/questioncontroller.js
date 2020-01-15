const {question}=require('../Model/question')


module.exports={


addquestion:async(req,res)=>{
    const qus=new question(req.body)
try {
    const questions=await qus.save()
    res.send(questions)
    
} catch (error) {
    res.status(500).send(error)
    
}
},
getallquestion:(req,res)=>{
    question.find().then((ff)=>{
        res.status(200).send(ff)
    }).catch((er)=>{
        res.status(500).send(er)
    })
},
getquestionbyid:(req,res)=>{
question.findById(req.params.id).then((rr)=>{

    res.status(200).send(rr)
}).catch((err)=>{

res.status(500).send(err)

})
},
deletequestionbyid:(req,res)=>{
    
question.findByIdAndRemove(req.params.id).then((bb)=>{

    res.status(200).send(bb)
}).catch((err)=>{

    res.status(500).send(err)
})
},
deleteallquestion:(req,res)=>{


    question.deleteMany().then((ss)=>{

        res.status(200).send(ss)
    }).catch((er)=>{

    res.status(500).send(er)

    })

},
updatequestions:async (req,res)=>{

const update=Object.keys()
const allowupdate=['QuestionPaper','DifficultyLevel','Answer','TotalMarks']
const isvalidupdate=update.forEach((updates)=>{

     return allowupdate.includes(updates)
})
if(!isvalidupdate){

    res.status(200).send('not valide update')
}
const questionpaper=await question.findById({_id:req.params.id})
try {
    update.forEach((bb)=>{
        questionpaper[bb]=req.body[bb]
    })

} catch (error) {
    
    res.status(500).send(error)
}



}
}
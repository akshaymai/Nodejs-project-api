const express=require('express')
const questionsetcontroller=require('../Controller/questioncontroller')
const router=express.Router()
router.post('/setquestion',questionsetcontroller.addquestion)
router.get('/getallquestion',questionsetcontroller.getallquestion)
router.get('/getquestionbyid/:id',questionsetcontroller.getquestionbyid)
router.delete('/deletequestionbyid/:id',questionsetcontroller.deletequestionbyid)
router.delete('/deleteall',questionsetcontroller.deleteallquestion)
module.exports=router
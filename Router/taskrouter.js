const express=require('express')
const router=express.Router();
const taskcontroller=require('../Controller/taskcontroller')
const {auth}=require('../Authorization/auth')
router.post('/addtask',auth,taskcontroller.addtask)
router.get('/getalltask',auth,taskcontroller.getalltask)
router.get('/gettaskbyid/:id',auth,taskcontroller.gettaskbyid)
router.delete('/deletetaskbyid/:id',auth,taskcontroller.deletetaskbyid)
router.delete('/deletealltask',taskcontroller.deleteallltask)
router.put('/updatetask/:id',auth,taskcontroller.updatetask)
router.get('/getalltaskadmin',taskcontroller.getalltaskadmin)
module.exports=router
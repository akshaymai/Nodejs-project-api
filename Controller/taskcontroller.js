const {Task}=require('../Model/task')
const {mongoose}=require('../connection')
module.exports={


addtask:async (req,res)=>{
    const update=Object.keys(req.body)
    const allowupdate=['Discription','Completed']
    const isvalidewupdatew=update.every((updatelee)=>{
        return allowupdate.includes(updatelee)
    })
    if(!isvalidewupdatew)
    {
    res.status(400).json({
        message:'not valide  task field'
    })
    
    }
    
 const task=new Task({

    ...req.body,
    Owner:req.user._id
 })
 try {
    const tasks=await task.save()
    res.status(201).send(tasks) 

 } catch (error) {
    res.status(500).send(error) 
 }
},
getalltask: async(req,res)=>{

    const match={};

    if(req.qurey.Completed){
        match.Completed==req.qurey.Completed==='true'
    }
try {

await req.user.populate({
path:'tasks',
match,
limit:parseInt(req.qurey.limit),
skip:parseInt(req.qurey.skip)
}).execPopulate()

 res.status(200).send(req.user.tasks)   


} catch (error) {
    res.send(error).status(500)
}

},
gettaskbyid:async(req,res)=>{

const id=req.params.id;
    try {
        
    const tasks=await Task.findOne({_id:id,Owner:req.user._id})
    if(!tasks)
    {
        return res.status(404).send('task not found');
    }
    res.send(tasks).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
},
deletetaskbyid:async (req,res)=>{
    const id=req.params.id;
    try {
        const tasks=await Task.findOneAndDelete({_id:id,Owner:req.user._id})
        if(!tasks)
        {
            return res.status(404).send('task not found');
        }
        res.send(tasks).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
},
deleteallltask:async (req,res)=>{
    try {
        const tasks=await Task.deleteMany()
        res.send(tasks).status(200)
    } catch (error) {
        res.send(error).status(500)
    }
},
updatetask: async(req,res)=>{

const update=Object.keys(req.body)
const allowupdate=['Discription','Completed']
const isvalidewupdatew=update.every((updatelee)=>{
    return allowupdate.includes(updatelee)
})
if(!isvalidewupdatew)
{
res.status(400).json({
    message:'not valide update'
})

}

try {
    
// const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

const task=await Task.findOne({_id:req.params.id,Owner:req.user._id})
 if(!task)
{
    res.status(400).send('not valide user')
}
update.forEach((updates)=>task[updates]=req.body[updates])
 
await task.save();
res.status(200).send(task)

} catch (error) {
    res.send(error).status(500)
}
},
getalltaskadmin:async (req,res)=>{


    try {
   const alltask=await Task.find()
   res.status(200).send(alltask)
    } catch (error) {
        res.status(500).send(error)
    }
}

}
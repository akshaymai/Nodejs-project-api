const express=require('express')
const app=express()
app.use(express())
app.use(express.json())
app.use('/user',require('./Router/userrouter'))
app.use('/task',require('./Router/taskrouter'))
module.exports={app}

 

// const {Task}=require('./Model/task')
// const {User}=require('./Model/user')


// const main=async()=>{

// // const task=await Task.findById('5e1b1b1bb324cc220ead29fd')
// const user=await User.findById('5e1ab17de45c1912427a360b')
// // await task.populate('Owner').execPopulate()

// await user.populate('tasks').execPopulate()
// // await task.populate('Owner').execPopulate()
// // console.log(task.Owner)
// console.log(user.tasks)
// }
// main();

const {User}=require('../Model/user')
const {mongoose}=require('../connection')
const sharp=require('sharp')
module.exports={


adduser:(req,res)=>{
    const update=Object.keys(req.body)
const allowupdate=['Name','Email','Password','Age']
const isvalidewupdatew=update.every((updatelee)=>{
    return allowupdate.includes(updatelee)
})
if(!isvalidewupdatew)
{
res.status(400).json({
    message:'not valide update'
})

}


const user=new User({
    _id:mongoose.Types.ObjectId(),
    Name:req.body.Name,
    Email:req.body.Email,
    Password:req.body.Password,
    Age:req.body.Age
})
user.save().then((use)=>{
    res.send(use).status(200)
}).catch((err)=>{
    res.status(500).send(err)
})


// const useee=new User(req.body)
// try {
//     await useee.save() 
//     res.status(201).send(useee)   
    
    
//     } catch (error) {
//         res.send().status(500)
//     }
},
getalluser: async(req,res)=>{

try {
const users=await User.find();
res.status(200).send(users)   


} catch (error) {
    res.send().status(500)
}

},
getuserbyid:async(req,res)=>{

const id=req.params.id;
    try {
        
    const users=await User.findById(id)
    res.send(users).status(200)
    } catch (error) {
        res.send().status(500)
    }
},
deleteuserbyid:async (req,res)=>{
    const id=req.params.id;
    try {
        const users=await User.findByIdAndDelete(id)
        res.send(users).status(200)
    } catch (error) {
        res.send().status(500)
    }
},
deletealll:async (req,res)=>{
    try {
        const users=await User.deleteMany()
        res.send(users).status(200)
    } catch (error) {
        res.send().status(500)
    }
},
updateuser: async(req,res)=>{
const update=Object.keys(req.body)
const allowupdate=['Name','Email','Password','Age']
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
    
// const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
// const user=await User.findById(req.params.id)
const user=await User.findOne({_id:req.user._id})

console.log(user)
if(!user)
{
    console.log("user not found")
}
update.forEach((updates)=>req.user[updates]=req.body[updates])
await req.user.save()

 
res.send(req.user)

} catch (error) {
    res.send(error).status(500)
}
},

login:async(req,res)=>{

    try {
 const user=await User.logincredential(req.body.Email,req.body.Password);
 const token=await user.genaratetoken()
 res.status(201).send({user,token});
    } catch (e) {
        
        res.status(500).send(e)
    }
 


},

findme:async (req,res)=>{

    try {
        res.send(req.user)

    } catch (error) {
        
    }
},
logoutall:async (req,res)=>{
try {
    console.log(req.user.tokens)
    req.user.tokens=[]
await req.user.save()
res.send(req.user)
} catch (error) {
    res.status(500).send(error)
}
},
logout:async (req,res)=>{

    try {
        
req.user.tokens=req.user.tokens.filter((token)=>{
    return token.token!==req.token
     
})
await req.user.save()

res.send()

    } catch (error) {
        
        res.status(500).send(error)

    }
},
deletebytoken:async (req,res)=>{
try {
    await req.user.remove();
res.send(req.user)
} catch (error) {
   res.status(500).send(error) 
}
 

},
uploadimage:async (req,res)=>{
const buffer=await sharp(req.file.buffer).resize({height:250,width:250}).png().toBuffer()

req.user.profileimage=buffer
await req.user.save();

res.send();
   
},
deleteiamge:async (req,res)=>{

    req.user.profileimage=undefined;
    await req.user.save()
  res.send()
},

imageshowurl:async (req,res)=>{
    try {
        const user=await User.findById(req.params.id)
if(!user ||! user.profileimage)
{
    throw new Error()
}
res.set('Content-Type','image/png')

 res.send(user.profileimage)

    } catch (error) {
        
    }
 
}

}
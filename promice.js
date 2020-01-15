

const add=(a,b)=>{
    return new Promise((resolve,rej)=>{
        setTimeout(() => {
        
            resolve(a+b)
        }, 2000);
    })
}

add(2,3).then((reg)=>{
 return add(reg,9)
}).then((reg2)=>{
    console.log(reg2)
}).catch((err)=>{
    console.log(err)
})
const http=require('http');
const {app}=require('./index');
const server=http.createServer(app)
const PORT=process.env.PORT||6666
server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
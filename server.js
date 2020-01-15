const http=require('http');
const dotenv=require('dotenv')
dotenv.config()
const {app}=require('./index');
const server=http.createServer(app)
const PORT=process.env.PORT
server.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';


const app = express();
const PORT =8000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:'localhost',
    database:"task_management",
    user:"root",
    password:"Aryan@123"
})

db.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Mysql Connected")
    }
})


app.get('/alltask',(req,res)=>{
    const query = "select * from tasks";
    db.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
            console.log(result);
        }
    })
})

app.post('/addtask',(req,res)=>{
    const task = req.body;
    console.log(task)
    const query = `insert into tasks (task) values ('${task.task}')`;
    db.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Task Added")
        }
    })
})


app.get('/',(req,res)=>{
    res.send("hi")
})
app.listen(PORT,()=>{
    console.log(`Server Stared At PORT${PORT}`)
})
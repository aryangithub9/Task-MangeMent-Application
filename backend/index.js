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


app.get('/tasks',(req,res)=>{
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


app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { task } = req.body; 
    const query = `UPDATE tasks SET task = '${task}', status = 'Active' WHERE id = '${id}'`;
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error updating task");
        }
        res.send("Task updated successfully");
    });
});


app.post('/tasks',(req,res)=>{
    const task = req.body;
    console.log(task)
    const query = `insert into tasks (task,status) values ('${task.task}','Active')`;
    db.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Task Added")
        }
    })
})

app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const query = `delete from tasks where id = ${id}`
    db.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('Book deleted Sucessfully');
        }
    })
})





app.listen(PORT,()=>{
    console.log(`Server Stared At PORT ${PORT}`)
})
const express=require('express')
const app=express()
const cors=require('cors')
const {Pool}=require('pg')
app.use(express.json())
app.use(cors())

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'Arun2020@ij',
    port:5432,
    database:'employee'
})

app.post('/',async(req,res)=>{
    console.log("req.body",req.body)
    const{dateOfJoining,employee,gender,mailid,phoneNo,qualification,yearsOfExperiencePrev}=req.body;
    const x=new Date(dateOfJoining).getFullYear()
const dateOfJoining1=new Date(dateOfJoining).getFullYear();
    const yearsOfExperienceCurr=new Date().getFullYear()-dateOfJoining1;
    console.log("--> ",typeof(yearsOfExperienceCurr))
    // (employee varchar,mailid varchar,phoneNo varchar,gender varchar,qualification varchar,yearsOfExperiencePrev varchar,dateOfJoining varchar,yearsOfExperienceCurr varchar)

    try{
        const k=await pool.query('insert into employeeData (employee,mailid,phoneNo,gender,qualification,yearsOfExperiencePrev,dateOfJoining,yearsOfExperienceCurr) values($1,$2,$3,$4,$5,$6,$7,$8) returning *',[employee,mailid,phoneNo,gender,qualification,yearsOfExperiencePrev,dateOfJoining1,yearsOfExperienceCurr])
        console.log(k.rows);
    }
    catch(err){
        console.error(err);
    }
    console.log("!!");
    res.json({msg:"success"})
})
app.get('/',async(req,res)=>{
    try{
        const data=await pool.query('select * from employeeData'); 
        res.json(data.rows)}
        catch(err){
            console.log(err);
        } 
})
app.listen(3000,(req,res)=>{
    console.log("Server is listening to port 3000...");
})
const express=require("express")
const bodyParser=require("body-parser")
const app=express()
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/todo");
const trySchema=new mongoose.Schema({
    name:String,
});
const item=mongoose.model("Task", trySchema)
app.get("/",function(req,res){
    async function findAndRender(){
        try{
            const finditems=await item.find({})
            res.render("list",{tasklist:finditems});
        }catch(err){
            console.log(err)
        };
    };
    findAndRender();
});
app.post("/",function(req,res){
    function addNewTask(){
        newTask=new item({
            name:req.body.task
        })
        try{
            newTask.save();
            console.log("New task added successfully");
            res.redirect("/");
        }catch(err){
            console.log(err)
        }
    }
    addNewTask();
})
app.post("/delete",function(req,res){
    async function deleteTask(){
        try{
            const val=req.body.checkbox;
            console.log(val)
            await item.findByIdAndDelete(val)
            console.log("item deleted successfully")
            res.redirect("/")
        }catch(err){
            console.log(err)
        }
    }
    deleteTask()
})
// todo.save();
// todo1.save();
// todo2.save();
// todo3.save();
app.listen("3000",function(){
    console.log("Server started")
})
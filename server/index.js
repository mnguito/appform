const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/db")

//middleware
app.use(cors());
app.use(express.json());

//routes

//create
app.post("/formulario", async(req, res) => {
    try {
        const {todo} = req.body;

        const isexist = await pool.query("SELECT * FROM formulario WHERE email = $1", [todo.email]);

        //Considerando que alguien de 10 años puede llenar el formulario
        const now = new Date();
        const thisdate = (now.getFullYear() - 10)  + "-" + (now.getMonth() + 1) + "-" + now.getDate();

        console.log(thisdate);
        console.log(todo.fecha_nac);
        console.log(todo.fecha_nac < thisdate);

        if(todo.fecha_nac < thisdate){

            if(isexist.rows.length == 0){
                const newTodo = await pool.query("INSERT INTO formulario (nombre, apellido, email, fecha_nac, genero) VALUES ( $1, $2, $3, $4, $5 ) RETURNING *", [todo.nombre, todo.apellido, todo.email, todo.fecha_nac, todo.genero] );
                res.status(200).json({
                    message:"¡Su formulario se registró satisfactorimente!",
                    body: newTodo.rows[0]
                })
 

            }else{
                res.status(406).json({
                    message: "El correo ya ha sido registrado antes.",
                    body: isexist.rows
                })
            }
            return true;
        }else{
            res.status(400).json({
                message: "Ingrese una fecha de nacimiento válida.",
                body: isexist.rows
            })
        }
        

    } catch (err) {
        console.error(err.message);
    }
})

// get 
app.get("/formulario", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM formulario");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get a id
app.get("/formulario/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM formulario WHERE form_id = $1", [id]);
        res.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("server has started on port 5000");
})

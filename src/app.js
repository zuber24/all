const express = require('express');
require("./db/conn");
const app = express();
const Student = require("./models/student");
const studentRouter = require("./routers/student");


// require('dotenv').config()

// const port = process.env.PORT||
const port = process.env.PORT || 3000;

app.use(express.json());
//using promise (then ,catch )
// app.post('/test', (req, res) => {
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e)

//     })

// })
app.use(studentRouter);

//using async await
app.post("/test", async(req, res) => {
    try {
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);

    } catch (e) {
        res.status(400).send(e);
    }
})

//get data 
app.get("/test", async(req, res) => {
        try {
            const studentsData = await Student.find();
            res.send(studentsData);
        } catch (e) {
            res.send(e);
        }
    }

)

// get the indivisual student data using id 
app.get("/test/:id", async(req, res) => {
    try {
        const _id = req.params;
        console.log(req.params);
        res.send(req.params);

    } catch (e) {

    }
})

//find by id 

app.get("/test/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);
        if (!studentData) {
            return res.status(404).send();
        } else {
            res.send(studentData);

        }

    } catch (e) {
        res.send(e);

    }
})



// update the stduent by id 

app.patch("/test/:id", async(req, res) => {
        try {
            const _id = req.params.id;
            const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
                new: true
            });
            res.send(updateStudent);
        } catch (e) {
            res.status(400).send(e);

        }



    })
    // delete 
app.delete("/test/:id", async(req, res) => {
    try {
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();

        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);

    }
})

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})
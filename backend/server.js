const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config");

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// MongoDB connection

const MONGO_URI =
    `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`;

mongoose
    .connect(MONGO_URI)
    .then(() => {

        console.log("MongoDB connected");

    })
    .catch((error) => {

        console.error("MongoDB connection failed:", error);

    });


// Todo Schema

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        completed: {
            type: Boolean,
            default: false
        }
    },

    {
        timestamps: true
    }
);


const Todo = mongoose.model("Todo", todoSchema);


// CREATE TODO

app.post("/api/todos", async (req, res) => {

    try {

        const todo = await Todo.create({
            title: req.body.title
        });

        res.status(201).json(todo);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// READ TODOS

app.get("/api/todos", async (req, res) => {

    try {

        const todos = await Todo
            .find()
            .sort({ createdAt: -1 });

        res.json(todos);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE TODO

app.put("/api/todos/:id", async (req, res) => {

    try {

        const todo = await Todo.findByIdAndUpdate(

            req.params.id,

            {
                completed: req.body.completed
            },

            {
                new: true,
                runValidators: true
            }

        );

        if (!todo) {

            return res.status(404).json({
                message: "Todo not found"
            });

        }

        res.json(todo);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE TODO

app.delete("/api/todos/:id", async (req, res) => {

    try {

        const todo = await Todo.findByIdAndDelete(
            req.params.id
        );

        if (!todo) {

            return res.status(404).json({
                message: "Todo not found"
            });

        }

        res.json({
            message: "Todo deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// HEALTH CHECK

app.get("/health", (req, res) => {

    res.json({
        status: "Backend is healthy"
    });

});


// Start server

app.listen(
    config.PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Backend running on port ${config.PORT}`
        );

    }
);
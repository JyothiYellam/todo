const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model("Todo", todoSchema);

// CREATE
app.post("/api/todos", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
app.put("/api/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete("/api/todos/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({
      message: "Todo deleted"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
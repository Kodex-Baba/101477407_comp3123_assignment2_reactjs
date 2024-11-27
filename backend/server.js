require("dotenv").config();
const express = require("express")
const usersRoutes = require('./routes/users')
const employeesRoutes = require("./routes/employees")
const mongoose = require("mongoose")

// const DB_CONNECTION_STRING = "mongodb://localhost:27017/books"
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log("Error: ", err)
})

const app = express()

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const cors = require("cors");
const morgan = require("morgan");


app.use(cors());
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded())

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.use("/api/v1/users", usersRoutes); // Changed from "/api/v1"
app.use("/api/v1/employees", employeesRoutes); // Changed from "/api/v1/emp"


app.route("/")
    .get((req, res) => {
        res.send("<h1>MongoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://Sameer123:Sameer123@cluster0.gpmagx8.mongodb.net/test", {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useUnifiedTopology: true

    })
    .then(() => console.log('MongoDB connection established.'))
    .catch((error) => console.error("MongoDB connection failed:", error.message))
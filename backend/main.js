require('dotenv').config();

const express = require('express');

const { connect } = require("./configs/database.config");

const userRoute = require('./routes/user.route')

const run = async () => {
    try {
        const PORT = process.env.PORT;
        const app = express();
        
        await connect();

        app.use(express.json());

        //Routes
        app.use('/users', userRoute);


        app.listen(PORT, () => {
            console.log("Your Application is running on http://localhost:" + PORT);
        })

    } catch (error) {
        console.error("Error starting the application:", error);
    }
};

run();
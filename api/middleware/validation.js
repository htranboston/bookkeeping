const Joi = require('@hapi/joi');
const expressValidation = require('express-validation');

// Define the validation schema for your route
const schema = {
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
};

// Use the middleware in your routes
app.post('/login', expressValidation(schema), (req, res) => {
    // Your route handler code here...
});
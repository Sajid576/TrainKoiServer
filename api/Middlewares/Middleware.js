const express = require('express');
var morgan = require('morgan');

const developmentMiddleweres=[
    morgan('dev'),// used for logging the request URL for development purposes
]

const middlewares=[
    
    express.json(),// used for parsing data from request
    express.urlencoded({ extended:true}),
]




module.exports = (app) => {
    if(process.env.NODE_ENV === 'Development')
        {
            developmentMiddleweres.forEach(m=> {
                app.use(m);
                console.log('Morgan is in action');
            })
        }
    middlewares.forEach(m =>{
        
        app.use(m)
    })
}
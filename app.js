const express = require('express');
const { getMean, getMedian, getMode, checkForNums } = require('./operations');
const { requestError, RequestError } = require('./requestError')

const app = express();

/*************************
 * ROUTES
 * ***********************/

app.get('/mean', function(req, res, next) {
    try {
        const numString = req.query['nums'];
        
        // throw error if query string empty
        if (!numString) throw new RequestError('query nums are required', 400);
        // throw error if not all chars are numbers
        let badChar = checkForNums(numString);
        if (badChar) throw new RequestError(`${badChar} is not a number`, 400);

        let mean = getMean(numString);
        let response = {
            operation: 'mean',
            value: mean
        }
        return res.send(response);
    } catch(error) {
        next(error);
    }
})

app.get('/median', (req, res, next) => {
    try {
        const numString = req.query['nums'];

        // throw error if query string empty
        if (!numString) throw new RequestError('query nums are required', 400);
        // throw error if not all chars are numbers
        let badChar = checkForNums(numString);
        if (badChar) throw new RequestError(`${badChar} is not a number`, 400);

        let median = getMedian(numString);
        let response = {
            operation: 'median',
            value: median
          }
    
        return res.send(response);
    } catch(error) {
        next(error)
    }  
})

app.get('/mode', (req, res, next) => {
    try {
        const numString = req.query['nums'];
        // throw error if query string empty
        if (!numString) throw new RequestError('query nums are required', 400);
                
        let mode = getMode(numString);
        let response = {
            operation: 'mode',
            value: mode
        }
        return res.send(response);
    } catch(error) {
        next(error)
    }
})

/***************************
 *  ERROR HANDLING
 ***************************/
app.use((error, req, res, next) => {
    let status = error.status || 500;
    let msg = error.msg;

    return res.status(status).json({
        error: {msg, status}
    });
})


app.listen(3000, function() {
    console.log('Running app.js on Port 3000');
})
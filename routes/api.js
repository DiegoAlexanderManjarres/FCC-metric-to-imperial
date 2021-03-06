/*
*
*
*       Complete the API routing below
*
*
*/


const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = (app) => {
  
   const convertHandler = new ConvertHandler();

   app.route('/api/convert')
      .get(function(req, res) {
         const input = req.query.input;
         const inputErrors = []
         const initNum = convertHandler.getNum(input);
         const initUnit = convertHandler.getUnit(input);

         if (initNum === 'invalid number') { inputErrors.push(initNum) }
         if (initUnit === 'invalid unit') { inputErrors.push(initUnit) }
         if (inputErrors.length > 0) {
            return res.status(200).type('text').send(
               inputErrors.length > 1 ? 'invalid number and unit' : inputErrors[0]
               )
         }
         const returnNum = convertHandler.convert(initNum, initUnit);
         const returnUnit = convertHandler.getReturnUnit(initUnit);
         const toString = convertHandler
            .getString(initNum, initUnit, returnNum, returnUnit);
         
         //res.json
         res.status(200)
            .json({ initNum, initUnit, returnNum, returnUnit, string: toString })
      });
    
};
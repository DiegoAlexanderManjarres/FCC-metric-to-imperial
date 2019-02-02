/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
   this.getNum = function(input) {// fix 00. decimal places
      const reg = /([a-z]+|[A-Z]+)/
      const number = input.trim().split(reg)[0] || 1
      const fractionFilter = /^[0-9]+(\.[0-9]+)?\/[0-9]+(\.[0-9]+)?$/
      if ((fractionFilter).test(number)) {
         const [a, b] = number.split('/')
         return Number(((+a) / (+b)).toFixed(5))
      }
      return Number(number);
   };
   
   this.getUnit = function(input) {
      const reg = /([a-z]+|[A-Z]+)/
      const unit = input.trim().split(reg)[1]    
      return (/^(gal|lbs|L|kg|km|mi)$/).test(unit) ? unit : 'invalid unit' 
   };
   
   this.getReturnUnit = function(initUnit) {
      const returnUnit = {
         gal: () => 'L',
         lbs: () => 'kg',
         mi: () => 'km',
         L: () => 'gal',
         kg: () => 'lbs',
         km: () => 'mi'
      }      
      return returnUnit[initUnit]();
   };

   this.spellOutUnit = function(unit) {
      const returnUnit = {
         gal: () => 'gallons',
         lbs: () => 'pounds',
         mi: () => 'miles',
         L: () => 'liters',
         kg: () => 'kilograms',
         km: () => 'kilometers'
      }      
      return returnUnit[unit]();
   };
   
   this.convert = function(initNum, initUnit) {
      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      const convertTo = {
         gal: () => Number((initNum * galToL).toFixed(5)),
         lbs: () => Number((initNum * lbsToKg).toFixed(5)),
         mi: () => Number((initNum * miToKm).toFixed(5)),
         L: () => Number((initNum / galToL).toFixed(5)),
         kg: () => Number((initNum / lbsToKg).toFixed(5)),
         km: () => Number((initNum / miToKm).toFixed(5))
      }      
      return convertTo[initUnit]();      
   };
   
   this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      initUnit = this.spellOutUnit(initUnit)
      returnUnit = this.spellOutUnit(returnUnit)
      return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
   };
  
}

module.exports = ConvertHandler;

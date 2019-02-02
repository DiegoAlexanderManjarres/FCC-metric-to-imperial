/*
*
*
*       Complete the handler logic below
*       
*       
*/

const checkNumber = (number = 1, errorsArray = []) => {
   const fractionFilter = /^[0-9]+(\.[0-9]+)?\/[0-9]+(\.[0-9]+)?$/
   if ((fractionFilter).test(number)) {
      const [a, b] = number.split('/')
      return Number(((+a) / (+b)).toFixed(5)) || 'invalid number'
   }
   const result = Number(number) || 'invalid number';
   if (result === 'invalid number') { errorsArray.push(result) }
   return result
}

const checkUnit = (unit, errorsArray = []) => {
   unit = unit.toLowerCase()
   if (unit === 'l') { return unit.toUpperCase() }  
   const result = (/^(gal|lbs|L|kg|km|mi)$/).test(unit) ? unit : 'invalid unit' 
   if (result === 'invalid unit') { errorsArray.push(result) }
   return result
}


function ConvertHandler() {
  
   this.getNum = function(input) {// fix 00. decimal places
      const reg = /([a-z]+|[A-Z]+)/
      const number = input.trim().split(reg)[0] || 1
      return checkNumber(number)
   };
   
   this.getUnit = function(input) {
      const reg = /([a-z]+|[A-Z]+)/
      const unit = input.trim().split(reg)[1].toLowerCase()  
      if (unit === 'l') { return unit.toUpperCase() }  
      return  checkUnit(unit)
   };
   
   this.getReturnUnit = function(initUnit) {
      initUnit = initUnit.toLowerCase()
      const unit = initUnit === 'l' ? 'L' : initUnit 
      const returnUnit = {
         gal: () => 'L',
         lbs: () => 'kg',
         mi: () => 'km',
         L: () => 'gal',
         kg: () => 'lbs',
         km: () => 'mi'
      }      
      return returnUnit[unit]() || 'invalid unit';
   };

   this.spellOutUnit = function(unit) {
      unit = unit.toLowerCase()
      const formatedUnit = unit === 'l' ? 'L' : unit 
      const returnUnit = {
         gal: () => 'gallons',
         lbs: () => 'pounds',
         mi: () => 'miles',
         L: () => 'liters',
         kg: () => 'kilograms',
         km: () => 'kilometers'
      }      
      return returnUnit[formatedUnit]() || 'invalid unit';
   };
   
   this.convert = function(initNum, initUnit) {
      const errors = [] 
      checkNumber(initNum, errors)
      checkUnit(initUnit, errors)
      if (errors.length >= 2) { return `invalid number and unit` }
      if (errors.length >= 1) { return errors[0] }
      const unit = checkUnit(initUnit)
      const number = checkNumber(initNum)

      const galToL = 3.78541;
      const lbsToKg = 0.453592;
      const miToKm = 1.60934;
      const convertTo = {
         gal: () => Number((number * galToL).toFixed(5)),
         lbs: () => Number((number * lbsToKg).toFixed(5)),
         mi: () => Number((number * miToKm).toFixed(5)),
         L: () => Number((number / galToL).toFixed(5)),
         kg: () => Number((number / lbsToKg).toFixed(5)),
         km: () => Number((number / miToKm).toFixed(5))
      }      
      return convertTo[unit]();      
   };
   
   this.getString = function(initNum, initUnit, returnNum, returnUnit) {
      initUnit = this.spellOutUnit(initUnit)
      returnUnit = this.spellOutUnit(returnUnit)
      return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`
   };
  
}

module.exports = ConvertHandler;

var versionlin7 = {
  chunk: function(ary, size = 1) {
    let array = []
    for (let i = 0; i < ary.length; i += size){
      array.push(ary.slice(i, i + size))
    }
    return array
  },
  compact: function(ary) {
    return ary.filter(it => it)
  },
  /**
   * [difference description]
   *Creates an array of `array` values not included in *the other given arrays
   * 
   * @param   {Array}  ary       [ary description]
   * @param   {...Array}  ...value  [...value description]
   *
   * @return  {Array}            [Returns the new array of filtered values]
   */
  difference: function(array, ...value) {
    let ary = []
    let res = array.slice()
    for (let i = 1; i < arguments.length; i++) {
      for(let j = 0; j < arguments[i].length ; j++)
        ary.push(arguments[i][j])
    }
    res = res.filter(n => !ary.includes(n))
    return res
  },

  differenceBy: function(array, ...values) {
    let tostring = Object.prototype.toString
    let lastatt = arguments[arguments.length - 1]
    let ary = []
    let res = array.slice()
    if(tostring.call(lastatt ) != '[object Array]'){
      for (let i = 1; i < arguments.length - 1; i++) {
        for(let j = 0; j < arguments[i].length ; j++)
          ary.push(arguments[i][j])
      }
      if(tostring.call(lastatt) == '[object Function]'){
        for (let i = 0; i < ary.length; i++) {
          res = res.filter(n => lastatt(n) != lastatt(ary[i]))
        }
      }else if(tostring.call(lastatt) == '[object String]') {
        for (let i = 0; i < ary.length; i++) {
          res = res.filter(n => {
            return n[lastatt] != ary[i][lastatt] ? true : false
          })
        }
      }
      return res
    }else {
      return this.difference(array, ...values)
    }
  },
  /**
   * Creates a slice of array with n elements dropped from the beginning.
   *
   * @param   {[Array]}  array  [array The array to query.]
   * @param   {[Number]}  n      [n The number of elements to drop]
   *
   * @return  {[Array]}         [return the slice of array]
   */
  drop: function(array, n = 1) {
    if (n >= array.length) {
      return []
    }else {
      return array.slice(n)
    }
  },
  /**
   * Creates a slice of array with n elements dropped from the end
   *
   * @param   {Array}  array  [array the array to query]
   * @param   {Number}  n      [n the number of elements to drop]
   *
   * @return  {Array}         [return the slice of array]
   */
  dropRight: function(array, n = 1) {
    let x = array.length - n
    if(x <= 0) {
      return []
    } else {
      return array.slice(0, x)
    }
  },
  isArray: function(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
  },
  isString: function(value) {
    return Object.prototype.toString.call(value) == '[object String]'
  },
  isFunction: function(value) {
    return Object.prototype.toString.call(value) == '[object Function]'
  },
  isNumber: function(value) {
    return Object.prototype.toString.call(value) == '[object Number]'
  },
  isObject: function(value) {
    return Object.prototype.toString.call(value) == '[object Object]'
  },
  isNull: function(value) {
    return Object.prototype.toString.call(value) == '[object Null]'
  },
  isUndefined: function(value) {
    return value === undefined
  },
  isNaN: function(value) {
    return value.toString() === 'NaN'
  },
  
}
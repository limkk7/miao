var versionlin7 = {
  tostring: function(value){
    return Object.prototype.toString.call(value)
  },
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

  differenceWith(array, ...value)  {
    let lastatt = arguments[arguments.length - 1]
    let ary = []
    let res = array.slice()
    for (let i = 1; i < arguments.length - 1; i++) {
        ary.push(...arguments[i])
    }
    for (let i = 0; i < ary.length; i++) {
      res = res.filter(n => !lastatt(n, ary[i]))
    }
    return res
  },

  differenceBy: function(array, ...value) {
    let lastatt = arguments[arguments.length - 1]
    let ary = []
    let res = array.slice()
    if(this.tostring(lastatt ) != '[object Array]'){
      for (let i = 1; i < arguments.length - 1; i++) {
          ary.push(...arguments[i])
      }
      if(this.tostring(lastatt) == '[object Function]'){
        for (let i = 0; i < ary.length; i++) {
          res = res.filter(n => lastatt(n) != lastatt(ary[i]))
        }
      }else if(this.tostring(lastatt) == '[object String]') {
        for (let i = 0; i < ary.length; i++) {
          res = res.filter(n => {
            return n[lastatt] != ary[i][lastatt] ? true : false
          })
        }
      }
      return res
    }else {
      return this.difference(array, ...value)
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
  dropRightWhile: function(array, predicate){
    return this.reverse(this.dropWhile(this.reverse(array), predicate))
  }, 
  /**
   * [dropWhile description]
   *
   * @param   {[type]}  array      [array description]
   * @param   {[type]}  predicate  [predicate description]
   *
   * @return  {[type]}             [return description]
   */
  dropWhile: function(array, predicate) {
    if(this.isFunction(predicate)){
      for(let i = 0; i < array.length; i++) {
        if(!predicate(array[i])){
          return array.slice(i)
        }
      }
    }
    if(this.isArray(predicate)) {
      for(let i = 0; i < array.length; i++) {
        if(array[i][predicate[0]] != predicate[1]){
          return array.slice(i)
        }
      }
    }
    if(this.isString(predicate)) {
      for(let i = 0; i < array.length; i++) {
        if(!array[i][predicate]){
          return array.slice(i)
        }
      }
    } 
    if(this.isobject(predicate)) {
      for(let i = 0; i < array.length;i++) {
        if(!this.objectCompare(array[i], predicate)){
          return array.slice(i)
        }
      }
    }
  },

  fill:function(array, value, start = 0, end = array.length){
    for(let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  reverse: function(array) {
    let ary = []
    for(let i = array.length - 1; i >= 0; i--) {
      ary.push(array[i])
    }
    return ary
  },
  objectCompare: function(obj1, obj2) {
    let a = Object.keys(obj1)
    let b = Object.keys(obj2)
    if(a.length != b.length) {
      return false;
    }
    for(let i = 0; i < a.length; i++) {
      let t1 = obj1[a[i]]
      let t2 = obj2[b[i]]
      //判断键是否相同
      // if(this.isObject(a[i])){
      //   if(!this.objectCompare(a[i], b[i])){
      //     return false
      //   }
      // }
      // if(a[i] != b[i]){
      //   return false
      // }
      if(this.isobject(t1) && this.isobject(t2) ){//isobject只判断对象
        if(this.objectCompare(t1, t2)) {
          continue
        }else {
          return false;
        }
      }else if(this.isFunction(t1) && this.isFunction(t2)) { //isObject 判断数组和函数
        if(t1.toString() == t2.toString()){
          continue
        }else {
          return false
        }
      }else if(this.isArray(t1) && this.isArray(t2)) {//判断数组
        if(t1.toString() == t2.toString()) {
          if(t1.toString().includes('[object Object]')) {
            for(let i = 0; i < t1.length; i++) {
              if(this.isObject(t1[i])){
                if(this.objectCompare(t1[i], t2[i])){
                  continue
                }else {
                  return false
                }
              }
            }
          }
          continue
        }else {
          return false
        } 
      }
      if( a[i] != b[i] || t1 != t2){
        return false
      }
    }
    return true;
  },
  isArray: function(value) {
    return this.tostring(value) == '[object Array]'
  },
  isString: function(value) {
    return this.tostring(value) == '[object String]'
  },
  isFunction: function(value) {
    return this.tostring(value) == '[object Function]'
  },
  isNumber: function(value) {
    return this.tostring(value) == '[object Number]'
  },
  isObject: function(value) {
    let type = typeof(value)
    return value != null && (type == 'object' || type == 'function')
  },
  isobject: function(value) {
    return this.tostring(value) == '[object Object]'
  },
  isNull: function(value) {
    return this.tostring(value) == '[object Null]'
  },
  isUndefined: function(value) {
    return value === undefined
  },
  isNaN: function(value) {
    if(this.isUndefined(value) || this.isNull(value)) return false
    return value.toString() === 'NaN'
  },
  
}
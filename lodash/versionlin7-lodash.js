var versionlin7 = {
  tostring: function(value){
    return Object.prototype.toString.call(value)
  },
  //创建一个元素数组，这些元素按大小的长度分成组。如果数组不能被平均分割，最后的块将是剩余的元素。
  chunk: function(ary, size = 1) {
    let array = []
    for (let i = 0; i < ary.length; i += size){
      array.push(ary.slice(i, i + size))
    }
    return array
  },
  //创建一个删除所有falsey值的数组。值false、null、0、""、undefined和NaN是falsey。
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

  findIndex: function(ary, predicate = it => it, fromIdx = 0) {
    let array = ary.slice()
    if(this.isobject(predicate)) {
      for(let i = fromIdx; i < array.length; i++) {
          if(this.objectCompare(array[i], predicate)){
          return i
          }
      }
      return -1
    }else if(this.isFunction(predicate)) {
      for(let i = fromIdx; i < array.length; i++) {
        if(predicate(array[i])) {
          return i
        }
      }
      return - 1
    }else if(this.isArray(predicate)) {
      for(let i = fromIdx; i < array.length; i++) {
        if(array[i][predicate[0]] == predicate[1]) {
          return i
        }
      }
      return -1
    }else if(this.isString(predicate)) {
      for(let i = fromIdx; i < array.length; i++) {
        if(array[i][predicate] || array[i] == predicate) {
          return i
        }
      }
      return -1
    }else if(this.isNaN(predicate)){
      for(let i = fromIdx; i < array.length; i++) {
        if(this.isNaN(array[i])) {
          return i
        }
      }
      return -1
    }else {
      predicate = this.boolInArray(predicate)
      for(let i = fromIdx; i < array.length; i++) {
        array[i] = this.boolInArray(array[i])
        if(array[i] === predicate) {
          return i
        }
      }
      return -1
    }
  },

  findLastIndex: function(array, predicate = it => it, fromIdx = array.length - 1) {
    let j = array.length - 1 - fromIdx
    let i = this.findIndex(this.reverse(array), predicate, j)
    return i == -1 ? -1 : array.length - 1 - i
  },

  flatten: function(array) {
    return [].concat(...array)
  },
  flattenDeep: function(array) {
    var res = []
    for(let i = 0; i < array.length; i++) {
      if(this.isArray(array[i])) {
        res = res.concat(this.flattenDeep(array[i]))
      }else {
        res.push(array[i])
      }
    }
    return res
  },
  flattenDepth: function(array, depth = 1) {
    for(let i = 0; i < depth; i++) {
      array = this.flatten(array)
    }
    return array
  },
//为对象创建自己的可枚举字符串keyed-value对数组，该数组可由. frompairs使用。如果对象是映射或集合，则返回其条目。
  toPairs: function(obj) {
    let res = []
    let kary = Object.keys(obj)
    for(let i = 0; i < kary.length; i++) {
      res.push([kary[i], obj[kary[i]]])
    }
    return res
  },
//toPairs的逆函数;返回由键值对组成的对象。
  fromPairs: function(array) {
    let obj = {}
    for(let i = 0; i < array.length; i++) {
      obj[array[i][0]] = array[i][1]
    }
    return obj
  },

  head: function(array) {
    return array[0]
  },
/**
 *获取数组中第一次出现值的索引，该索引使用SameValueZero进行相等比较。如果fromIndex是负数，则它用作数组末尾的偏移量。
 *
 * @param   {Array}  array      [target array]
 * @param   {number}  value      [search target value]
 * @param   {number}  fromIndex  [start index]
 *
 * @return  {number}             return index
 */
  indexOf: function(array, value, fromIndex = 0) {
    if(fromIndex >= 0) {
      for(let i = fromIndex; i < array.length; i++) {
        if(array[i] == value) {
          return i
        }
      }
      return -1
    }else {
      for(let i = array.length + fromIndex; i >= 0; i--) {
        if(array[i] == value) {
          return i
        }
      }
      return -1
    }
  },
/**
 * 获取数组中除最后一个元素外的所有元素。
 *
 * @param   {[type]}  array  [target array]
 *
 * @return  {[type]}         [return new array]
 */
  initial: function(array) {
    return array.slice(0, array.length - 1)
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
/**
 * 判断数组中bool类型的值并进行字符串化
 *
 * @param   {[type]}  value  [value description]
 *
 * @return  {[type]}         [return description]
 */
  boolInArray: function(value) {
    if(this.isBoolean(value)) {
      if(value | 0) {
        return 'true'
      }else {
        return 'false'
      }
    }
    return value
  },
  isArray: function(value) {
    return this.tostring(value) == '[object Array]'
  },
  isBoolean: function(value) {
    return this.tostring(value) == '[object Boolean]'
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
    return this.tostring(value) == '[object Undefined]'
  },
  isNaN: function(value) {
    if(this.isUndefined(value) || this.isNull(value)) return false
    return value.toString() === 'NaN'
  },
  
}
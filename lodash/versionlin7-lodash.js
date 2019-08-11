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
  //带With和By的函数重写
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
    let res = array.slice()
    value = [].concat(...value)
    res = res.filter(n => !value.includes(n))
    return res
  },

  differenceWith: function(array, value, comparator)  {
    return array.filter(val => {
      for(let v of value) {
        if(comparator(v, val)){
          return false
        }
      }
      return true
    })
  },
  // loop: function(ary, val) {
  //   return (func)=>{
  //     let res = []
  //     for(let i = 0; i < ary.length; i++) {
  //       let flag = true
  //       for(let j = 0; j < val.length; j++) {
  //         if(func(ary[i], val[j])) {
  //           flag = false
  //           break
  //         }
  //       }
  //       if(flag) res.push(ary[i])
  //     }
  //     return res
  //   }
  // },
  differenceBy: function(array, ...value) {
    if(this.isArray(value[value.length - 1])){
      return this.difference(array, ...value)
    }
    let predicate = value.pop()
    predicate = this.iteratee(predicate)
    value = [].concat(...value)
    return array.filter((val) => {
      return !value.map((v) => predicate(v)).includes(predicate(val))
    })
    //return this.loop(array, value)((a,b) => this.sameValueZero(predicate(a),predicate(b)))
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
    predicate = this.iteratee(predicate)
    for(let i = 0; i < array.length; i++) {
      if(!predicate(array[i])){
        return array.slice(i)
      }
    }
    return array.slice(0)
  },

  fill:function(array, value, start = 0, end = array.length){
    for(let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  },

  findIndex: function(ary, predicate = it => it, fromIdx = 0) {
    let array = ary.slice()
    predicate = this.iteratee(predicate)
    for(let i = fromIdx; i < array.length; i++) {
      if(predicate(array[i])) {
        return i
      }
    }
    return -1
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
//为对象创建自己的可枚举字符串keyed-value对数己的可枚举字符串keyed-value对数组，该数组可由. frompairs使用。如果对象是映射或集合，则返回其条目。
  toPairs: function(obj) {
    let res = []
    let key = Object.keys(obj)
    for(let i = 0; i < key.length; i++) {
      res.push([key[i], obj[key[i]]])
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
        if(this.sameValueZero(array[i], value)) {
          return i
        }
      }
      return -1
    }else {
      for(let i = array.length + fromIndex; i >= 0; i--) {
        if(this.sameValueZero(array[i], value)) {
          return i
        }
      }
      return 1
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

  /**
   * 创建一个包含在所有给定数组中的惟一值的数组，用于相等比较。结果值的顺序和引用由第一个数组决定。
   *
   * @param   {[...array]}  ...array  a series array
   *
   * @return  {[array]}            new array
   */
  intersection: function(...array) {
    let res = []
    for(let i = 0; i < array[0].length; i++) {
      for(let j = 1; j < array.length; j++) {
        if(array[j].includes(array[0][i])) {
          res.push(array[0][i])
          break;
        }
      }
    }
    return res
  },
/**
 * 这个方法接受iteratee，它为每个数组的每个元素调用iteratee来生成比较它们的标准。结果值的顺序和引用由第一个数组决定。
 *
 * @param   {array}  ...arrays  targer array and compare array and iteratee
 *
 * @return  {array}             new array
 */
  intersectionBy: function(array,...arrays) {
    if(this.isArray(arrays[arrays.length - 1])){
      return this.intersection(array, ...arrays)
    }
    arrays = [].concat(...arrays)
    var iteratee = this.iteratee(arrays.pop())
      return array.filter((val) => {
        return arrays.map(it => iteratee(it)).includes(iteratee(val))
      })
  },
/**
 * 类似于_.intersection，接受比较器，比较器被调用以比较数组的元素。结果值的顺序和引用由第一个数组确定。
 *
 * @param   {[type]}  array      [array description]
 * @param   {[type]}  ...arrays  [...arrays description]
 *
 * @return  {[type]}             [return description]
 */
  intersectionWith: function(array, ...arrays) {
    arrays = [].concat(...arrays)
    let comparator = arrays.pop()
    return array.filter(val => {
      for(let i = 0; i < arrays.length; i++) {
        if(comparator(val, arrays[i])){
          return true;
        }
      }
    })
  },

  join: function(array, separator = ',') {
    let str = ''
    var i
    for(i = 0; i < array.length - 1; i++) {
      str += array[i] +''+ separator
    }
    str += array[i]
    return str
  },
  /**
   * 获得数组的最后一个元素
   *
   * @param   {Array}  array  the array to query
   *
   * @return  {*}         last element of array
   */
  last:function(array) {
    return array[array.length - 1]
  },
/**
 * 从后往前扫描数组返回值相等的数组下标
 *
 * @param   {array}  array      [array to inspect]
 * @param   {*}  value      [value to search for]
 * @param   {number}  fromIndex  [the index to search from]
 *
 * @return  {number}             [return index of the matched value, else -1]
 */
  lastIndexOf: function(array, value, fromIndex = array.length - 1) {
    for(let i = fromIndex; i >= 0; i--) {
      if(this.sameValueZero(array[i], value)){
        return i
      }
    }
    return -1
  },
//返回数组第n个值
  nth: function(array, n = 0) {
    if(n >= 0) {
      return array[n]
    }else {
      return array[array.length + n]
    }
  },
  /**
   * 移除数组中与给定值相同的元素后，修改原数组返回
   *
   * @param   {array}  array      array to modify
   * @param   {...*}  ...values  values to remove
   *
   * @return  {array}             returns array
   */
  pull: function(array, ...values) {
    for(let i = 0; i < array.length; ) {
      if(values.includes(array[i])){
        array.splice(i, 1)
      }else {
        i++
      }
    }
    return array
  },
  /**
   * 移除数组中与给定数组中相同的元素后，修改原数组返回
   *
   * @param   {array}  array  [array to modify]
   * @param   {array}  value  [value to remove]
   *
   * @return  {array}         [return array]
   */
  pullAll: function(array, value = []) {
    for(let i = 0; i < array.length;) {
      if(value.includes(array[i])) {
        array.splice(i, 1)
      }else {
        i++
      }
    }
    return array
  },
  /**
   * 筛选留下array和value中含有iteratee属性的对象元素，然后去除array中与value相同属性值的元素
   * 对象数组中的指定对象，返回修改后的数组
   *不修改value数组
   * @param   {array[object]}  array     array to modify
   * @param   {array[object]}  value     value to remove
   * @param   {string}  iteratee  [target object elements]
   *
   * @return  {array}            [return array]
   */
  pullAllBy: function(array, value, iteratee) {
    iteratee = this.iteratee(iteratee)
    if(!array || !value) {
      return array
    }
    for(let i = 0; i < array.length;) {
      if(value.map(val => iteratee(val)).includes(iteratee(array[i]))) {
        array.splice(i, 1)
      }else{
        i++
      }
    }
    return array
  },
/**
 * 对array和value调用comparator进行比较，相等则删除array中对应的元素
 *
 * @param   {array}  array       array to modify
 * @param   {array}  value       value to remove
 * @param   {function}  comparator  function
 *
 * @return  {array}              return array
 */
  pullAllWith: function(array, value, comparator) {
    for(let i = 0; i < array.length; ) {
      let flag = false
      for(let v of value) {
        if(comparator(array[i], v)){
          array.splice(i, 1)
          flag = true
          break;
        }
      }
      if(flag) {
        continue
      }else {
        i++
      }
    }
    return array
  },
  /**
   *反转数组
   *
   * @param   {[array]}  array  [array description]
   *
   * @return  {[array]}         [return new array]
   */
  reverse: function(array) {
    let ary = []
    for(let i = array.length - 1; i >= 0; i--) {
      ary.push(array[i])
    }
    return ary
  },
/**
 * 向一个有序数组中插入一个value，返回这个值插入之后的有序位置。（使用二分查找）
 *不修改原数组
 * @param   {array}  array  [ The sorted array to inspect.]
 * @param   {*}  value  [target value]
 *
 * @return  {number}         [Returns the index at which value should be inserted into array.]
 */
  sortedIndex: function(array, value) {
    let left = 0, right = array.length
    while (left < right) {
      let mid = left + Math.floor((right - left) / 2)
      if (array[mid] < value) left = mid + 1
      else right = mid;
    }
    return right;
  },
/**
 * 迭代器iteratee迭代每个元素值计算它们的值
 * 这个迭代器调用一个参数value。返回应该被插入后的数组下标。使用二分查找
 *
 * @param   {array}  array     [array description]
 * @param   {*}  value     [value description]
 * @param   {function}  iteratee  [iteratee description]
 *
 * @return  {number}            [Returns the index at which value should be inserted into array.]
 */
  sortedIndexBy: function(array, value, iteratee) {
    let left = 0, right = array.length
    iteratee = this.iteratee(iteratee)
      while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if(iteratee(array[mid]) < iteratee(value)) left = mid + 1
        else right = mid
      }
      return right
  },
  /**
   * 在有序数组中使用二分查找目标值找不到返回-1不插入
   * 带indexOf的都采用sameValueZero比较
   *
   * @param   {array}  array  [sorted array to inspect]
   * @param   {*}  value  [value to search for]
   *
   * @return  {[number]}         [return the index of the matched value, else -1]
   */
  sortedIndexOf: function(array, value) {
    let left = 0, right = array.length;
    while(left < right) {
      let mid = left + Math.floor((right - left) / 2)
      if(array[mid] < value) left = mid + 1
      else right = mid
    }
    return this.sameValueZero(array[right], value) ? right : -1
  },
  sortedLastIndex: function(array, value) {
    let left = 0, right = array.length;
    while(left < right) {
      let mid = left + Math.floor((right - left) / 2)
      if(array[mid] <= value) left = mid + 1
      else right = mid
    }
    return right
  },
  sortedLastIndexBy: function(array, value, iteratee) {
    let left = 0, right = array.length;
    iteratee = this.iteratee(iteratee)
      while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if(iteratee(array[mid]) <= iteratee(value)) left = mid + 1
        else right = mid
      }
      return right
  },
  sortedLastIndexOf: function(array, value) {
    let left = 0, right = array.length;
    while(left < right) {
      let mid = left + Math.floor((right - left) / 2);
      if(array[mid] <= value) left = mid + 1
      else right = mid
    }
    return this.sameValueZero(array[right - 1], value) ? right - 1 : -1
  },
  /**
   * 返回新的去重有序数组，使用sameValueZero验证
   *
   * @param   {array}  array  [array to inspect]
   *
   * @return  {array}         [return new duplicate free array]
   */
  sortedUniq: function(array) {
    let res = [array[0]]
    for(let i = 1; i < array.length; i++) {
      if(!this.sameValueZero(array[i], array[i - 1])){
        res.push(array[i])
      }
    }
    return res
  },
  sortedUniqBy: function(array, iteratee) {
    let res = [array[0]]
    iteratee = this.iteratee(iteratee)
    for(let i = 1; i < array.length; i++) {
      if(!this.sameValueZero(iteratee(array[i - 1]), iteratee(array[i]))){
        res.push(array[i])
      }
    }
    return res
  },
  tail: function(array) {
    return array.slice(1)
  },
  take: function(array, n = 1) {
    return array.slice(0, n)
  },
  takeRight: function(array, n = 1) {
    if(n >= array.length) return array.slice()
    return array.slice(array.length - n)
  },
  //从array开头开始分割数组，不过是通过predicate控制，直到返回falsey停止。
  takeRightWhile: function(array, predicate) {
    return this.reverse(this.takeWhile(this.reverse(array), predicate))
  },
  takeWhile: function(array, predicate) {
    predicate = this.iteratee(predicate)
    for(let i = 0; i < array.length; i++) {
      if(!predicate(array[i])){
        return array.slice(0, i)
      }
    }
    return array.slice(0)
  },
  /**
   * 将多个数组中的值进行去重放入新的数组中
   * 
   *
   * @param   {...array}  ...array  the arrays to inspect
   *
   * @return  {array}            return the new array of combined values
   */
  union: function(...array) {
    return Array.from(new Set([].concat(...array)))
  },
  unionBy: function(...array) {
    let iteratee = array.pop()
    iteratee = this.iteratee(iteratee)
    array = [].concat(...array)
    let set = new Set()
    let res = []
      for(let val of array) {
        if(!set.has(iteratee(val))){
          set.add(iteratee(val))
          res.push(val)
        }
      }
    return res
  },
  unionWith: function(...array) {
    let comparator = array.pop()
    array = [].concat(...array)
    let res = []
    for(let i = 0; i < array.length; i++) {
      let flag = true
      for(let val of res) {
        if(comparator(val, array[i])){
          flag = false
          break
        }
      }
      if(flag) res.push(array[i])
    }
    return res
  },
  //根据sameValueZero进行数组去重
  uniq: function(array) {
    let res = []
    for(let i = 0; i < array.length; i++) {
      if(!res.includes(array[i])) {
        res.push(array[i])
      }
    }
    return res
  },
  uniqBy:function(array, iteratee) {
    let set = new Set()
    iteratee = this.iteratee(iteratee)
    let res = []
      for(let val of array) {
        if(!set.has(iteratee(val))){
          set.add(iteratee(val))
          res.push(val)
        }
      }
    return res
  },
  uniqWith:function(array, comparator) {
    let res = []
    for(let i = 0; i < array.length; i++) {
      let flag = true
      for(let val of res) {
        if(comparator(val, array[i])){
          flag = false
          break
        }
      }
      if(flag) res.push(array[i])
    }
    return res
  },
  unzip: function(array) {
    if(arguments.length > 1) return []
    let maxLen = 0
    let res = []
    for(let val of array) {
      if(val.length > maxLen) {
        maxLen = val.length
      }
    }
    for(let i = 0; i < maxLen; i++) {
      res.push([])
      for(let j = 0; j < array.length; j++) {
        res[i].push(array[j][i])
      }
    }
    return res
    // return this.zip(...array)
  },
  unzipWith: function(array, iteratee) {
    if(!this.isFunction(iteratee)){
      return unzip(array)
    }
    let res = []
    let maxLen = array[0].length
    for(let val of array) {
      if(val.length > maxLen){
        maxLen = val.length
      }
    }
    for(let i = 0; i < maxLen; i++) {
      let a = iteratee
      for(let j = 0; j < array.length; j++) {
        let x = array[j][i]
        if(x == undefined) x = 0
        a = a.bind(null, x) 
      }
      res.push(a())
    }
    return res
  },
  /**
   * zip(['a'], [1,3,4], [true, false]);
   * return [["a", 1, true], [undefined, 3, false], [undefined, 4, undefined]]
   *
   * @param   {...array}  ...array  [...array description]
   *
   * @return  {[...array]}            [return description]
   */
  zip: function(...array) {
    let res = []
    let maxLen = array[0].length
    for(let val of array) {
      if(val.length > maxLen){
        maxLen = val.length
      }
    }
    // let res = new Array(maxLen).fill([])当fill的是对象时修改一个改变全部
    for(let i = 0; i < array.length; i++) {
      for(let j = 0; j < maxLen; j++){
        if(res[j] == undefined) {
          res.push([])
        }
        res[j].push(array[i][j])
      }
    }
    return res
  },
  zipWith: function(...array) {
    if(!this.isFunction(array[array.length -1])) {
      return this.zip(...array)
    }
    let iteratee = array.pop()
    let res = []
    for(let i = 0; i < array[0].length; i++) {
      let a = iteratee
      for(let j = 0; j < array.length; j++) {
      //   a = a.bind(null, array[j][i])
      // }
      // res.push(a())
        if(!this.isFunction(a)) break 
        a = this.curry(a)(array[j][i])
      }
      res.push(a)
    }
    return res
  },
  without: function(array,...value) {
    let ary = array.slice()
    for(let i = 0; i < ary.length;) {
      if(value.includes(ary[i])){
        ary.splice(i, 1)
      }else {
        i++
      }
    }
    return ary
  },
  xor: function(...array){
    var a = []
    for(var ary of array) {
      var a = a.concat(this.uniq(ary))
    }
    return Array.from(new Set(a))
  },
  //Util#############################################################################################################
  curry: function(f, len = f.length) {
      return (...args) =>{
        if(args.length >= len) {
          return f(...args)
        }else {
          return this.curry(f.bind(this, ...args), len - args.length)
        }
      }
  },
  //将对象路径字符串转为数组
  toPath: function(str) {
    return str.split(/\.|\[|\]./g)
  },
  //获得对象目标深度的值
  get: function(obj, Path, defaultValue = null) {
    if(this.isArray(Path)){
      for(let p of Path){
        if(this.isUndefined(obj)){
          return defaultValue
        }
        obj = obj[p]
      }
      return obj
    }else {
      let path = this.toPath(Path)
      for(let i = 0; i < path.length; i++) {
        if(this.isUndefined(obj)){
          return defaultValue
        }
        obj = obj[path[i]]
      }
      return obj
    }
  },
  matchesProperty: function(Path, value) {
    return (obj) => {
      return this.isEqual(this.get(obj, Path), value)
    }
  },
  Property: function(Path) {
    return (obj) => {
      return this.get(obj, Path)
    }
  },
  iteratee: function(predicate) {
    if(this.isArray(predicate)){
      return this.matchesProperty(predicate[0], predicate[1])
    }else if(this.isString(predicate)){
      return this.Property(predicate)
    }else if(this.isobject(predicate)){
      return this.matches(predicate)
    }else {
      return predicate
    }
  },
  // equal1: function(a,b){return this.isEqual(a,b)},//this == versionlin7
  // equal2: function(){return (a,b) => this.isEqual(a,b)},//this == versionlin7
  // equal3: (a,b)=> this.isEqual(a,b),//this == window
  //返回对象部分匹配函数
  // matches : (src) => versionlin7.bind(versionlin7.isMatch, versionlin7, window, src), //"this.bind is not a function"
  // matches: function(source) {
  //   return this.bind(this.isMatch, this,window, source)
  // },
  matches: function(source) {
    return (obj) =>{
      return this.isMatch(obj,source)
    }
  },
  // matches: function(source) {
  //   let a = this
  //   return function(obj) {
  //     return a.isMatch(obj,source)
  //   }
  // },
  //参数绑定函数
  bind: function(f, thisArg, ...fixedArgs){
    return function(...args){
      var actualArgs = [...fixedArgs]
      for(let i = 0; i < actualArgs.length; i++) {
          if(actualArgs[i] === window) {
              actualArgs[i] = args.shift()
            }
          }
      actualArgs.push(...args)
      return f.apply(thisArg, actualArgs)
    }
  },
// versionlin7.matches({x:1})({x:2})
  // matches: function(source) {
  //   return this.bind(this.isMatch, window, source)
  // },
  // bind: function(f,...fixedArgs){
  // return function(...args){
  //   return (...args) => {
  //     var actualArgs = [...fixedArgs]
  //     for(let i = 0; i < actualArgs.length; i++) {
  //       if(actualArgs[i] === window) {
  //         actualArgs[i] = args.shift()
  //       }
  //     }
  //     actualArgs.push(...args)
  //     return f.apply(this, actualArgs)
  //   }
  // },
  //对象部分匹配
  
  isMatch: function(obj, source) {
    for(let key in source) {
      if(!this.isEqual(obj[key], source[key])){
        return false
      }
    }
    return true
  },
  //深对比SameValueZero
  isEqual: function(n1, n2) {
    if(this.isFunction(n1) && this.isFunction(n2)){
      return t1.toString() == t2.toString()
    }else if(this.isObject(n1) && this.isObject(n2)) {
      return this.ObjectCompare(n1,n2)
    }else {
      return this.sameValueZero(n1,n2)
    }
  },
/**
 * 对象深对比
 * @param   {object}  obj1  [obj1 description]
 * @param   {object}  obj2   [obj description]
 *
 * @return  {boolean}        [return description]
 */
  ObjectCompare: function(obj1, obj2) {
    let a = Object.keys(obj1)
    let b = Object.keys(obj2)
    if(a.length != b.length) {
      return false;
    }
    for(let i = 0; i < a.length; i++) {
      let t1 = obj1[a[i]]
      let t2 = obj2[a[i]]
      if(this.isFunction(t1) && this.isFunction(t2)){
        if(t1.toString() == t2.toString()){
          continue
        }else {
          return false
        }
      }else if(this.isObject(t1) && this.isObject(t2)) {
        if(this.ObjectCompare(t1,t2)){
          continue
        }else {
          return false
        }
      }else {
         if(this.sameValueZero(t1,t2)){
           continue
         }else {
           return false
         }
      }
      // if(this.isobject(t1) && this.isobject(t2) ){//isobject只判断对象
      //   if(this.ObjectCompare(t1, t2)) {
      //     continue
      //   }else {
      //     return false;
      //   }
      // }else if(this.isFunction(t1) && this.isFunction(t2)) { //isObject 判断数组和函数
      //   if(t1.toString() == t2.toString()){
      //     continue
      //   }else {
      //     return false
      //   }
      // }else if(this.isArray(t1) && this.isArray(t2)) {//判断数组
      //   if(t1.toString() == t2.toString()) {
      //     if(t1.toString().includes('[object Object]')) {
      //       for(let i = 0; i < t1.length; i++) {
      //         if(this.isObject(t1[i])){
      //           if(this.ObjectCompare(t1[i], t2[i])){
      //             continue
      //           }else {
      //             return false
      //           }
      //         }
      //       }
      //     }
      //     continue
      //   }else {
      //     return false
      //   } 
      // }
      // if(t1 != t2){
      //   return false
      // }
    }
    return true;
  },
/**
 * +-0相等NaN和NaN相等，不同类型不相等；
 *
 * @param   {*}  x  [x description]
 * @param   {*}  y  [y description]
 *
 * @return  {boolean}     [return description]
 */
  sameValueZero: function(x, y) {
    if(Object.is(x, y)){//+-0不相等 NaN相等
      return true
    }else if(x === y){//NaN不相等 +-0相等
      return true
    }
    return false
  },
  //数组值交换
  arySwap: function(ary, a, b) {
    let tmp = ary[a]
    ary [a] = ary[b]
    ary[b] = tmp
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
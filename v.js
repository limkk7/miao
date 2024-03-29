var v = function(){
  function tostring(value){
    return Object.prototype.toString.call(value)
  }
  //创建一个元素数组，这些元素按大小的长度分成组。如果数组不能被平均分割，最后的块将是剩余的元素。
  function chunk(ary, size = 1) {
    let array = []
    for (let i = 0; i < ary.length; i += size){
      array.push(ary.slice(i, i + size))
    }
    return array
  }
  //创建一个删除所有falsey值的数组。值false、null、0、""、undefined和NaN是falsey。
  function compact(ary) {
    return ary.filter(it => it)
  }
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
  function difference(array, ...value) {
    let ary = []
    let res = array.slice()
    for (let i = 1; i < arguments.length; i++) {
      for(let j = 0; j < arguments[i].length ; j++)
        ary.push(arguments[i][j])
    }
    res = res.filter(n => !ary.includes(n))
    return res
  }

  function differenceWith(array, value, comparator)  {
    let res = []
    for(let ary of array) {
      let flag = true
      for(let val of value) {
        if(comparator(ary, val)) {
          flag = false
          break
        }
      }
      if(flag) res.push(ary)
    }
    return res
  }

  function differenceBy(array, ...value) {
    let predicate = value.pop()
    predicate = this.iteratee(predicate)
    value = [].concat(...value)
    let res = []
    for(let ary of array) {
      let flag = true
      for(let val of value) {
        if(this.sameValueZero(predicate(ary), predicate(val))){
          flag = false
          break
        }
      }
      if(flag) res.push(ary)
    }
    return res
  }
  /**
   * Creates a slice of array with n elements dropped from the beginning.
   *
   * @param   {[Array]}  array  [array The array to query.]
   * @param   {[Number]}  n      [n The number of elements to drop]
   *
   * @return  {[Array]}         [return the slice of array]
   */
  function drop(array, n = 1) {
    if (n >= array.length) {
      return []
    }else {
      return array.slice(n)
    }
  }
  /**
   * Creates a slice of array with n elements dropped from the end
   *
   * @param   {Array}  array  [array the array to query]
   * @param   {Number}  n      [n the number of elements to drop]
   *
   * @return  {Array}         [return the slice of array]
   */
  function dropRight(array, n = 1) {
    let x = array.length - n
    if(x <= 0) {
      return []
    } else {
      return array.slice(0, x)
    }
  }
  function dropRightWhile(array, predicate){
    return this.reverse(this.dropWhile(this.reverse(array), predicate))
  }
  /**
   * [dropWhile description]
   *
   * @param   {[type]}  array      [array description]
   * @param   {[type]}  predicate  [predicate description]
   *
   * @return  {[type]}             [return description]
   */
  function dropWhile(array, predicate) {
    predicate = this.iteratee(predicate)
    for(let i = 0; i < array.length; i++) {
      if(!predicate(array[i])){
        return array.slice(i)
      }
    }
    return array.slice(0)
  }

  function fill (array, value, start = 0, end = array.length){
    for(let i = start; i < end; i++) {
      array[i] = value
    }
    return array
  }  

  function findIndex(ary, predicate = it => it, fromIdx = 0) {
    let array = ary.slice()
    if(this.isobject(predicate)) {
      for(let i = fromIdx; i < array.length; i++) {
          if(this.ObjectCompare(array[i], predicate)){
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
  }

  function findLastIndex(array, predicate = it => it, fromIdx = array.length - 1) {
    let j = array.length - 1 - fromIdx
    let i = this.findIndex(this.reverse(array), predicate, j)
    return i == -1 ? -1 : array.length - 1 - i
   }

  function flatten(array) {
    return [].concat(...array)
  }  
  function flattenDeep(array) {
    var res = []
    for(let i = 0; i < array.length; i++) {
      if(this.isArray(array[i])) {
        res = res.concat(this.flattenDeep(array[i]))
      }else {
        res.push(array[i])
      }
    }
    return res
  }  
  function flattenDepth(array, depth = 1) {
    for(let i = 0; i < depth; i++) {
      array = this.flatten(array)
    }
    return array
  }  
//为对象创建自己的可枚举字符串keyed-value对数己的可枚举字符串keyed-value对数组，该数组可由. frompairs使用。如果对象是映射或集合，则返回其条目。
  function toPairs(obj) {
    let res = []
    let key = Object.keys(obj)
    for(let i = 0; i < key.length; i++) {
      res.push([key[i], obj[key[i]]])
    }
    return res
  }  
//toPairs的逆函数;返回由键值对组成的对象。
  function fromPairs(array) {
    let obj = {}
    for(let i = 0; i < array.length; i++) {
      obj[array[i][0]] = array[i][1]
    }
    return obj
  }  

  function head(array) {
    return array[0]
  }  
/**
 *获取数组中第一次出现值的索引，该索引使用SameValueZero进行相等比较。如果fromIndex是负数，则它用作数组末尾的偏移量。
 *
 * @param   {Array}  array      [target array]
 * @param   {number}  value      [search target value]
 * @param   {number}  fromIndex  [start index]
 *
 * @return  {number}             return index
 */
  function indexOf(array, value, fromIndex = 0) {
    if(fromIndex >= 0) {
      for(let i = fromIndex; i < array.length; i++) {
        if(sameValueZero(array[i], value)) {
          return i
        }
      }
      return -1
    }else {
      for(let i = array.length + fromIndex; i >= 0; i--) {
        if(sameValueZero(array[i], value)) {
          return i
        }
      }
      return 1
    }
  }  
/**
 * 获取数组中除最后一个元素外的所有元素。
 *
 * @param   {[type]}  array  [target array]
 *
 * @return  {[type]}         [return new array]
 */
  function initial(array) {
    return array.slice(0, array.length - 1)
  }  

  /**
   * 创建一个包含在所有给定数组中的惟一值的数组，用于相等比较。结果值的顺序和引用由第一个数组决定。
   *
   * @param   {[...array]}  ...array  a series array
   *
   * @return  {[array]}            new array
   */
  function intersection(...array) {
    let res = []
    for(let i = 0; i < arguments[0].length; i++) {
      for(let j = 1; j < arguments.length; j++) {
        if(arguments[j].includes(arguments[0][i])) {
          res.push(arguments[0][i])
          break;
        }
      }
    }
    return res
  }  
/**
 * 这个方法接受iteratee，它为每个数组的每个元素调用iteratee来生成比较它们的标准。结果值的顺序和引用由第一个数组决定。
 *
 * @param   {array}  ...arrays  targer array and compare array and iteratee
 *
 * @return  {array}             new array
 */
  function intersectionBy(array,...arrays) {
    arrays = [].concat(...arrays)
    var iteratee = arrays.pop()
    if(this.isFunction(iteratee)) {
      return array.filter((val) => {
        return arrays.map(it => iteratee(it)).includes(iteratee(val))})
    }else if(this.isString(iteratee)) {
      return array.filter((val) => {
        return arrays.map(it => it[iteratee]).includes(val[iteratee])
      })
    }
  }  
/**
 * 类似于_.intersection，接受比较器，比较器被调用以比较数组的元素。结果值的顺序和引用由第一个数组确定。
 *
 * @param   {[type]}  array      [array description]
 * @param   {[type]}  ...arrays  [...arrays description]
 *
 * @return  {[type]}             [return description]
 */
  function intersectionWith(array, ...arrays) {
    arrays = [].concat(...arrays)

    let comparator = arrays.pop()
    return array.filter(val => {
      for(let i = 0; i < arrays.length; i++) {
        if(comparator(val, arrays[i])){
          return true;
        }
      }
    })
  }  

  function join(array, separator = ',') {
    let str = ''
    var i
    for(i = 0; i < array.length - 1; i++) {
      str += array[i] +''+ separator
    }
    str += array[i]
    return str
  }  
  /**
   * 获得数组的最后一个元素
   *
   * @param   {Array}  array  the array to query
   *
   * @return  {*}         last element of array
   */
  function last(array) {
    return array[array.length - 1]
  }  
/**
 * 从后往前扫描数组返回值相等的数组下标
 *
 * @param   {array}  array      [array to inspect]
 * @param   {*}  value      [value to search for]
 * @param   {number}  fromIndex  [the index to search from]
 *
 * @return  {number}             [return index of the matched value, else -1]
 */
  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    for(let i = fromIndex; i >= 0; i--) {
      if(this.sameValueZero(array[i], value)){
        return i
      }
    }
    return -1
  }  
//返回数组第n个值
  function nth(array, n = 0) {
    if(n >= 0) {
      return array[n]
    }else {
      return array[array.length + n]
    }
  }  
  /**
   * 移除数组中与给定值相同的元素后，修改原数组返回
   *
   * @param   {array}  array      array to modify
   * @param   {...*}  ...values  values to remove
   *
   * @return  {array}             returns array
   */
  function pull(array, ...values) {
    for(let i = 0; i < array.length; ) {
      if(values.includes(array[i])){
        this.arySwap(array, i, array.length - 1)
        array.pop()
      }else {
        i++
      }
    }
    return array
  }  
  /**
   * 移除数组中与给定数组中相同的元素后，修改原数组返回
   *
   * @param   {array}  array  [array to modify]
   * @param   {array}  value  [value to remove]
   *
   * @return  {array}         [return array]
   */
  function pullAll(array, value = []) {
    for(let i = 0; i < array.length;) {
      if(value.includes(array[i])) {
        this.arySwap(array, i, array.length - 1)
        array.pop()
      }else {
        i++
      }
    }
    return array
  }  
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
  function pullAllBy(array, value, iteratee) {
    if(!array || !value) {
      return array
    }
    let val = value.filter(val => val.hasOwnProperty(iteratee))//筛选出含有iteratee属性的对象数组
    for(let i = 0; i < array.length;) {
      var flag = false
      if(!array[i].hasOwnProperty(iteratee)){//不含有iteratee属性的对象删除
        this.arySwap(array, i, array.length - 1)
        array.pop()
        continue
      }
      for(let v of val) {//比较array和value中的属性值，相同则删除
        if(this.sameValueZero(array[i][iteratee], v[iteratee])){
          array.splice(i, 1)
          flag = true
          break
        }
      }
      if(flag) {
        continue
      }else {
        i++
      }
    }
    return array
  }  
/**
 * 对array和value调用comparator进行比较，相等则删除array中对应的元素
 *
 * @param   {array}  array       array to modify
 * @param   {array}  value       value to remove
 * @param   {function}  comparator  function
 *
 * @return  {array}              return array
 */
  function pullAllWith(array, value, comparator) {
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
  }  
  /**
   *反转数组
   *
   * @param   {[array]}  array  [array description]
   *
   * @return  {[array]}         [return new array]
   */
  function reverse(array) {
    let ary = []
    for(let i = array.length - 1; i >= 0; i--) {
      ary.push(array[i])
    }
    return ary
  }  
/**
 * 向一个有序数组中插入一个value，返回这个值插入之后的有序位置。（使用二分查找）
 *不修改原数组
 * @param   {array}  array  [ The sorted array to inspect.]
 * @param   {*}  value  [target value]
 *
 * @return  {number}         [Returns the index at which value should be inserted into array.]
 */
  function sortedIndex(array, value) {
    let left = 0, right = array.length
    while (left < right) {
      let mid = left + Math.floor((right - left) / 2)
      if (array[mid] < value) left = mid + 1
      else right = mid;
    }
    return right;
  }  
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
  function sortedIndexBy(array, value, iteratee) {
    let left = 0, right = array.length
    if(this.isFunction(iteratee)) {
      while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if(iteratee(array[mid]) < iteratee(value)) left = mid + 1
        else right = mid
      }
      return right
    }else if(this.isString(iteratee)){
      while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if(array[mid][iteratee] < value[iteratee]) left = mid + 1
        else right = mid
      }
      return right
    }
  }  
  /**
   * 在有序数组中使用二分查找目标值
   * 带indexOf的都采用sameValueZero比较
   *
   * @param   {array}  array  [sorted array to inspect]
   * @param   {*}  value  [value to search for]
   *
   * @return  {[number]}         [return the index of the matched value, else -1]
   */
  function sortedIndexOf(array, value) {
    let left = 0, right = array.length;
    while(left < right) {
      let mid = left + Math.floor((right - left) / 2)
      if(array[mid] < value) left = mid + 1
      else right = mid
    }
    return this.sameValueZero(array[right], value) ? right : -1
  }  
  function sortedLastIndex(array, value) {
    let left = 0, right = array.length;
    while(left < right) {
      let mid = left + Math.floor((right - left) / 2)
      if(array[mid] <= value) left = mid + 1
      else right = mid
    }
    return right
  }  
  function sortedLastIndexBy(array, value, iteratee) {
    let left = 0, right = array.length;
    if(this.isFunction(iteratee)){
      while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if(iteratee(array[mid]) <= iteratee(value)) left = mid + 1
        else right = mid
      }
      return right
    }else if(this.isString(iteratee)){
      while(left < right) {
        let mid = left + Math.floor((right - left) / 2)
        if(array[mid][iteratee] <= value[iteratee]) left = mid + 1
        else right = mid
      }
      return right
    }
  }  
  function sortedLastIndexOf(array, value) {
    let left = 0, right = array.length;
    while(left < right) {
      let mid = left + Math.floor((right - left) / 2);
      if(array[mid] <= value) left = mid + 1
      else right = mid
    }
    return this.sameValueZero(array[right - 1], value) ? right - 1 : -1
  }  
  /**
   * 返回新的去重有序数组，使用sameValueZero验证
   *
   * @param   {array}  array  [array to inspect]
   *
   * @return  {array}         [return new duplicate free array]
   */
  function sortedUniq(array) {
    let res = [array[0]]
    for(let i = 1; i < array.length; i++) {
      if(!this.sameValueZero(array[i], array[i - 1])){
        res.push(array[i])
      }
    }
    return res
  }  
  function sortedUniqBy(array, iteratee) {
    let res = [array[0]]
    for(let i = 1; i < array.length; i++) {
      if(!this.sameValueZero(iteratee(array[i - 1]), iteratee(array[i]))){
        res.push(array[i])
      }
    }
    return res
  }  
  function tail(array) {
    return array.slice(1)
  }  
  function take(array, n = 1) {
    return array.slice(0, n)
  }  
  function takeRight(array, n = 1) {
    if(n >= array.length) return array.slice()
    return array.slice(array.length - n)
  }  
  //从array开头开始分割数组，不过是通过predicate控制，直到返回falsey停止。
  function takeRightWhile(array, predicate) {
    return this.reverse(this.takeWhile(this.reverse(array), predicate))
  }  
  function takeWhile(array, predicate) {
    predicate = this.iteratee(predicate)
    for(let i = 0; i < array.length; i++) {
      if(!predicate(array[i])){
        return array.slice(0, i)
      }
    }
    return array.slice(0)
  }  
  /**
   * 将多个数组中的值进行去重放入新的数组中
   * 
   *
   * @param   {...array}  ...array  the arrays to inspect
   *
   * @return  {array}            return the new array of combined values
   */
  function union(...array) {
    return Array.from(new Set([].concat(...array)))
  }  
  function unionBy(...array) {
    let iteratee = array.pop()
    array = [].concat(...array)
    let set = new Set()
    let res = []
    if(this.isFunction(iteratee)) {
      for(let val of array) {
        if(!set.has(iteratee(val))){
          set.add(iteratee(val))
          res.push(val)
        }
      }
    }else if(this.isString(iteratee)) {
      for(let val of array) {
        if(!set.has(val[iteratee])) {
          set.add(val[iteratee])
          res.push(val)
        }
      }
    }
    return res
  }  
  function unionWith(...array) {
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
  }  
  //根据sameValueZero进行数组去重
  function uniq(array) {
    let res = []
    for(let i = 0; i < array.length; i++) {
      if(!res.includes(array[i])) {
        res.push(array[i])
      }
    }
    return res
  }  
  function uniqBy(array, iteratee) {
    let set = new Set()
    let res = []
    if(this.isFunction(iteratee)) {
      for(let val of array) {
        if(!set.has(iteratee(val))){
          set.add(iteratee(val))
          res.push(val)
        }
      }
    }else if(this.isString(iteratee)) {
      for(let val of array) {
        if(!set.has(val[iteratee])) {
          set.add(val[iteratee])
          res.push(val)
        }
      }
    }
    return res
  }  
  function uniqWith(array, comparator) {
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
  }  
  function unzip(array) {
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
  }  
  function unzipWith(array, iteratee) {
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
  }  
  /**
   * zip(['a'], [1,3,4], [true, false]);
   * return [["a", 1, true], [undefined, 3, false], [undefined, 4, undefined]]
   *
   * @param   {...array}  ...array  [...array description]
   *
   * @return  {[...array]}            [return description]
   */
  function zip(...array) {
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
  }  
  function zipWith(...array) {
    if(!this.isFunction(array[array.length -1])) {
      return this.zip(...array)
    }
    let iteratee = array.pop()
    let res = []
    for(let i = 0; i < array[0].length; i++) {
      let a = iteratee
      for(let j = 0; j < array.length; j++) {
        a = a.bind(null, array[j][i]) 
      }
      res.push(a())
    }
    return res
  }  
  //Util############################################################################################
  function curry() {

  }  
  //将对象路径字符串转为数组
  function toPath(str) {
    return str.split(/\.|\[|\]./g)
  }  
  //获得对象目标深度的值
  function get(obj, Path, defaultValue = null) {
    if(this.isArray(Path)){
      for(let p of Path){
        if(this.isUndefined(obj)){
          return defaultValue
        }
        obj = obj[p]
      }
      return obj
    }
    let path = this.toPath(Path)
    for(let i = 0; i < path.length; i++) {
      if(this.isUndefined(obj)){
        return defaultValue
      }
      obj = obj[path[i]]
    }
    return obj
  }  
  function matchesProperty(Path, value) {
    return (obj) => {
      return this.isEqual(this.get(obj, Path), value)
    }
  }  
  function Property(Path) {
    return (obj) => {
      return this.get(obj, Path)
    }
  }  
  function iteratee(predicate) {
    if(this.isArray(predicate)){
      return this.matchesProperty(predicate[0], predicate[1])
    }else if(this.isString(predicate)){
      return this.Property(predicate)
    }else if(this.isobject(predicate)){
      return this.matches(predicate)
    }else {
      return predicate
    }
  }  
  // function equal1(a,b){return this.isEqual(a,b)}  //this == versionlin7
  // function equal2(){return (a,b) => this.isEqual(a,b)}  //this == versionlin7
  // function equal3:(a,b)=> this.isEqual(a,b),//this == window
  //返回对象部分匹配函数
  // matches : (src) => versionlin7.bind(versionlin7.isMatch, versionlin7, window, src), //"this.bind is not a function"
  function matches(source) {
    return this.bind(this.isMatch, this,window, source)
  }  
  // function matches(source) {
  //   return function(obj) {
  //     return versionlin7.isMatch(obj,source)
  //   }
  // }  
  //参数绑定函数
  function bind(f, thisArg, ...fixedArgs){
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
  }  
// versionlin7.matches({x:1})({x:2})
  // function matches(source) {
  //   return this.bind(this.isMatch, window, source)
  // }  
  // function bind(f,...fixedArgs){
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
  // }  
  //对象部分匹配
  
  function isMatch(obj, source) {
    for(let key in source) {
      if(!this.isEqual(obj[key], source[key])){
        return false
      }
    }
    return true
  }  
  //深对比SameValueZero
  function isEqual(n1, n2) {
    if(isFunction(n1) && isFunction(n2)){
      return t1.toString() == t2.toString()
    }else if(isObject(n1) && isObject(n2)) {
      return ObjectCompare(n1,n2)
    }else {
      return sameValueZero(n1,n2)
    }
  }  
/**
 * 对象深对比
 * @param   {object}  obj1  [obj1 description]
 * @param   {object}  obj2   [obj description]
 *
 * @return  {boolean}        [return description]
 */
  function ObjectCompare(obj1, obj2) {
    let a = Object.keys(obj1)
    let b = Object.keys(obj2)
    if(a.length != b.length) {
      return false;
    }
    for(let i = 0; i < a.length; i++) {
      let t1 = obj1[a[i]]
      let t2 = obj2[a[i]]
      if(isFunction(t1) && isFunction(t2)){
        if(t1.toString() == t2.toString()){
          continue
        }else {
          return false
        }
      }else if(isObject(t1) && isObject(t2)) {
        if(ObjectCompare(t1,t2)){
          continue
        }else {
          return false
        }
      }else {
         if(sameValueZero(t1,t2)){
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
  }  
/**
 * +-0相等NaN和NaN相等，不同类型不相等；
 *
 * @param   {*}  x  [x description]
 * @param   {*}  y  [y description]
 *
 * @return  {boolean}     [return description]
 */
  function sameValueZero(x, y) {
    if(Object.is(x, y)){//+-0不相等 NaN相等
      return true
    }else if(x === y){//NaN不相等 +-0相等
      return true
    }
    return false
  }  
  //数组值交换
  function arySwap(ary, a, b) {
    let tmp = ary[a]
    ary [a] = ary[b]
    ary[b] = tmp
  }  
/**
 * 判断数组中bool类型的值并进行字符串化
 *
 * @param   {[type]}  value  [value description]
 *
 * @return  {[type]}         [return description]
 */
  function boolInArray(value) {
    if(isBoolean(value)) {
      if(value | 0) {
        return 'true'
      }else {
        return 'false'
      }
    }
    return value
  }  
  function isArray(value) {
    return tostring(value) == '[object Array]'
  }  
  function isBoolean(value) {
    return tostring(value) == '[object Boolean]'
  }  
  function isString(value) {
    return tostring(value) == '[object String]'
  }  
  function isFunction(value) {
    return tostring(value) == '[object Function]'
  }  
  function isNumber(value) {
    return tostring(value) == '[object Number]'
  }  
  function isObject(value) {
    let type = typeof(value)
    return value != null && (type == 'object' || type == 'function')
  }  
  function isobject(value) {
    return tostring(value) == '[object Object]'
  }  
  function isNull(value) {
    return tostring(value) == '[object Null]'
  }  
  function isUndefined(value) {
    return tostring(value) == '[object Undefined]'
  }  
  function isNaN(value) {
    if(isUndefined(value) || isNull(value)) return false
    return value.toString() === 'NaN'
  }  
  return {tostring,chunk, indexOf, sameValueZero,isEqual,differenceWith}
}()
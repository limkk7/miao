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
  difference: function(ary, ...value) {
    var array = ary.slice()
    for (let val of value) {
        array = array.filter(n => !val.includes(n))
    }
    return array
  },
  differenceby: function(array, ...values, action) {
    let ary = array.slice()
    for(let val of values) {
      ary = ary.filter(n => !val.includes(action(n)))
    }
  },
}
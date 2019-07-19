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
  difference: function(ary, ...value) {
    var array = ary.slice()
    for (let val of value) {
        array = array.filter(n => !val.includes(n))
    }
    return array
  },
}
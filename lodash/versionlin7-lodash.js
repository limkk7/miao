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
    let array = []
    let map = {}
    for(let i = 1; i < arguments.length; i++) {
      map[arguments[i]] = 0
    }
    for(let i = 0; i < ary.length; i++) {
      if(!(ary[i] in map)){
        array.push(ary[i])
      }
    }
    return array
  },
}
/**
* from 
* https://codeforces.com/edu/course/2/lesson/2/1
*/
var s = 'ababba'
s = s + '$'

var p = [],
  c = []


var a = []
{
  //k = 0
  /**
   * Maps
   * |a|b|a|b|b|a|$|
   * |0|1|2|3|4|5|6|
   */
  for (let i = 0; i < s.length; i++) a.push({ first: s[i], second: i })

  /**
   * Sort by lexical order
   *      |$|a|a|a|b|b|b|
   * p -> |6|0|2|5|1|3|4|
   */
  a.sort(function (objA, objB) {
    return objA.first.localeCompare(objB.first)
  })

  for (let i = 0; i < s.length; i++) p[i] = a[i].second

  /**
   * Assign equivalence classes
   * c -> |0|1|1|1|2|2|2|
   * p -> |6|0|2|5|1|3|4|
   */
  c[p[0]] = 0
  for (let i = 1; i < s.length; i++) {
    if (a[i].first === a[i - 1].first) {
      c[p[i]] = c[p[i - 1]]
    } else {
      c[p[i]] = c[p[i - 1]] + 1
    }
  }
}

var k = 0
while (1 << k < s.length) {    
  a = []
  for (let i = 0; i < s.length; i++) {
    a[i] = {
      first: {
        first: c[i],
        //Cyclic String
        second: c[(i + (1 << k)) % s.length]
      },
      second: i
    }
  }

  a.sort(function (objA, objB) {
    var r = objA.first.first - objB.first.first
    if (r) {
      return r
    } else {
      return objA.first.second - objB.first.second
    }
  })

  for (let i = 0; i < s.length; i++) p[i] = a[i].second

  c[p[0]] = 0
  for (let i = 1; i < s.length; i++) {
    if (JSON.stringify(a[i].first) === JSON.stringify(a[i - 1].first)) {
      c[p[i]] = c[p[i - 1]]
    } else {
      c[p[i]] = c[p[i - 1]] + 1
    }
  }

  k++
}

for (let i = 0; i < p.length; i++) {
  console.log(p[i], s.substring(p[i]))
}

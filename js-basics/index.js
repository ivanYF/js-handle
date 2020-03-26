function getSum(){}
// 匿名函数
() => {}


var sum = function(){}

let sum = () => {}


// 构造函数
const sum = new Function('a','b','return a+b')




// 调用方式
function getSum(){
  console.log(this)
}

getSum()


(function(){
  console.log(this)   // this window
})()


var getSum = function(){
  console.log(this)
}

getSum()


// 对象 方法 this 
var objList = {
  name: 'methods',
  getSum: function() {
    console.log(this) // ObjList
  } 
}

objList.getSum()


let objList = {
  name: 'methods',
  getSum: () => {
    console.log(this) // window
  } 
}

objList.getSum = () => {
  console.log(this) // window
}

objList.getSum()


 function Person(){
   console.log(this,'1111') // 构造函数调用 指向实例化对象 personOne
 }

 let personOne = new Person()


 function foo(){
   console.log(this)
 }

 foo.apply('apply 改变的this值')
 foo.call('call 改变的this值')



 (()=>{
  console.log(this) // window
 })()

let arrowFun = () => {
  console.log(this) // window
}

arrowFun()

let arrowObj = {
  arrFun: function(){
    (() => {
      console.log(this) // arrowObj 对象
    })()
  }
}


let foo = {
  name: 'zhangsan',
  logName: function(){
    console.log(this.name)
  }
}

let bar = {
  name: 'lisi'
}

foo.logName.call(bar)

(function(){
  Array.prototype.push.call(arguments,'wangwu')
  console.log(arguments)
})('zhangsan','lisi')



let arr1 = [1,2,3]
let arr2 = [4,5,6]

Array.prototype.push.apply(arr1,arr2)


// 数组最大值
Math.max.apply(null,arr1)


// 判断字符类型
Object.prototype.toString.call({})


// 判断字符类型

typeof ''

'' instanceof String

Object.prototype.toString.call('').slice(7,-1).toLocaleLowerCase()



/**
 *
 *
 * @param {*} context
 * @param {*} parameter
 * @returns
 */
Function.prototype.newCall = function(context,...parameter){
  if(typeof context === 'object' || typeof context === 'function'){
    context = context || window
  }else{
    context = Object.create(null)
  }
  let fn = Symbol()
  context[fn] = this
  const res = context[fn](...parameter)
  delete context.fn
  return res
}

let person = {
  name: 'Abiel'
}

function sayHi(age,sex){
  console.log(this.name)
}



sayHi.newCall(person, 25, '男')



/**
 *
 *
 * @param {*} context
 * @param {*} parameter
 * @returns
 */
Function.prototype.newApply = function(context,parameter){
  if(typeof context === 'object' || typeof context === 'function'){
    context = context || window
  }else{
    context = Object.create(null)
  }

  let fn = Symbol()
  context[fn] = this
  const res = context[fn](...parameter)
  delete context[fn]
  return res
}


let person = {
  name: 'Abiel'
}

function sayHi(age,sex){
  console.log(this.name,age,sex)
}

sayHi.newApply(person,[25,'nan'])



/**
 *
 *
 * @param {*} context
 * @param {*} innerAgs
 * @returns
 */
Function.prototype.bind = function(context,...innerAgs){
  var me = this
  return function(...finallyArgs){
    return me.call(context,...innerAgs,...finallyArgs)
  }
}

let person = {
  name: 'Abiel'
}

function sayHi(age,sex){
  console.log(this.name,age,sex)
}


let personSayHi = sayHi.bind(person,25)

personSayHi('nan')




// 节流 防抖

let throttle = function(func,delay){
  let timer = null
  return function(){
    if(!timer){
      timer = setTimeout(() => {
        func.apply(this,arguments);
        timer = null
      },delay)
    }
  }
}

let timeout = null
let debounce = function(fn,wait){
  if(timeout !== null) clearTimeout(timeout)
  timeout = setTimeout( ()=> {
    fn.apply(this,arguments)
    timeout = null
  },wait)
}

const handle = function() {
  console.log(arguments)
  console.log(Math.random());
}

document.documentElement.addEventListener("scroll", debounce(handle, 3000));


Promise.all = (arr) => {
  let arrResult = []

  return new _Promise((resove,reject) => {
    let i = 0
    next()
    function next(){
      arr[i].then(function(res){
        arrResult.push(res)
        i++
        if(i == arr.length){
          resove()
        }else{
          next()
        }
      })
    }
  })

}






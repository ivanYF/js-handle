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















let Ivan = window.Ivan = window.Ivan ? window.Ivan : {};

/**
 * 快速排序 
 * 阮一峰老师版本
 */

Ivan.quickSort = function(arr) {
	// 数组 长度 小于等于 1 直接输出
	if (arr.length <= 1) {
	    return arr;
	}
	console.log(arr);
	// 获取数组中间 索引值
	let pivotIndex = Math.floor(arr.length / 2);
	// 获取数组 中间索引的 value
	let pivot = arr.splice(pivotIndex, 1)[0];
	// 定义左右数组
	let left = [];
	let right = [];
	
	// 遍历数组 左边 小于中间数值， 右边 大于中间数值
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	/**
	 * quickSort(left) -- > left2.concat([中间址],right2)  
	 * quickSort(left2) -- > left3.concat([中间址],right3)
	 * left* *.length <= 1  直接结束 for 执行次数 
	 */

	// 递归  Ivan.quickSort == 》arguments.callee 调用自身
	return arguments.callee(left).concat([pivot], arguments.callee(right));
}

// example
// 定义无序数组
const Arr = [1, 25, 2, 7, 32, 14, 35, 28]; 


/**
 * 二分查找 搜索对象为而为数组
 * 在一堆有序的数中找出指定的数
 * 目前数与 数组中间值 对比，大在后半段找，小在前半段，依次类推
 * target 目标数值  搜索对象 array
 */

Ivan.FindArry = function(target, array) {
	let idx = -1;
	let i = Math.ceil(array.length/2); // 向上取舍

	while ( i >= 1 && i <= (array.length + 1)) {
		if (array[i-1] > target) {
			if (i == 1) {
				return idx;
			};
			i = Math.ceil(i/2);
		}else if(array[i-1] < target){
			if (i == array.length) {
				return idx;
			};
			i = Math.ceil((i + array.length)/2);
		}else{
			idx = i-1;
			console.log('索引值为：' + idx);
			return idx;
		}
	}
	return idx;	
}


// 二维数组查找
Ivan.Find = function(target, array) {
	let i = 0;
	let j = array[i].length - 1;
	// 二维数组长度 j >= 0 
	while (i < array.length && j >= 0) {
		if (array[i][j] < target) {
		    i++;
		} else if (array[i][j] > target) {
		    j--;
		} else {
		    return true;
		}
	}
	return false;
}

/**
 * 解析url后的参数
 * 获取链接上面的参数
 * 首先切割？ 参数的拼接为 & 拼接 再切歌& 然后 通过键值对的方式
 */
function parseParam(url,args) {
	// 声明 空对象
	let obj = {};
	let arr = url.split("?");
	if(arr.length == 1){ //判断没有问号
		return "无参数"
	}
	let total = arr[1].split("&");
	// 切割 键值对 a=1&b=2 ==> ['a=1','b=2']
	for(let i = 0; i < total.length; i++){
	 	let single = total[i].split("=");
	 	if(single[0] == ''){ //判断有？但是没有参数
	   		return '无参数'
		}

		// 判断 value 不存在
	 	if(!single[1]){
	   		obj[single[0]] = false;
	 	}else{
	 		// key 已经存在 则把相同key 的参数转化为数组
		   	if(obj[single[0]]){
		    	let concat;
		    	if (!Array.isArray(obj[single[0]])) { 
		    		//判断value是否为数组
		       		concat = [obj[single[0]]]
		     	}else{
		     		// 非数组 转化为数组
		       		concat = obj[single[0]];
		     	}
		     	// 增加新的数值
		     	concat.push(single[1]);
		     	//数组去重
		     	concat = new Set(concat);
		     	// 语法糖 把 Set，Map，转化为数组
		     	concat = Array.from(concat) 
		     	obj[single[0]] = concat
		   	}else{
		    	obj[single[0]] = decodeURI(single[1]) //进行转码
		   	}
	 	}
	}
	return obj
}

/**
 * parseLocator url 链接
 * 参数：lower key 小写 
 * upper：key 大写
 * group：相同的key转化为数组
 */

function parseLocator(url, args) {
    url = url === null || url === undefined ? "" : String(url);
    	
    // 初始化转化参数
    var query = {}, // 输出对象
    	list, // 键值对数组
    	str;  // 单个 key value 数组

    // 按照字符?截取
    if (url.indexOf("?") !== -1) {
    	// 键值对 数组
    	list = url.split("?")[1].split("&");
    	// for 循环获取
    	for (var i = 0, len = list.length; i < len; i++) {

    		// a=1 ['a','1']
        	str = list[i].split("=");
        	// ['a','1','']
        	str.push("");

        	var key = str[0];
        	if (args && args.indexOf("lower") > -1)
        		// key转化为小写
          		key = String(str[0]).toLowerCase();
        	else if (args && args.indexOf("upper") > -1)
        		// key转化为大写
          		key = String(str[0]).toUpperCase();

        	if (args && args.indexOf("group") > -1) {
        		// 有group的时候 value转化为数组
        		// 不然直接覆盖
          		if (query[key]) query[key].push(str[1]);
          		else query[key] = [str[1]];
        	} else query[key] = str[1];
      	}

      	// args 为group时 value为数组 如果value只有一项 直接转化为数组第一项的值
      	for (var i in query) {
        	if (query[i] && query[i].length === 1) {
          		query[i] = query[i][0];
        	}
      	}
    }
	return query;
};

/**
 * [实现一个简单的模版引擎]
 * @param  {[type]} template [模版字符串]
 * @param  {[type]} data     [模版替换参数对象]
 * @return {[type]}          [string]
 */

// 遍历 数组key 然后利用正则替换
// `${}` es6 拼接字符串语法   new RegExp(`{{${key}}`,"g") ==> reg = /{{name}}/g
var render = (template,data)=>{
	var result='';
   	for( key in data){
 		if(!key){
 			result  = (result || template).replace(new RegExp(`{{${key}}`,"g"),undefined);
 		}else{		
 			result  = (result || template).replace(new RegExp(`{{${key}}}`,"g"),data[key]);
 		}
 	}
 	return result
}

// example
let template = 'HI,我是{{name}}，{{age}}岁，性别{{sex}}';
let data = {
	name: 'Ivan',
	age: 28
}
// render(template,data)
// "HI,我是Ivan，28岁，性别{{sex}}"


/**
 * [exchange 将数字变为千分位分割]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
// ?= 正向预查，在任何开始匹配圆括号内的正则表达式模式的位置来匹配搜索字符串
function exchange(num) {
    num += ''; //转成字符串
    if (num.length <= 3) {
        return num;
    }

    // 前面 0-3个数 后面至少有1组（+） 3个数字结尾
    // $ 匹配字符结尾
    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
        console.log(v)
        return v + ',';
    });
    return num;
}

// example 只适应正整数
console.log(thousands(1234567));

/**
 * [exchangejs js 计算千分位]
 * @param  {[type]} num [需要改变的数值]
 * @return {[type]}     [返回]
 */
function exchangejs(num){  
  	num = num + ''; //数字转字符串  
  	let str = ''; //字符串累加  
  	for(var i = num.length-1,j = 1; i>=0; i--,j++){  
      	//每隔三位加逗号，过滤正好在第一个数字的情况  
      	// j 计算次数 每三次 追加一个，
      	if( j%3 ==0 && i!=0){
          	str += num[i] + ',';//加千分位逗号  
          	continue;  
      	}  
      	str += num[i];//倒着累加数字
  	} 
   	// 得到的数组是反转的 切割 然后reverse 再拼接
  	return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串  
}

/**
 * [exchangeLocal 利用 toLocaleString]
 * @param  {[type]} num [传入数值]
 * @return {[type]}     [description]
 */
// 只适应正整数
function exchangeLocal(num){	
	return num.toLocaleString()
}
// example
// let num = 2434232;
// num.toLocaleString('zh', { style: 'currency', currency: 'CNY' });    //￥2,434,232.00


// 修改增加 负数 and 小数位
// 增加符号  /\d{1,3}(?=(\d{3})+$)/g --> /\-?\d{1,3}(?=(\d{3})+$)/g   \-? 0-1次
// 增加小数 提前匹配出小数
// 记录小数 然后切割 整数，再拼接返回

function thousands(num) {
    num += ''; //转成字符串
    let zNum = num; // 整数位置
    let xNUM = ''; //小数位置
    if (num.indexOf('.') >= 0) {
    	zNum = num.split('.')[0];
    	xNUM = num.split('.')[1];
    };

    if (zNum.length <= 3) {
        return num;
    }

    // 前面 0-3个数 后面至少有1组（+） 3个数字结尾
    // $ 匹配字符结尾
    zNum = zNum.replace(/\-?\d{1,3}(?=(\d{3})+$)/g, (v) => {
        console.log(v)
        return v + ',';
    });
    if (xNUM) {zNum = zNum + '.' + xNUM};
    return zNum;
}


// 深拷贝
function deepClone(o1, o2) {
    for (let k in o2) {
        if (typeof o2[k] === 'object') {
            o1[k] = {};
            deepClone(o1[k], o2[k]);
        } else {
            o1[k] = o2[k];
        }
    }
}





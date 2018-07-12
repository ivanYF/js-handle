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


// 伪继承
// xhr 请求是的 对象拼接
function extend(src) {
	// 定义返回 对象  存储 args
    var obj, args = arguments;
    // 遍历args 数组
    for (var i = 1; i < args.length; ++i) {
    	// 赋值操作
        if ((obj = args[i])) {
        	console.log(obj);
        	// 遍历 obj 其实也就是 args[i]
            for (var key in obj) {
            	// 合并数值操作
                src[key] = obj[key];
            }
        }
    }
    return src;
};

// example

/**
var a = {a: {ddd:111}};
var b = {b: 456};
var c = extend({}, a, b);
c  {a:{ddd:111},b:456}
*/



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
 * [addParam 拼接url数据]
 * @param {[type]} url    [链接url]
 * @param {[type]} params [传入的对象数据]
 */
function addParam(url, params) {

	var list = window.extend({}, params);
    for (var i in list) {
        try {
            decodeURIComponent(list[i]);
            list[i] = decodeURIComponent(list[i]);
        } catch (e) {}
        list[i] = encodeURIComponent(list[i]);
    }

    // 获取 search 字符串
    // 获取 hash 字符串
    var SEARCH_REG = /\?([^#]*)/,
        HASH_REG = /#(.*)/;
    url = url || '';
    var search = {},
        searchMatch = url.match(SEARCH_REG),
        searchAttr = [],
        searchStr = '';
    // 获取 链接原有参数对象
    if (searchMatch) search = window.parseLocator(searchMatch[0]);

    // 伪继承合并参数对象
    search = window.extend(search, list);

    // 把 undefined 过滤 然后转化为数组
    for (var i in search) {
        if (search[i] === undefined) search[i] = '';
        searchAttr.push(i + '=' + search[i]);
    }
    // 数组拼接
    if (searchAttr[0]) searchStr = '?' + searchAttr.join('&');

    //是否存在search 存在直接替换掉 search
    if (SEARCH_REG.test(url)) {
    	url = url.replace(SEARCH_REG, searchStr);
    }else {
        if (HASH_REG.test(url)) {
        	//是否存在hash 利用 search+hash 替换hash
            url = url.replace(HASH_REG, searchStr + '#' + url.match(HASH_REG)[1]);
        } else {
        	// 直接拼接
            url += searchStr;
        }
    }
    return url;
};



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
  	for(var i = num.length - 1,j = 1; i >= 0; i--,j++){  
      	//每隔三位加逗号，过滤正好在第一个数字的情况  
      	// j 计算次数 每三次 追加一个，
      	if(j%3 == 0 && i!=0){
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
// 针对 对象键值对的拷贝
// 对 数组的数字数据，会有出入
/**
 * [deepCopy 深拷贝 -- 针对 对象键值对的拷贝]
 * @param  {[type]} o1 [输出字段]
 * @param  {[type]} o2 [拷贝参考对象]
 * @return {[type]}    [description]
 */
function deepCopy(o1, o2) {
    for (let k in o2) {
        if (typeof o2[k] === 'object') {
            o1[k] = {};
            deepCopy(o1[k], o2[k]);
        } else {
            o1[k] = o2[k];
        }
    }
}

var obj = {
	a:1,
	b:2,
	c:[1,2,3]
}
var newObj = {};
deepCopy(newObj,obj)

// 返回
// 应该注意到问题的错误点
/**
newObj = {
	a:1,
	b:2,
	c:{0:1,1:2,2:3}
}
**/

/**
 * [getType 判断函数类型]
 * @param  {[type]} obj [判断参数]
 */
function getType(obj){
	//tostring会返回对应不同的标签的构造函数
	var toString = Object.prototype.toString;
	// 枚举数值
	var map = {
		'[object Boolean]'  : 'boolean', 
		'[object Number]'   : 'number', 
		'[object String]'   : 'string', 
		'[object Function]' : 'function', 
		'[object Array]'    : 'array', 
		'[object Date]'     : 'date', 
		'[object RegExp]'   : 'regExp', 
		'[object Undefined]': 'undefined',
		'[object Null]'     : 'null', 
		'[object Object]'   : 'object'
	};
	if(obj instanceof Element) {
		return 'element';
	}
	// 匹配key 返回数组类型
	return map[toString.call(obj)];

	// 剪短写法为
	
}

/**
 * [getTypeSimple 判断数据类型]
 * @param  {[type]} obj [需要判断的数据类型]
 * @return {[type]}     [返回的对象 类型]
 * @example Object.prototype.toString.call(111).slice(8,-1).toLowerCase() ==> number
 */
function getTypeSimple(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase()
}


/**
 * [deepClone 数组深拷贝]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function deepClone(data){
   	var type = getType(data);
   	var obj;
   	// 初始化 obj 类型
   	if(type === 'array'){
       	obj = [];
   	} else if(type === 'object'){
       	obj = {};
   	} else {
       	//不再具有下一层次
       	return data;
   	}
   	// 数组 与 对象 进行不同的操作
   	if(type === 'array'){
       	for(var i = 0, len = data.length; i < len; i++){
        	obj.push(deepClone(data[i]));
       	}
   	} else if(type === 'object'){
       	for(var key in data){
        	obj[key] = deepClone(data[key]);
       	}
   	}
   	return obj;
}


/**
 * 时间处理 格式化
 */

/**
 * [formatDate 将Date类型解析为String类型]
 * @param  {[type]} date [输入日期对象，默认当前时间]
 * @param  {[type]} fmt  [输出格式]
 * @return {[type]}      [根据规则 输出的时间顺序]
 * @example formatDate(new Date(2006,0,1), 'yyyy-MM-dd HH:mm');
 */
function formatDate(date, fmt) {
    if (!date) date = new Date();
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var o = {
        'M+': date.getMonth() + 1, //月份      
        'd+': date.getDate(), //日      
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时      
        'H+': date.getHours(), //小时      
        'm+': date.getMinutes(), //分      
        's+': date.getSeconds(), //秒      
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度      
        'S': date.getMilliseconds() //毫秒      
    };
    if (/(y+)/.test(fmt)) {
        // 检测 y+ 匹配 按照 y.length 输出 date.getFullYear() = 2018 
        // substr(4 - RegExp.$1.length) 为截取的起始下标，length 默认为 字符串结尾
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        // 遍历获取 对象key ==》 正则语句
        if (o.hasOwnProperty(k) && new RegExp('(' + k + ')').test(fmt)) {
            // 匹配规则是否存在
            // 检查显示位数，当匹配规则的长度为1 利用截取字符串切割数据
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};


/**
 * [formatDate 将String类型解析为Date类型]  
 * @param {String} fmt 输入的字符串格式的日期
 * @example parseDate('2006-1-1') return new Date(2006,0,1)  
 * @example parseDate(' 2006-1-1 ') return new Date(2006,0,1)  
 * @example parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)  
 * @example parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);  
 * @example parseDate('不正确的格式') retrun null  
 * /^ *(reg) *$/兼容匹配字符串左右出现空格
 */
 function parseDate(str) {
    str = String(str).replace(/^[\s\xa0]+|[\s\xa0]+$/ig, '');
    var results = null;

    //秒数 #9744242680  
    results = str.match(/^ *(\d{10}) *$/);
    if (results && results.length > 0)
        return new Date(parseInt(str, 10) * 1000);

    //毫秒数 #9744242682765 
    results = str.match(/^ *(\d{13}) *$/);
    if (results && results.length > 0)
        return new Date(parseInt(str, 10));

    //20110608 
    results = str.match(/^ *(\d{4})(\d{2})(\d{2}) *$/);
    if (results && results.length > 3)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

    //20110608 1010 
    results = str.match(/^ *(\d{4})(\d{2})(\d{2}) +(\d{2})(\d{2}) *$/);
    if (results && results.length > 5)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));

    //2011-06-08 
    results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) *$/);
    if (results && results.length > 3)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

    //2011-06-08 10:10 
    results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
    if (results && results.length > 5)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));

    //2011/06\\08 10:10:10 
    results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
    if (results && results.length > 6)
        return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));

    return (new Date(str));
};


/**
 * @method xhr
 * @description 
 * @public
 * @param {Object} obj 请求参数
 * @example 
 * hui.xhr({
 *     url: '...', 
 *     [type: 'GET'], 
 *     [contentType: 'application/json'], 
 *     [responseType: 'json'],
 *     success: function (resDataJSON) {}
 * });
 */

/**
 * [xhr ajax 请求]
 * @param  {[type]} opt [obj 请求参数]
 * xhr({
 *    url: '...', 
 *    [type: 'GET'], 
 *    [contentType: 'application/json'], 
 *    [responseType: 'json'],
 *    success: function (res) {}
 * });
 */
function xhr(opt) {
    opt = opt ? opt : {};
    // 创建实例
    var xhr = new XMLHttpRequest();
    // 声明实例数据
    xhr.open(opt.type || 'GET', opt.url, true);
    // 默认 返回json
    xhr.setRequestHeader('Content-Type', opt.contentType || 'application/json');
    // 监测 xhr 状态变更
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (opt.success && typeof opt.success == 'function') {
                opt.success(!opt.responseType || opt.responseType == 'json' ?
                    Function('return ' + xhr.responseText)() : xhr.responseText);
            }
        } else if (xhr.readyState == 4 && xhr.status != 200) {
            if (opt.error) opt.error(xhr.status);
        }
    };
    // 发送ajax
    xhr.send(opt.body || JSON.stringify(opt.data) || '');
    return xhr;
};


/**
 * @method jsonp
 * @description 发起jsonp请求
 * @public
 * @param {Object} obj 请求参数
 * @example 
 * hui.xhr({
 *     url: '...', 
 *     callback: 'jsonp1'
 * });
 */
let jsonp = (function(i) {
    return function(opt) {
        var el = document.createElement('script');

        // 获取 callback 字符串 
        // 如果没有直接自动在window上挂载一个callback function
        var callback = '';
        if (typeof opt.callback == 'string') callback = opt.callback;
        else {
            while (window['jsonp' + (++i)]) {}
            callback = 'jsonp' + i;

            if (typeof opt.callback == 'function') {
                window[callback] = function(res) {
                    opt.callback(res);
                    if (opt.success) opt.success(res);
                };
            } else {
                window[callback] = function(res) {
                    if (opt.success) opt.success(res);
                };
            }
        }
        el.src = opt.url + (!opt.nocallback && (opt.url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callback);
        document.documentElement.appendChild(el);
    };
})(0);






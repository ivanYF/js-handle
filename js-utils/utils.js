/**
 * 快速排序 
 * 阮一峰老师版本
 */

const Arr = [1, 25, 2, 7, 32, 14, 35, 28]; // 定义无序数组

function quickSort(arr) {
	console.log(11111);
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

	// 递归
	return quickSort(left).concat([pivot], quickSort(right));
}



/**
 * 二分查找 搜索对象为而为数组
 * 在一堆有序的数中找出指定的数
 * 目前数与 数组中间值 对比，大在后半段找，小在前半段，依次类推
 * target 目标数值  搜索对象 array
 */

function FindArry(target, array) {
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
function Find(target, array) {
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



/**
 * 快速排序 1
 * 阮一峰老师版本
 */

const Arr = [85, 24, 63, 45, 17, 31, 96, 50]; // 定义无序数组

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

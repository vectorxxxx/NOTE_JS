// 自定义兼容所有浏览器获取元素样式的方法
function getStyle(obj, name) {
	return window.getComputedStyle ? getComputedStyle(obj, null)[name] : obj.currentStyle[name];
}

// 封装移动方法
// obj：要执行动画的对象
// attr：要执行动画的样式
// target：执行动画的目标位置
// speed：移动的速度
// callback：回调函数
function move(obj, attr, target, speed, callback) {
	clearInterval(obj.timer);
	var current = parseInt(getStyle(obj, attr));
	speed = target < current ? -speed : speed;
	obj.timer = setInterval(function() {
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;
		newValue = speed > 0 ? (newValue > target ? target : newValue) : (newValue < target ? target :
			newValue);
		obj.style[attr] = newValue + "px";
		if (newValue == target) {
			clearInterval(obj.timer);
			callback && callback();
		}
	}, 50);
}

// 定义一个函数，用来向一个元素中添加指定的 class 属性值
// 参数：
// obj 要添加class属性的元素
// cn  要添加的class值
function addClass(obj, cn) {
	if (!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}
}

// 判断一个元素中是否含有指定的class属性值
function hasClass(obj, cn) {
	// return obj.className.indexOf(cn) != -1;
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(obj.className);
}

// 删除一个元素中的指定的class属性
function removeClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg, "");
}

// toggleClass可以用来切换一个类
// 如果元素中具有该类，则删除
// 如果元素中没有该类，则添加
function toggleClass(obj, cn) {
	if (hasClass(obj, cn)) {
		removeClass(obj, cn);
	} else {
		addClass(obj, cn);
	}
}

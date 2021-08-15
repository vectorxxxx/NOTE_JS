window.onload = function() {
	var outer = document.getElementById("outer");
	var picList = document.getElementById("pic-list");
	var imgArr = document.getElementsByTagName("img");
	// 动态调整picList的宽度，以自适应图片的数量变化
	picList.style.width = (outer.clientWidth + 10) * imgArr.length + "px";

	var navList = document.getElementById("nav-list");
	var aArr = document.getElementsByTagName("a");
	// 动态调整navList的水平偏移量
	navList.style.left = (outer.clientWidth - 25 * aArr.length) / 2 + "px";
	// 设置第一个轮播按钮悬浮颜色
	var index = 0;
	aArr[index].style.backgroundColor = "black";

	// 点击按钮切换图片
	for (var i = 0; i < aArr.length; i++) {
		aArr[i].index = i;
		aArr[i].onclick = function() {
			// 设置index
			index = this.index;
			// 清空定时器
			clearInterval(timer);
			move(picList, "left", -(outer.clientWidth + 10) * index, 100, function() {
				// 开启定时器
				autoSwitch();
			});
			setColor();
		};
	}

	autoSwitch();

	// 自动切换图片
	var timer;
	function autoSwitch() {
		timer = setInterval(function() {
			index++;
			index %= imgArr.length;
			move(picList, "left", -(outer.clientWidth + 10) * index, 100, function() {
				if (index >= imgArr.length - 1) {
					picList.style.left = "0px";
				}
				setColor();
			});
		}, 3000);
	}

	// 设置轮播按钮悬浮颜色
	function setColor() {
		// 重置所有轮播按钮颜色：由于修改的是内联样式，优先级较高，会把css样式覆盖，导致悬浮效果失效
		// 那么这里不使用内联样式，将其置为空，这样就会找css样式
		for (var i = 0; i < aArr.length; i++) {
			aArr[i].style.backgroundColor = "";
		}
		index %= aArr.length;
		aArr[index].style.backgroundColor = "black";
	}
};

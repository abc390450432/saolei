var start = document.getElementsByClassName("start")[0];
var content = document.getElementsByClassName("content")[0];
var num = document.getElementsByClassName("num")[0];
var box = document.getElementsByClassName("box")[0];
var gameOver = document.getElementsByClassName("gameOver")[0];
var score = document.getElementsByClassName("score")[0];
var mineNum;
var mineOver;
var minesign;
var block;
var mineArr = [];
box.oncontextmenu = function(){
	return false;
}
start.onclick = function(){
	start.style.display = 'none';
	content.style.display = 'block';
	num.style.display = 'block';
	init();
	content.onmousedown = function(e){
		var event = e.target;
		if (e.which == 1) {
			leftClick(event);
		}else if(e.which == 3){
			rightClick(event);
		}
	}
}
gameOver.onclick = function(){
	gameOver.style.display = 'none';
	start.style.display = 'block';
	content.style.display = 'none';
	num.style.display = 'none';
	content.innerHTML = "";
}
function init(){
	mineNum = 10;
	mineOver = 10;
	minesign = 0;
	score.innerHTML = minesign;
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 12; j++) {
			var con = document.createElement('div');
			con.classList.add('block');
			con.setAttribute('id',i + '-' + j);
			content.appendChild(con);
			mineArr.push({mine:0});
		}
	}
	block = document.getElementsByClassName('block');
	while (mineNum) {
		var mineIndex = Math.floor(Math.random()*108);
		if (mineArr[mineIndex].mine === 0) {
			mineArr[mineIndex].mine = 1;
			block[mineIndex].classList.add('boom');
			mineNum --;	
		}
	}
}
function leftClick(dom){
	if(dom.classList.contains('flag')){
		return;
	}
	var boom = document.getElementsByClassName('boom');
	if (boom && dom.classList.contains('boom')) {
		for (var i = 0; i < boom.length; i++) {
			boom[i].classList.add('show');
		}
		content.onmousedown = function(){
			return false;
		}
		setTimeout(function(){
			gameOver.style.backgroundImage = 'url(img/gameOver.jpg)';
			gameOver.style.display = 'block';
		},1000);
	}else {
		var n = 0;
		var posArr = dom && dom.getAttribute('id').split('-');
		var posX = posArr && +posArr[0];
		var posY = posArr && +posArr[1];
		dom && dom.classList.add('number');
		for (var i = posX - 1; i <= posX + 1; i++) {
			for (var j = posY - 1; j <= posY + 1; j++) {
				var aroundBox = document.getElementById(i + '-' + j);
				if (aroundBox && aroundBox.classList.contains('boom')) {
					n++;
				}
			}
		}
		dom && (dom.innerHTML = n);
		if (n == 0) {
			for (var i = posX - 1; i <= posX + 1; i++) {
				for (var j = posY - 1; j <= posY + 1; j++) {
					var nearBox = document.getElementById(i + '-' + j);
					if (nearBox && nearBox.length != 0) {
						if (!nearBox.classList.contains('check')) {
							nearBox.classList.add('check');
							leftClick(nearBox);
						}
					}
				}
			}
		}
	}
}
function rightClick(dom){
	if (dom.classList.contains('number')) {
		return;
	}
	dom.classList.toggle('flag');
	if (dom.classList.contains('flag')) {
		minesign++;
	}else if (!dom.classList.contains('flag')) {
		minesign--;
	}
	score.innerHTML = minesign;
	if(dom.classList.contains('boom') && dom.classList.contains('flag')){
		mineOver--;
	}else if (dom.classList.contains('boom') && !dom.classList.contains('flag')) {
		mineOver++;
	}
	if (mineOver == 0) {
		gameOver.style.backgroundImage = 'url(img/victory.jpg)';
		gameOver.style.display = 'block';
	}
}
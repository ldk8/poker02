var matchingGame={};
matchingGame.deck=[
	'cardAK','cardAK',
	'cardAQ','cardAQ',
	'cardAJ','cardAJ',
	'cardBK','cardBK',
	'cardBQ','cardBQ',
	'cardBJ','cardBJ',
];

$(function(){
	matchingGame.deck.sort(shuffle);
	for(var i=0;i<11;i++){
		$(".card:first-child").clone().appendTo("#cards");
	}
	$("#cards").children().each(
		function(index){
			$(this).css({
				"left":($(this).width()+20)*(index%4),
				"top":($(this).height()+20)*Math.floor(index/4)
			});
			//获取图案
			var pattern=matchingGame.deck.pop();
			//应用纸牌背面图案
			$(this).find(".back").addClass(pattern);
			//把图案嵌入DOM元素中
			$(this).attr("data-pattern",pattern);
			//点击事件
			$(this).click(selectCard);
		});
});

function shuffle(){
	return 0.5-Math.random();
}

function selectCard(){
	if($(".card-flipped").length>1){
		return;
	}
	$(this).addClass("card-flipped");
	if($(".card-flipped").length==2){
		setTimeout(checkPattern,700);
	}
}

function checkPattern(){
	if(isMatchPattern()){
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		$(".card-removed").bind("TransitionEnd",removeTookCards);
	}else{
		$(".card-flipped").removeClass("card-flipped");
	}
}

function isMatchPattern(){
	var cards=$(".card-flipped");
	var pattern=$(cards[0]).data("pattern");
	var anotherPattern=$(cards[1]).data("pattern");

	return(pattern==anotherPattern);
}

function removeTookCards(){
	$(".card-removed").remove();
}
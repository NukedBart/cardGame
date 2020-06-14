//############################## Game mechanics ##############################\\

const deckSize = 20;

var deck;
var hand;
const bufferCard = new Card();

function initialiseDeck(){
	deck = [];
	hand = [];
	for(let i = 0; i < deckSize; i++){
		//Choosing any of the 5 debugging cards...
		const idx = (Math.floor(Math.random() * 5));
		deck.push(new Card("debug[" + idx + "].png"));
	}
	//DEBUG
	console.log(deck);
}

function shuffleDeck(){
	// Fisher-Yates shuffle / Algorithm P
	for (let i = deckSize - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawACard(){
	hand.push(deck.pop());
}

//################################## Visuals ##################################\\


var canvas = document.getElementById("canvas");
// Maybe add an option later to change the preferred resolution, therewith changing these variables? For now, they are consts...
const optimalWidth = 1920;
const optimalHeight = 1080;
var width, height, scl;

function resize(){
	//Make the canvas always fit the screen with an aspect ratio of 9/16
	let tw = window.innerWidth - 25;
	let th = window.innerHeight - 25;
	if(th < tw * 9/16){
		height = th;
		width = th * 16/9;
	}else{
		height = tw * 9/16;
		width = tw;
	}
	canvas.width = width;
	canvas.height = height;
	scl = width / optimalWidth;
	Card.rsz();
	redraw();
}

function loadGame(){
	initialiseDeck();
	shuffleDeck();
	for(let i = 0; i < 4; i++)drawACard();
	showHand();
	resize();
	redraw();

}

function drawGridLines(){
	let line = (x1, y1, x2, y2, weight=1) => {
		ctx.beginPath();
		ctx.lineWidth = weight;
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
	//TODO reconsider the proportions...
	//Centre line -> The player's pitch is slightly larger than the opponent's
	line(0, (7/16)*height, width, (7/16)*height);
	//Seperating stacks from battlefield
	line((1/7)*width, 0, (1/7)*width, height);
}

function showHand(opponent = false){
	let x = (1/7)*width + 10;
	for(let c of hand){
		c.display(x, height - Card.stdH - 10);
		x += Card.stdW + 10;
	}
}

function showStaples(){
	bufferCard.display(Card.stdW/2, (3/4)*height - Card.stdH/2, true);
}

function redraw(){
	drawGridLines();
	showHand();
	showStaples();
	/*let test = new Card("debug[0].png");
	test.display(10, 10, true);*/
	//Not necessarily..
}

window.onload = loadGame;
window.onresize = resize;

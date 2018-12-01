//############################## Game mechanics ##############################\\

const deckSize = 20;

var deck;
var hand;
const bufferCard = new Card();

function initialiseDeck(){
	deck = [];
	hand = [];
	for(let i = 0; i < deckSize; i++){
		const idx = (Math.floor(Math.random() * 5));
		deck.push(new Card("debug[" + idx + "].png"));
	}
	console.log(deck);
}

function shuffleDeck(){
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
//Maybe add an option later to change the preferred resolution, therewith changing these variables? For now, they are consts...
const optimalWidth = 1920;
const optimalHeight = 1080;
var width, height, scl;

function resize(){
	//Make the canvas always fit the screen with a screen ratio of 9/16
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
	resize();
	redraw();
	/*let test = new Card("debug[0].png");
	test.display(10, 10, false);*/
}

function showHand(){
	let x = 10;
	for(let c of hand){
		c.display(x, height - stdH - 10);
		x += stdW + 10;
	}
}

function showStaples(){
	bufferCard.display(width - 200, height/2, true);
}

function redraw(){
	showHand();
	showStaples();
}

window.onload = loadGame;
window.onresize = resize;

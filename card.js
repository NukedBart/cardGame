const ctx = document.getElementById("canvas").getContext("2d");

class Card{
	constructor(imgSrc, scale = 1){
		[this.w, this.h] = [Card.stdW * scale, Card.stdH * scale];
		this.img = new Image();
		this.imgSrc = imgSrc;
		this.imgLoaded = false;
	}

	static rsz(w, h){
		Card.stdW = w || (scl * 135);
		Card.stdH = h || (scl * 240);
	}

	display(x, y, showBack = false){
		if(showBack){
			ctx.drawImage(Card.back, x, y, Card.stdW, Card.stdH);
			ctx.roundRect(x, y, Card.stdW, Card.stdH, Math.ceil(scl * 5));
			ctx.stroke();
		}else{
			ctx.drawImage(this.img, x, y, Card.stdW, Card.stdH);
			ctx.roundRect(x, y, Card.stdW, Card.stdH, Math.ceil(scl * 5));
			ctx.stroke();
		}
	}
}

Card.back = new Image();
Card.back.src = "data\\cardBack.png";
Card.stdW = 135;
Card.stdH = 240;


/* Inspired by several code snippets from this stackoverflow entry:
 * https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 */
CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius = 5) {
    if (typeof radius === 'number') {
        radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
        let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
        for (let side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    this.beginPath();
    this.moveTo(x + radius.tl, y);
    this.lineTo(x + width - radius.tr, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    this.lineTo(x + width, y + height - radius.br);
    this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    this.lineTo(x + radius.bl, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    this.lineTo(x, y + radius.tl);
    this.quadraticCurveTo(x, y, x + radius.tl, y);
    this.closePath();
}

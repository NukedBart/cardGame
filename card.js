const ctx = document.getElementById("canvas").getContext("2d");

class Card{
	constructor(imgSrc, w, h){
		Card.rsz(w, h);
		this.img = new Image();
		this.img.src = imgSrc;
		this.img.loaded = false;
	}

	static rsz(w, h){
		Card.width = w || (scl * 135);
		Card.height = h || (scl * 240);
	}

	display(x, y, showBack = false){
		if(showBack){
			ctx.drawImage(Card.back, x, y, Card.width, Card.height);
			ctx.roundRect(x, y, Card.width, Card.height, Math.ceil(scl * 5));
			ctx.stroke();
		}else{
			if(this.img.loaded){
				ctx.drawImage(this.img, x, y, Card.width, Card.height);
				ctx.roundRect(x, y, Card.width, Card.height);
				ctx.stroke();
			}else{
				this.img.onload = () => {
					console.log("ha!");
					ctx.drawImage(this.img, x, y, Card.width, Card.height);
					ctx.roundRect(x, y, Card.width, Card.height, Math.ceil(scl * 5));
					ctx.stroke();
					this.img.loaded = true;
				}
			}
		}
	}
}

Card.back = new Image();
Card.back.src = "data\\cardBack.png";
Card.width = 135;
Card.height = 240;


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

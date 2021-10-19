export default class Player{
	static SPEED = 20;

	static controls = {
		122 :{
			name : "up",
			getNextCord : (player) => {
				return {
					x:player.x,
					y:player.y - Player.SPEED
				}
			}
		},
		115 :{
			name : "down",
			getNextCord : (player) => {
				return {
					x:player.x,
					y:player.y + Player.SPEED
				}
			}
		},
		100 :{
			name : "right",
			getNextCord : (player) => {
				return {
					x:player.x + Player.SPEED,
					y:player.y
				}
			}
		},
		113 :{
			name : "left",
			getNextCord : (player) => {
				return {
					x:player.x - Player.SPEED,
					y:player.y
				}
			}
		},
	}

	constructor(appElmt,socket,base,game,id,color){
		this.ID = id;
		this.APP = appElmt;
		this.SOCKET = socket;
		this.GAME = game;
		this.COLOR = color;
		this.BASE = base;
		this.x=this.GAME.margin;
		this.y=this.GAME.margin;

		this.initEvent()
	}

	initEvent(){
		$(document).keypress(function(event){
			var keycode = (event.keyCode ? event.keyCode : event.which);
			var control = Player.controls[keycode];
			
			if(control != undefined){
				let nextCord = control.getNextCord(this)
				if(!this.isCollision(nextCord.x,nextCord.y)){
					this.x=nextCord.x
					this.y=nextCord.y
					this.sendIo()
				}
				
			}
		}.bind(this));
	}

	export(){
		return {
			id: this.ID,
			x:this.x,
			y:this.y,
			color:this.COLOR
		}
	}
	
	sendIo(){
		this.SOCKET.emit(`${this.BASE}.move`, this.export());
	}

	isCollision(nextX,nextY){
		return nextX < this.GAME.margin || (nextX+40) > this.GAME.width || nextY < this.GAME.margin || (nextY+40) > this.GAME.height
	}
}
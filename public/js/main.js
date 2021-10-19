import Player from './Player.js'
import Utils from './utils.js'

const APP_ID = "app"
const APP_ELMT = $(`#${APP_ID}`)
const BASE = "sokcube"
const SOCKET = io();

$(function() {
	var player;

	SOCKET.on(`${BASE}.log`, function(msg) {
		player = new Player(
			APP_ELMT,
			SOCKET,
			BASE,
			msg.game,
			msg.client.id,
			msg.client.color
		)

		$('body').css("width",`${msg.game.width}px`)
		$('body').css("height",`${msg.game.height}px`)
		$('body').css("border",`1px solid black`)
		$('body').css("margin",`${msg.game.margin}px`)
    });

	SOCKET.on(`${BASE}.update`, function(msg) {
		APP_ELMT.html("")
		msg.forEach(client => {
			var htmlElmt = `<div class='player' id='${client.id}'></div>`
			APP_ELMT.append(htmlElmt);
			let myElmt = $(`#${client.id}`)
			myElmt.css('background', client.color);
			myElmt.css('position', 'absolute');
			myElmt.css('top',`${client.y}px`);
			myElmt.css('left', `${client.x}px`);
		})
    });
})





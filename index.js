const config = require('./config.json');
const Log = require('./vendor/Log')
const Database = require('./vendor/Database')
const BASE = "sokcube"
const Utils = require('./utils')

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var db = new Database();

app.use(express.static(config.public_folder));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/${config.views_folder}/index.html`);
});

io.on('connection', (socket) => {
	//client ip 
    const userAddress = socket.handshake.address;
	//game settings
	let game = {
		width: 1200,
		height: 700,
		margin:10
	}
	//New client obj
	let newClient = { 
		id: socket.client.id,
		color: Utils.getRandomHexColor(),
		x:game.margin,
		y:game.margin 
	}

	//Add the new client to the game
	db.addClient(newClient)
	//Notice client about his player info
	socket.emit(`${BASE}.log`, 
	{
		client:newClient,
		game: game
	});
	//Update clients screen
	io.emit(`${BASE}.update`, db.getClients());

	Log.display(`${userAddress} connected `);

	
    socket.on(`${BASE}.move`, (msg) => {
        //collision
		if(msg.x >= game.margin && msg.x <= game.width && msg.y >= game.margin && msg.y <= game.height){
			//Updating client value
			db.updateClient(msg)
			//Update clients screen
			io.emit(`${BASE}.update`, db.getClients());

			Log.display(`${userAddress} send ${JSON.stringify(msg)}`);
		}
    });


    socket.on('disconnect', () => {
		//Remove from client from db
		db.removeClient(socket.client.id)
		//Update clients screen
		io.emit(`${BASE}.update`, db.getClients());

        Log.display(`${userAddress} disconnected`);
    });
});



http.listen(config.port, () => {
    Log.display(`*** ${config.name} is listening (${config.port})`)
});
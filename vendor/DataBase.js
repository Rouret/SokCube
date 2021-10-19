const removeItems = require('remove-array-items')
class DataBase{
	constructor(){
		this.clients = []
	}

	addClient(client){
		this.clients.push(client)
	}

	removeClient(id){
		let clientIndex = this.clients.findIndex(client => client.id === id)
		removeItems(this.clients, clientIndex, 1)
	}

	updateClient(clientUpdated){
		let clientIndex = this.clients.findIndex(client => client.id === clientUpdated.id)
		if(clientIndex !== -1){
			this.clients[clientIndex] = clientUpdated
		}
	}

	getClient(id){
		return this.clients.find(client => client.id === id)
	}

	getClients(){
		return this.clients
	}
}

module.exports = DataBase
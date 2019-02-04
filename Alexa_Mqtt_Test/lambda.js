var mqtt = require('mqtt')

/*
	* MQTT-WebClient example for Web-IO 4.0
*/
var hostname = "mqtt://broker.hivemq.com";
var myport = 1883;
var clientId = "mqttexample";
clientId += new Date().getUTCMilliseconds();;
var myusername = "myuser";
var mypassword = "mypassword";
var subscription = "mywebio/+/status";

mqttClient = new mqtt.connect(
    { 
        host: hostname, 
        port: myport
    } 
    , {

        username: myusername,
        password: mypassword
    }
);

mqttClient.onMessageArrived = MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*
	* MQTT-WebClient example for Web-IO 4.0
*/
//var hostname = "io.adafruit.com";
//var port = 8883;
//var clientId = "clientId";
//clientId += new Date().getUTCMilliseconds();;
//var myusername = "smoccia";
//var mypassword = "ac7b6bfdab824cfab74b9140e6a85cda";
//var subscription = "smoccia/f/status";

/*Initiates a connection to the MQTT broker*/
function Connect(){
	mqttClient.connect({
	onSuccess: Connected,
	onFailure: ConnectionFailed,
	keepAliveInterval: 10,
	userName: myusername,
	useSSL: true,
	password: mypassword});
}

/*Initiates a connection to the MQTT broker*/
/*function Connect(){
	mqttClient.connect({
	onSuccess: Connected,
	onFailure: ConnectionFailed,
	//keepAliveInterval: 0,
	userName: username,
	useSSL: true,
	password: password});
}*/

/*Callback for successful MQTT connection */
function Connected() {
	console.log("Connected");
	mqttClient.subscribe(subscription);
}

/*Callback for failed connection*/
function ConnectionFailed(res) {
	console.log("Connect failed:" + res.errorMessage);
}

/*Callback for lost connection*/
function ConnectionLost(res) {
	if (res.errorCode !== 0) {
		console.log("Connection lost:" + res.errorMessage);
		Connect();
	}
}

/*Callback for incoming message processing */
function MessageArrived(message) {
	console.log(message.destinationName +" : " + message.payloadString);
	switch(message.payloadString){
		case "ON":
			displayClass = "on";
			break;
		case "OFF":
			displayClass = "off";
			break;
		default:
			displayClass = "unknown";
	}
	var topic = message.destinationName.split("/");
	if (topic.length == 3){
		var ioname = topic[1];
		UpdateElement(ioname, displayClass);
	}
}








exports.handler = function(event, context, callback) {
    
    callback(null, {"message": "Successfully executed"});
}
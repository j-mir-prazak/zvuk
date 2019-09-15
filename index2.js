#!/usr/bin/node
//modules declaration
var spawner = require('child_process')
var StringDecoder = require('string_decoder').StringDecoder
var events = require('events')
var fs = require('fs')


//clean up
process.on('SIGHUP',  function(){ console.log('\nCLOSING: [SIGHUP]'); process.emit("SIGINT"); })
process.on('SIGINT',  function(){
	 // console.log('\nCLOSING: [SIGINT]');
	 for (var i = 0; i < pids.length; i++) {
		// console.log("KILLING: " + pids[i])
		// console.log(process.kill( pids[i], 0 ))
		if ( process.kill( pids[i], 0 ) ) process.kill( pids[i] )
 	}
	 process.exit(0);
 })
process.on('SIGQUIT', function(){ console.log('\nCLOSING: [SIGQUIT]'); process.emit("SIGINT"); })
process.on('SIGABRT', function(){ console.log('\nCLOSING: [SIGABRT]'); process.emit("SIGINT"); })
process.on('SIGTERM', function(){ console.log('\nCLOSING: [SIGTERM]'); process.emit("SIGINT"); })

var pids = new Array();

function cleanPID(pid) {
	var pid = pid || false
	for (var i = 0; i < pids.length; i++) {
		if ( pids[i] == pid ) {
			pids.splice(i, 1)
			// console.log("PID"+pid+" deleted")
		}
	}
}

var file=""
var assets = new Array();

if ( fs.existsSync('assets')) {

	// console.log("assets folder exists.")

	assets = fs.readdirSync('assets')

	if ( assets.length < 1) {

		// console.log("no assets. default playback.")
		file = "8channel-long.flac"
	}

	else {

		// console.log("assets:")
		// console.log(assets)
		// console.log("playing first.")
		file = "./assets/" + assets[0]

	}
	console.log(file)

}

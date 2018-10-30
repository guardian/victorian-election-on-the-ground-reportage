import xr from 'xr';
import { Voxbox } from './modules/voxbox'
import iframeMessenger from './modules/iframeMessenger'

// 1IR0VsahZ7Vv22ImmPaW3lVGz4R6sEH3hJGN7eraO5O8 // Morwell

// 10k7rSn5Y4x0V8RNyQ7oGDfhLvDqhUQ2frtZkDMoB1Xk  // Cranbourne

// 1WzaGNqtvobZ73bpg69_NbeAiWObC7U4zuvUWXc_-Ax8 // Brunswick

var key = "1WzaGNqtvobZ73bpg69_NbeAiWObC7U4zuvUWXc_-Ax8";

var isApp = (window.location.origin === "file://") ? true : false;

if (isApp) {

	
	iframeMessenger.enableAutoResize();


} else {

	xr.get('https://interactive.guim.co.uk/docsdata/' + key + '.json').then((resp) => {

		let googledoc = resp.data.sheets;

		new Voxbox(googledoc.data,googledoc.settings)
		
	});

}





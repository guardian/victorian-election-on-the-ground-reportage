
import xr from 'xr';
import { Voxbox } from './modules/voxbox'

// 1IR0VsahZ7Vv22ImmPaW3lVGz4R6sEH3hJGN7eraO5O8 // Morwell

var key = "1IR0VsahZ7Vv22ImmPaW3lVGz4R6sEH3hJGN7eraO5O8";

xr.get('https://interactive.guim.co.uk/docsdata/' + key + '.json').then((resp) => {

	let googledoc = resp.data.sheets;

	new Voxbox(googledoc.data,googledoc.settings)
	
});


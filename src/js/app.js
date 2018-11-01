import xr from 'xr';
import { Voxbox } from './modules/voxbox'
import iframeMessenger from './modules/iframeMessenger'
import config from '../../config.json'

var str = config.path;
var target = str.lastIndexOf('/');
var path = str.substring(target + 1);

var electorate = path.split('-')[0];
var part = path.split('-')[1];

var key = (electorate==='brunswick') ? '1WzaGNqtvobZ73bpg69_NbeAiWObC7U4zuvUWXc_-Ax8' : (electorate==='cranbourne') ? '10k7rSn5Y4x0V8RNyQ7oGDfhLvDqhUQ2frtZkDMoB1Xk' : '1IR0VsahZ7Vv22ImmPaW3lVGz4R6sEH3hJGN7eraO5O8' ;

var isApp = (window.location.origin === "file://") ? true : false;

xr.get('https://interactive.guim.co.uk/docsdata/' + key + '.json').then((resp) => {

	let googledoc = resp.data.sheets;

	new Voxbox(googledoc.data, googledoc.settings, isApp, part)
	
});






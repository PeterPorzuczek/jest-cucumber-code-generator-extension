import {
	js }
	from 'js-beautify';

function format(commands, wrap) { 
	const newLine = '\r\n';
	let commandsAsText = commands.join(newLine);
	if (wrap) {
		commandsAsText = wrapInDefineFeature(
			commandsAsText).join(newLine);
		}
		
	return formatJavascript(commandsAsText);
}
function wrapInDefineFeature(commandsAsText) {
	const commandsInDefineFeature = [
		'defineFeature(feature, test => {',
		commandsAsText,
		'});'
	];
    
	return commandsInDefineFeature;
}
function formatJavascript(commands) { 
	const formatedJavascript = js(
		commands,
		{
			indent_size: 2,
			space_in_empty_parent: true
		}
	);
	
	return formatedJavascript;
}

export default {
    format
};
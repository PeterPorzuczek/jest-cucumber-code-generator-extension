import {
	js }
	from 'js-beautify';

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
function wrapInDefinedFeature(commandsAsText) {
	const commandsInDefineFeature = [
		'defineFeature(feature, test => {',
		commandsAsText,
		'});'
	];
    
	return commandsInDefineFeature;
}
function format(commands, wrap) { 
	const newLine = '\r\n';
	let commandsAsText = commands.join(newLine);
	if (wrap) {
		commandsAsText = wrapInDefinedFeature(
			commandsAsText).join(newLine);
		}
		
	return formatJavascript(commandsAsText);
}

export default {
    format
};
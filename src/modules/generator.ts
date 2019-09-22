import
	{ 	parseFeature,
		generateCodeFromFeature }
	from 'jest-cucumber';
import
    formatter
    from './formatter';

function generateCommandsFromFeatureAsText(
	featureAsText,
	selectionInformation
) {
	const feature = parseFeature(featureAsText);
	if (areScenariosPresentIn(feature)) {
		return generateCommands(
			feature,
			selectionInformation
		);
	}
}
function areScenariosPresentIn(feature) {
	return feature.scenarios.length > 0;
}
function generateCommands(
	feature,
	selectionInformation
) {
	if (isFeatureIn(selectionInformation)) {
		return generateFeatureCommands(
			feature
		);
	}
	if (isScenarioIn(selectionInformation)) {
		return generateScenarioCommands(
			feature,
			selectionInformation
		);
	}
	if (isStepIn(selectionInformation)) {
		return generateStepsCommands(
			feature,
			selectionInformation
		);
	}
}
function isFeatureIn(selectionInformation) {
	return selectionInformation.start === 1;
}
function isScenarioIn(selectionInformation) {
	return selectionInformation.text
		.toLowerCase().includes('scenario:');
}
function isStepIn(selectionInformation) {
	return !selectionInformation.text
		.toLowerCase().includes('scenario:');
}
function generateFeatureCommands(
	feature
) {
	let commands = [];
	commands = generateCommandsFrom(feature);
	
	return formatter.format(
		commands, 
		true
	);
}
function generateScenarioCommands(
	feature,
	selectionInformation
) {
	let commands = [];
	feature.scenarios = filterScenariosFrom(
		feature,
		selectionInformation
	);
	commands = generateCommandsFrom(feature);
	
	return formatter.format(
		commands, 
		false
	);
}
function filterScenariosFrom(
	feature,
	selectionInformation
) {
	return feature.scenarios.filter(scenario => {
		const { lineNumber } = scenario;
		const { start, end } = selectionInformation;
		
		return	lineNumber >= start && 
				lineNumber <= end;
	});
}
function generateCommandsFrom(feature) {
	return feature.scenarios.map(scenario =>
		generateCodeFromFeature(
			feature,
			scenario.lineNumber
		));
}
function generateStepsCommands(
	feature,
	selectionInformation
) {
	const commands = [];
	const { start, end } = selectionInformation;
	for (var i = start; i <= end; i++) {
		const command = generateCodeFromFeature(
			feature,
			i
		);
		commands.push(command);
	}
	
	return formatter.format(
		commands, 
		false
	);
}

export default {
    generateCommandsFromFeatureAsText
};
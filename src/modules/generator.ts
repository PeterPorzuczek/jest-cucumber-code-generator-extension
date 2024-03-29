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
function areScenariosPresentIn(feature) {
	return feature.scenarios.length +
		feature.scenarioOutlines.length > 0;
}
function isStepIn(selectionInformation) {
	return !selectionInformation.text
		.toLowerCase().includes('scenario:');
}
function isScenarioIn(selectionInformation) {
	return selectionInformation.text
		.toLowerCase().includes('scenario:');
}
function isFeatureIn(selectionInformation) {
	return selectionInformation.start === 1;
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
		feature.scenarios,
		selectionInformation
	);
	feature.scenarioOutlines = filterScenariosFrom(
		feature.scenarioOutlines,
		selectionInformation
	);
	commands = generateCommandsFrom(feature);
	
	return formatter.format(
		commands, 
		false
	);
}
function filterScenariosFrom(
	scenarios,
	selectionInformation
) {
	return scenarios.filter(scenario => {
		const { lineNumber } = scenario;
		const { start, end } = selectionInformation;
		
		return	lineNumber >= start && 
				lineNumber <= end;
	});
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
function generateCommandsFrom(feature) {
	return feature.scenarios
		.concat(feature.scenarioOutlines)
		.sort((a, b) =>
			Math.sign(a.lineNumber - b.lineNumber))
		.map(scenario =>
		generateCodeFromFeature(
			feature,
			scenario.lineNumber
		));
}

export default {
    generateCommandsFromFeatureAsText
};
Feature: Rocket Launching

	Scenario Outline: Launching a SpaceX rocket
		Given I am Elon Musk attempting to launch a rocket into space
		When I launch the rocket <number>
		Then the launch is a <outcome>

		Examples: Rocket examples
			| number | outcome |
			| one    | failure |
			| two    | success |

	Scenario: Launching SpaceX rocket two
		Given I am Elon Musk attempting to launch a rocket into space
		When I launch the rocket
		Then the rocket should end up in space
		And the booster(s) should land back on the launch pad
		And nobody should doubt me ever again
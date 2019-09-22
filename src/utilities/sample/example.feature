Feature: Rocket Launching

	Scenario: Launching a SpaceX rocket one
		Given I am Elon Musk attempting to launch a rocket into space

	Scenario: Launching a SpaceX rocket two
		Given I am Elon Musk attempting to launch a rocket into space
		When I launch the rocket
		Then the rocket should end up in space
		And the booster(s) should land back on the launch pad
		And nobody should doubt me ever again
# Project
- [Project](#project)
  - [Task](#task)
  - [Constraints](#constraints)
  - [Base functionality](#base-functionality)
  - [Concept](#concept)
    - [Upgrades](#upgrades)
  - [Game design](#game-design)
  - [Game loop](#game-loop)
  - [Game elements](#game-elements)
  - [Screens](#screens)
  - [Soundtrack](#soundtrack)
  - [POC](#poc)


## Task
Create a Retro Jump-and-Run game with at least 1 level.

## Constraints
- use CSS-Transformations and CSS-DOM-Manipulations
- Don't use canvas
- Don't use Game-Libraries or Frameworks

## Base functionality
- Scrolling and parallax scrolling (with Camera)
- Sprite class for all figures
- Gameloop
- Navigation with cursor or ASDW-keys and animations
- Collision check with background elements
- Kollision check with enemies
- 2 special animations
- Background sound and other sound effects
- High score
- Read and write of a share highscore board

## Concept
The idea is to make a wheelchair jump-and-run game. As wheelchairs do not jump, the game concept will replace jumping with removing obstacles, like stairs or other small obstacles.

## Level design
The level design could be based on public transport. As public transport is still not fully accessible, this could also lead to multiple levels.

- Level 1: Current situation
  - some train stations not being accessible at all
    - taking bus instead
    - scheduling a shuttle
  - some stations needing assistance
    - leaving the train with ramps and assistive personnel
    - leaving the tram/bus with the train drive exiting the vehicle and adding a ramp
  - steep climbs at stations
- Level 2: Desired situation
  - entry/exit without assistance
  - no planning required beforehand

Based on these levels, the first level has to be accomplished at least 5 times, until level 2 is accomplished. This is done to highlight the big efforts disabled people have to make until public transport is accessible.

Other aspects to include:
- Taking the time to study train stations
  - Knowing which way to take with e.g. elevators
  - Finding out, if it is accessible
  - Finding alternative routes

### Upgrades
The game allows for different upgrades, which can be won by spinning the IV-Wheel-of-Fortune.
Upgrade could be:
- Smartdrive
- Assistive Person(Allowance for an assistive person)
- Better wheelchair
- Bigger biceps(Training)

## Game design
Based on the level design the game design could have the following flow:
- Selecting a trip
  - Visiting someone in Siebnen-Wangen
  - Visiting someone in Bern

Some trips might not be possible without an upgrade.

The player must also take into account, that the trips are all not fully-accessible. Therefore, they have to schedule assistive help.

## Game loop
As for the game loop, the player has to repeatedly press a button to push the wheelchair. The player stumbles upon multiple obstacles to overcome. For these obstacles, the player has to lift the front of the wheelchair just the right amount without falling back, also having to lean forward. The player then will enter multiple public transport vehicles, that will transport the player to another destination. If the player has not taken into account, that the trip had to be planned carefully, the player will fail.

## Game elements
- Player
- Bus
- Train
- Tram
- Ramps
- Public transport signs
- Road
- Stairs

## Screens
- Start
- Win
- Loose
- Highscore

## Soundtrack

## POC
A block, moving forward with multiple presses. When encountering an obstacle, tilting and then going onto the next platform.
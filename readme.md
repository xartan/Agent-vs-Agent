# Agent vs Agent

A javascript based robot vs robot game.

## Details

Agent vs Agent is a game for programmers. The goal of the game is to write an AI that is better in collecting points than the other team.

The game is turn based. The gaming field is a 8x8 discrete field (much like a chess board). Each team gets 3 instances of the programmed agent. The GameMaster dictates the interaction of the agents between each other and their environment.

An agent may choose one of 3 actions: move, communicate or collect.

All points are distributed at random.

To collect a point an agent has to stand on the same base as the point, collect it and return to the teams homebase.

There is no limit to the amount of entities that occupy the same base on the board.
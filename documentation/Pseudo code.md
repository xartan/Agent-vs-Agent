# Game Creation

Game Master:

 - create GamingField
 - remember that (0,0) belongs to Team A
 - remember that (7,7) belongs to Team B
 - distribute points (randomly)
 - create 3 Agents per Team and place them on their homebase
 - determin acting order
 - initiante agents

# Game Loop
<pre>
while ( scored points < distributed points)
  for each agent in acting order:
   - notify agent about entities in its vicinity (also tell what kind of entity it is {enemy, point, friend})
   - ask agent to choose one of these actions: {move, collect, communicate}
   if move:
   	ask agent for direction
   	move agent if possible
   	tell agent its new position
   if collect:
   	if successfully collected: 
   		tell agent that it has a point
   if communicate:
   	ask agent for message
   	send message to all its friends

   if(agent on homebase AND agent has point):
   	- score for agents team
   	- send message to all agents of this team
</pre>

# Game Over
 .. do statictis stuff if you like





# Software Requirements for OnPar

## Features

### User Account
1. 

### User Connections
1. Users can become friends with other users by _user_name_.
2. Users must approve friend requests.

### Tournaments (Opens)

1. Users can create their own tournaments.
2. Users can be responsible for multiple tournaments at a time.
3. Users can join other tournaments.
4. Users can be involved with multiple tournaments at a time.
5. Tournaments can have a title, description, list of participants, start date, and end date (default lenght: 28 days).
6. Tournaments (eventually) conclude with a winner.
7. Tournaments can track history.
8. Tournaments have a leader board.
9. All elements of a tournament (besides start date) can be edited after the tournament's creation.
10. No users can join after the start of a tournament.
11. Users can upload custom badge images.

### Rounds

1. Users can define the length of a round (default: 7 days).
2. Users can name rounds (default: no name).
3. Each round concludes with a leaderboard and round leader.

### Tasks (Holes)

1. Users can create tasks for a tournament.
2. All users in the tournament can adjust and update their own task inputs.
3. Task inputs can include incrementing, entering a value (string, float, integer), selecting a boolean.

#### Scored Tasks

1. Users can define the task behavior as long as it has some numeric scoring mechanism.
2. The task must have some expected score per round (the sum of all expected scores creates par).

#### Non-Scored Tasks

1. Users can enter values to track their non-scored task.
2. Entering a value counts as one point.

### Scoring Rules

1. A users score is calculated as _sum of earned points_ – _sum of completion points_ (essentially creating a relation to par).
2. Users can see their own scores at all times.
3. Users can see the scores of their opponents at the end of each round.

### Leaderboards

#### Tournament Leaderboards

1. Tournament leaderboards will be updated at the completion of each round.
2. Users can sort leaderboard by _user_name_ (alphabetical), _score_, _total_score_earned_.

#### Friend Leaderboards

1. Users can view the all-time leaderboards from their pool of friends.
2. Leaderboard will display: _user_, _number of tournaments completed_, _number of badges_, _total points earned_, and _average differential per round_.
3. Users can sort leaderboard by _user_name_ (alphabetical), _number of badges_, _total points earned_, and _average differential per round_

### Badges (Trophy)

1. Each tournament win earns the user a badge.
2. Users can display their badges on a badge wall.

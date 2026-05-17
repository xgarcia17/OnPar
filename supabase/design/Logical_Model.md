# OnPar Database Logical Model

1. <strong>Users(</strong><u>Id</u><strong>)</strong>
   - Primary key: Id
   - Foreign Key: None
   - Fields:
     - Id (string): unique internal database identifier
     - Username (string): unique, user-chosen identifier for public visibility
     - FirstName (string): user's first name
     - LastName (string): user's last name
     - Email (string): user's unique email
     - Status (string): user status (ACTIVE, HIDDEN, DEACTIVATED)
     - CreatedAt (date): date the user created their account

<br>

2. <strong>Tournaments(</strong><u>Id</u>, CreatedBy<strong>)</strong>
   - Primary key: Id
   - Foreign key: CreatedBy (Users.Id)
   - Fields:
     - Id (string): unique identifier
     - Name (string): name of tournament
     - CreatedBy (string): the user who created the tournament
     - RoundLength (integer): the number of hours each round lasts for
     - StartDate (date): the hour and date the tournament begins
     - MaxRounds (integer): the number of rounds the tournament will last for
     - InviteCode (string): unique code for public visibility
     - CreatedAt (date): date the tournament is created

<br>

3. <strong>Friends(</strong><u>Id</u>, SenderId, RecipientId<strong>)</strong>
   - Primary key: Id
   - Foreign keys: SenderId (Users.Id), RecipientId (Users.Id)
   - Fields:
     - Id (string): unique identifier
     - SenderId (string): user who sent the friend request
     - RecipientId (string): user who accepted the friend request
     - Status (string): status of the friendship (ACCEPTED, REJECTED, PENDING)
     - DateSent (date): date the friend request was sent
     - DateResponded (date): date the recipient acted on the request

<br>

4. <strong>TournamentParticipation(</strong><u>ParticipantId</u>, <u>TournamentId</u><strong>)</strong>
   - Primary key: Participant, Tournament
   - Foreign keys: ParticipantId (Users.Id), TournamentId (Tournaments.Id)
   - Fields:
     - ParticipantId (string): user participating in the tournament
     - TournamentId (string): tournament being participated in
     - DateJoined (date): date the participant joined

<br>

5. <strong>Trophies(</strong><u>TournamentId</u>, <u>Name</u>, WinnerId<strong>)</strong>
   - Primary key: Tournament, Name
   - Foreign key: Tournament (Tournaments.Id), Winner (Users.Id)
   - Fields:
     - Tournament (string): tournament where the trophy originates
     - Name (string): name of the trophy (unique to the tournament)
     - Winner (string): user who wins the trophy
     - AwardDate (date): date winner won
     - Icon: TBD - visual representation of the trophy

<br>

6. <strong>Rounds(</strong><u>Tournament</u>, <u>Ordinal</u><strong>)</strong>
   - Primary key: Tournament, Ordinal
   - Foreign key: Tournament (Tournaments.Id)
   - Fields:
     - Tournament (string): tournament the round is a part of
     - Ordinal (integer): order which the round occurs
     - StartDate (date): start date for the round to the hour
     - EndDate (date): end date for the round to the hour

<br>

7. <strong>Tasks(</strong><u>Tournament</u>, <u>Name</u>, CreatedBy, ScoringFunctionId<strong>)</strong>
   - Primary key: Tournament, Name
   - Foreign keys: Tournament (Tournaments.Id), CreatedBy (Users.Id), ScoringFunctionId (ScoringFunctions.Id)
   - Fields:
     - Tournament (string): tournament the task is a part of
     - Name (string): name of the task
     - Type (string): the type of task (SCORE, COMPLETION)
     - CreatedBy (string): user who created the task
     - ScoringFunctionId (string): identifier for the scoring function to be used
     - ScoringFunctionType (string): the type of scoring function (NUMERIC, DISCRETE, CONTINUOUS)
     - ParValue (integer): score that would earn par (expected for even score)

<br>

8. <strong>ProgressTask(</strong><u>Id</u>, Tournament, TaskName, User<strong>)</strong>
   - Primary key: Id (a unique transaction Id, rather than candidate keys with timestamp)
   - Foreign keys: Tournament (Tasks.Id), TaskName (Tasks.Name), User (Users.Id)
   - Fields:
     - Id (string): unique identifier for progress entry
     - Tournament (string): tournament the task is for
     - TaskName (string): name of the task
     - User (string): user who is progressing the task

<br>

9. <strong>RoundResults(</strong><u>Tournament</u>, <u>Ordinal</u>, <u>TaskName</u>, <u>User</u><strong>)</strong>
   - Primary key: Tournament, Ordinal, TaskName, User
   - Foreign keys: Tournament (Tournaments.Id), Ordinal (Tournaments.Id), TaskName (Tasks.Name), User (Users.Id)
   - Fields:
     - Tournament (string): tournament the results are for
     - Ordinal (integer): the round number the results are for
     - TaskName (string): the name of the task the results are for
     - User (string): the user the results are for

<br>

10. <strong>NumericScoringFunctions(</strong><u>Tournament</u>, <u>Name</u><strong>)</strong>
    - Primary key: Tournament, Name
    - Foreign keys: Tournament (Tournaments.Id), Name (Tasks.Name)
    - Fields:
      - Tournament (string): the tournament the function is for
      - Name (string): the name of the task the function is for
      - Negative (boolean): whether to add or subtract the score

11. <strong>DiscreteScalerScoringFunctions(</strong><u>Tournament</u>, <u>Name</u><strong>)</strong>
    - Primary key: Tournament, Name
    - Foreign keys: Tournament (Tournaments.Id), Name (Tasks.Name)
    - Fields:
      - Tournament (string): the tournament the function is for
      - Name (string): the name of the task the function is for
      - ScoreIncrement (integer): the amount the score should increase per input increment
      - InputIncrement (integer): the increment of input that awards a new score

12. <strong>ContinuousScoringFunctions(</strong><u>Tournament</u>, <u>Name</u><strong>)</strong>
    - Primary key: Tournament, Name
    - Foreign keys: Tournament (Tournaments.Id), Name (Tasks.Name)
    - Fields:
      - Tournament (string): the tournament the function is for
      - Name (string): the name of the task the function is for
      - MinScore (integer): the minimum value enterable for the round
      - MaxScore (integer): the maximum value enterable for the round

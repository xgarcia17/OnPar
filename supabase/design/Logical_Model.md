# OnPar Database Logical Model

1. <strong>Users(</strong><u>Id</u><strong>)</strong>
   - Primary key: Id
   - Foreign Key: None
   - Fields:
     - Id (uuid): unique internal database identifier
     - Username (string): unique, user-chosen identifier for public visibility
     - FirstName (string): user's first name
     - LastName (string): user's last name
     - Email (string): user's unique email
     - Status (string): user status (ACTIVE, DELETED)
     - CreatedAt (date): date the user created their account

<br>

2. <strong>Tournaments(</strong><u>Id</u>, CreatedBy<strong>)</strong>
   - Primary key: Id
   - Foreign key: CreatedBy (Users.Id)
   - Fields:
     - Id (uuid): unique identifier
     - Name (string): name of tournament
     - CreatedBy (uuid): the user who created the tournament
     - RoundLength (integer): the number of hours each round lasts for
     - StartDate (date): the hour and date the tournament begins
     - MaxRounds (integer): the number of rounds the tournament will last for
     - InviteCode (uuid): unique code for public visibility
     - CreatedAt (date): date the tournament is created

<br>

3. <strong>Friends(</strong><u>Id</u>, SenderId, RecipientId<strong>)</strong>
   - Primary key: Id
   - Foreign keys: SenderId (Users.Id), RecipientId (Users.Id)
   - Fields:
     - Id (uuid): unique identifier
     - SenderId (uuid): user who sent the friend request
     - RecipientId (uuid): user who accepted the friend request
     - Status (string): status of the friendship (ACCEPTED, REJECTED, PENDING, CANCELED)
     - DateSent (date): date the friend request was sent
     - DateResponded (date): date the recipient acted on the request

<br>

4. <strong>TournamentParticipation(</strong><u>TournamentId</u>, <u>ParticipantId</u><strong>)</strong>
   - Primary key: TournamentId, ParticipantId
   - Foreign keys: ParticipantId (Users.Id), TournamentId (Tournaments.Id)
   - Fields:
     - ParticipantId (uuid): user participating in the tournament
     - TournamentId (uuid): tournament being participated in
     - DateJoined (date): date the participant joined

<br>

5. <strong>Trophies(</strong><u>TournamentId</u>, <u>Name</u>, WinnerId<strong>)</strong>
   - Primary key: TournamentId, Name
   - Foreign key: TournamentId (Tournaments.Id), Winner (Users.Id)
   - Fields:
     - TournamentId (uuid): tournament where the trophy originates
     - Name (string): name of the trophy (unique to the tournament)
     - Winner (uuid): user who wins the trophy
     - AwardDate (date): date winner won

<br>

6. <strong>Rounds(</strong><u>TournamentId</u>, <u>Ordinal</u><strong>)</strong>
   - Primary key: TournamentId, Ordinal
   - Foreign key: TournamentId (Tournaments.Id)
   - Fields:
     - TournamentId (uuid): tournament the round is a part of
     - Ordinal (integer): order which the round occurs
     - StartDate (date): start date for the round to the hour
     - EndDate (date): end date for the round to the hour

<br>

7. <strong>ScoringFunctions(</strong><u>Id</u><strong>)</strong>
   - Primary key: Id
   - Foreign key: NONE
   - Fields:
     - Id (uuid): unique identifier
     - Type (string): type of scoring function (NUMERIC, DISCRETE, CONTINUOUS)
     - CreatedAt (date): date scoring function is created

<br>

8. <strong>NumericScoringFunctions(</strong><u>Id</u><strong>)</strong>
   - Primary key: Id
   - Foreign keys: Id (ScoringFunctions.Id)
   - Fields
     - Id (uuid): unique identifier
     - Negative (boolean): whether to add or subtract the score

<br>

9. <strong>DiscreteScalerScoringFunctions(</strong><u>Id</u><strong>)</strong>
   - Primary key: Id
   - Foreign key: Id (ScoringFunctions.Id)
   - Fields:
     - Id (uuid): unique identifier
     - ScoreIncrement (integer): the amount the score should increase per input increment
     - InputIncrement (integer): the increment of input that awards a new score

<br>

10. <strong>ContinuousScoringFunctions(</strong><u>Id</u><strong>)</strong>
    - Primary key: Id
    - Foreign key: Id (ScoringFunctions.Id)
    - Fields:
      - Id (uuid): unique identifier
      - MinScore (integer): the minimum value enterable for the round
      - MaxScore (integer): the maximum value enterable for the round

<br>

11. <strong>Tasks(</strong><u>TournamentId</u>, <u>Name</u>, CreatedBy, ScoringFunctionId<strong>)</strong>
    - Primary key: TournamentId, Name
    - Foreign keys: TournamentId (Tournaments.Id), CreatedBy (Users.Id), ScoringFunctionId (ScoringFunctions.Id)
    - Fields:
      - TournamentId (uuid): tournament the task is a part of
      - Name (string): name of the task
      - Type (string): the type of task (SCORING, COMPLETION)
      - CreatedBy (uuid): user who created the task
      - ScoringFunctionId (uuid): identifier for the scoring function to be used
      - Par (integer): score that would earn par (expected for even score)

<br>

12. <strong>ProgressScoringTask(</strong><u>Id</u>, TournamentId, TaskName, UserId<strong>)</strong>
    - Primary key: Id
    - Foreign keys: TournamentId (Tasks.Id), TaskName (Tasks.Name), UserId (Users.Id)
    - Fields:
      - Id (uuid): unique identifier for progress entry
      - TournamentId (uuid): tournament the task is for
      - TaskName (string): name of the task
      - User (uuid): user who is progressing the task
      - ScoreInput (integer): value inputted by the user

<br>

13. <strong>ProgressCompletionTask(</strong><u>Id</u>, TournamentId, TaskName, UserId<strong>)</strong>
    - Primary key: Id (a unique transaction Id, rather than candidate keys with timestamp)
    - Foreign keys: TournamentId (Tasks.Id), TaskName (Tasks.Name), UserId (Users.Id)
    - Fields:
      - Id (uuid): unique identifier for progress entry
      - TournamentId (uuid): tournament the task is for
      - TaskName (string): name of the task
      - UserId (uuid): user who is progressing the task

<br>

14. <strong>RoundResults(</strong><u>TournamentId</u>, <u>Ordinal</u>, <u>TaskName</u>, <u>UserId</u><strong>)</strong>
    - Primary key: TournamentId, Ordinal, TaskName, UserId
    - Foreign keys: TournamentId (Tournaments.Id), Ordinal (Tournaments.Id), TaskName (Tasks.Name), UserId (Users.Id)
    - Fields:
      - TournamentId (uuid): tournament the results are for
      - Ordinal (integer): the round number the results are for
      - TaskName (string): the name of the task the results are for
      - UserId (uuid): the user the results are for

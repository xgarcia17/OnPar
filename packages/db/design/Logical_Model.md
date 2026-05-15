# OnPar Database Logical Model

1. **Users(**<u>Id</u>**)**
   - Primary key: Id
   - Foreign Key: None
   - Fields:
     - Id: string
     - Username: string
     - FirstName: string
     - LastName: string
     - Email: string
     - CreatedAt: date

<br>

2. **Tournaments(**<u>Id</u>, CreatedBy, CreatedAt **)**
   - Primary key: Id
   - Foreign key: CreatedBy (Users.Id)
   - Fields:
     - Id: string
     - Name: string
     - CreatedBy: string
     - RoundLength: integer
     - StartDate: date
     - MaxRounds: integer
     - InviteCode: string
     - CreatedAt: date

<br>

3. **Friends(**<u>SenderId</u>, <u>RecipientId</u>**)**
   - Primary key: SenderId, RecipientId
   - Foreign keys: SenderId (Users.Id), RecipientId (Users.Id)
   - Fields:
     - SenderId: string
     - RecipientId: string
     - Status: string
     - DateSent: date
     - DateResponded: date

<br>

4. **TournamentParticipation(**<u>Participant</u>, <u>Tournament</u>**)**
   - Primary key: Participant, Tournament
   - Foreign keys: Participant (Users.Id), Tournament (Tournaments.Id)
   - Fields:
     - Participant: string
     - Tournament: string

<br>

5. **Trophies(**<u>Tournament</u>, <u>Type</u>**)**
   - Primary key: Tournament, Type
   - Foreign key: Tournament (Tournaments.Id), User (Users.Id)
   - Fields:
     - Tournament: string
     - Type: string
     - Winner: string
     - Icon: TBD

<br>

6. **Rounds(**<u>Tournament</u>, <u>Ordinal</u>**)**
   - Primary key: Tournament, Ordinal
   - Foreign key: Tournament (Tournaments.Id)
   - Fields:
     - Tournament: string
     - Ordinal: integer
     - StartDate: date
     - EndDate: date

<br>

7. **Tasks(**<u>Tournament</u>, <u>Name</u>, CreatedBy, ScoringFunctionId**)**
   - Primary key: Tournament, Name
   - Foreign keys: Tournament (Tournaments.Id), CreatedBy (Users.Id), ScoringFunction (ScoringFunctions.Id)
   - Fields:
     - Tournament: string
     - Name: string
     - Type: string
     - CreatedBy: string
     - ScoringFunctionId: string
     - ScoringFunctionType: string (scaler or non-scaler)
     - ParValue: integer

<br>

8. **ProgressTask(**<u>Id</u>, Tournament, Name, User**)**
   - Primary key: Id (a unique transaction Id, rather than candidate keys with timestamp)
   - Foreign keys: Tournament (Tasks.Id), Name (Tasks.Name), User (Users.Id)

<br>

9. **RoundResults(**<u>Tournament</u>, <u>Ordinal</u>, <u>TaskName</u>, <u>User</u>**)**
   - Primary key: Tournament, Ordinal, TaskName, User
   - Foreign keys: Tournament (Tournaments.Id), Ordinal (Tournaments.Id), TaskName (Tasks.Name), User (Users.Id)

<br>

10. **NumericScoringFunctions(**<u>Tournament</u>, <u>Name</u>**)**
    - Primary key: Tournament, Name
    - Foreign keys: Tournament (Tournaments.Id), Tasks (Tasks.Name)
    - Fields:
      - Tournament: string
      - Name: string
      - Negative: boolean

11. **DiscreteScalerScoringFunctions(**<u>Tournament</u>, <u>Name</u>**)**
    - Primary key: Tournament, Name
    - Foreign keys: Tournament (Tournaments.Id), Tasks (Tasks.Name)
    - Fields:
      - Tournament: string
      - Name: string
      - ScoreIncrement: integer
      - InputIncrement: integer

12. **ContinuousScalerScoringFunctions(**<u>Tournament</u>, <u>Name</u>**)**
    - Primary key: Tournament, Name
    - Foreign keys: Tournament (Tournaments.Id), Tasks (Tasks.Name)
    - Fields:
      - Tournament: string
      - Name: string
      - MinScore: integer
      - MaxScore: integer

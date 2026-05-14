# OnPar Database Logical Model

1. **Users(**<u>Id</u>**)**
   a. Primary key: Id
2. **Tournaments(**<u>Id</u>, CreatedBy**)**
   a. Primary key: Id
   b. Foreign key: CreatedBy (Users)
3. **Friends(**<u>SenderId</u>, <u>RecipientId</u>**)**
   a. Primary key: SenderId, RecipientId
   b. Foreign keys: SenderId (Users), RecipientId (Users)
4. **TournamentParticipation(**<u>Participant, Tournament</u>**)**
   a. Primary key: Participant, Tournament
   b. Foreign keys: Participant (Users), Tournament (Tournaments)
5. **Trophies(**<u>Tournament</u>, <u>Type</u>**)**
   a. Primary key: Tournament, Type
   b. Foreign key: Tournament (Tournaments)
6. **TrophyWinners(**<u>Tournament</u>, <u>Type</u>, User**)**
   a. Primary key: Tournament, Type
   b. Foreign keys: Tournament & Type (Trophies), User (Users)
7. **Rounds(**<u>Tournament</u>, <u>Ordinal</u>**)**
   a. Primary key: Tournament, Ordinal
   b. Foreign key: Tournament (Tournaments)
8. **Tasks(**<u>Tournament</u>, <u>Name</u>, Type, CreatedBy**)**
   a. Primary key: Tournament, Name
   b. Foreign keys: Tournament (Tournaments), CreatedBy (Users)
9. **ProgressTask(**<u>Id</u>, Tournament, Name, User**)**
   a. Primary key: Id (a unique transaction Id, rather than candidate keys with timestamp)
   b. Foreign keys: Tournament & Name (Tasks), User (User)
10. **RoundResults(**<u>Tournament</u>, <u>Ordinal</u>, <u>TaskName</u>, <u>User</u>**)**
    a. Primary key: Tournament, Ordinal, TaskName, User
    b. Foreign keys: Tournament & Ordinal (Rounds), Tournament & TaskName (Tasks), User (Users)

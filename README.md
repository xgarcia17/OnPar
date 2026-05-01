# OnPar (https://github.com/xgarcia17/OnPar)

## The Idea

**OnPar** is here to gameify the goals you set for yourself with your friends!

### Description

**OnPar** allows you to create your own _tournament_—set of goals to work towards—for however long you'd like. While your tournament is ongoing, create your own custom sub-goals or sub-tasks to complete. To track your incremental progress toward your goals, configure the length of a _round_—a time interval that occurs within a tournament. When each round is up, your progress will be quantified with a score relative to par, which is set when you create your goals.

## The Technology

**(Web) Next.js frontend with React and Typescript**
The frontend will allow users to sign in, make friends, and create their goals and configure the rules for their tournaments.

**(possible Mobile) To Be Determined...**

**Node.js REST API Express backend**
Provides a clean backend API for any frontend client to connect to. This is where most of the app functionality will occur.

**PostgreSQL database (potentially with Prisma)**
Allows storage of tournament information, users, and friend connections.

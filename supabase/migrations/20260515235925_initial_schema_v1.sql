-- users table schema
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT users_status_check
        CHECK (status IN ('ACTIVE', 'DELETED'))
);

-- tournaments table schema
CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_by UUID NOT NULL,
    round_length INTEGER NOT NULL CHECK (round_length > 0),
    start_date TIMESTAMPTZ,
    max_rounds INTEGER NOT NULL CHECK (max_rounds > 0),
    invite_code UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT tournaments_created_by_fk
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE RESTRICT
);

-- friendships table schema
CREATE TABLE friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL,
    recipient_id UUID NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING',
    date_sent TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_responded TIMESTAMPTZ,

    CONSTRAINT friendships_sender_id_fk
        FOREIGN KEY (sender_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    
    CONSTRAINT friendships_recipient_id_fk
        FOREIGN KEY (recipient_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT friendships_status_check
        CHECK (status IN ('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELED')),
    
    CONSTRAINT friendships_not_self_check
        CHECK (sender_id <> recipient_id)
);

-- prevent friend request UserA -> UserB if UserB -> UserA exists
CREATE UNIQUE INDEX friendships_unique_user_pair
ON friendships (
    LEAST(sender_id, recipient_id),
    GREATEST(sender_id, recipient_id)
);

-- tournament participation table schema
CREATE TABLE tournament_participation (
    tournament_id UUID NOT NULL,
    participant_id UUID NOT NULL,
    date_joined TIMESTAMPTZ NOT NULL DEFAULT now(),

    PRIMARY KEY (tournament_id, participant_id),

    CONSTRAINT tournament_participation_tournament_id_fk
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE,

    CONSTRAINT tournament_participation_participant_id_fk
        FOREIGN KEY (participant_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
);

-- trophies table schema
CREATE TABLE trophies (
    tournament_id UUID NOT NULL,
    name TEXT NOT NULL,
    winner_id UUID,
    award_date TIMESTAMPTZ NOT NULL DEFAULT now(),

    PRIMARY KEY (tournament_id, name),

    CONSTRAINT trophies_tournament_id_fk
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE,

    CONSTRAINT trophies_winner_participation_fk
        FOREIGN KEY (tournament_id, winner_id)
        REFERENCES tournament_participation(tournament_id, participant_id)
        ON DELETE RESTRICT
);

-- rounds table schema
CREATE TABLE rounds (
    tournament_id UUID NOT NULL,
    ordinal INTEGER NOT NULL DEFAULT 1,
    start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_date TIMESTAMPTZ NOT NULL,

    PRIMARY KEY (tournament_id, ordinal),

    CONSTRAINT rounds_tournament_id_fk
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE,

    CONSTRAINT rounds_date_order_check
        CHECK (end_date > start_date)
);

-- parent scoring functions table
CREATE TABLE scoring_functions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('NUMERIC', 'DISCRETE', 'CONTINUOUS')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- numeric scoring functions table schema
CREATE TABLE numeric_scoring_functions (
    id UUID PRIMARY KEY,
    negative BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT numeric_scoring_function_id_fk
        FOREIGN KEY (id)
        REFERENCES scoring_functions(id)
        ON DELETE CASCADE
);

-- discrete scoring functions table schema
CREATE TABLE discrete_scoring_functions (
    id UUID PRIMARY KEY,
    score_increment INTEGER NOT NULL CHECK (score_increment <> 0),
    input_increment INTEGER NOT NULL CHECK (input_increment <> 0),

    CONSTRAINT discrete_scoring_function_id_fk
        FOREIGN KEY (id)
        REFERENCES scoring_functions(id)
        ON DELETE CASCADE
);

-- continuous scoring functions table schema
CREATE TABLE continuous_scoring_functions (
    id UUID PRIMARY KEY,
    min_score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,

    CONSTRAINT continuous_scoring_function_order
        CHECK (min_score < max_score AND max_score > 0),

    CONSTRAINT continuous_scoring_function_id_fk
        FOREIGN KEY (id)
        REFERENCES scoring_functions(id)
        ON DELETE CASCADE
);

-- tasks table schema
CREATE TABLE tasks (
    tournament_id UUID NOT NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('SCORING', 'COMPLETION')),
    created_by UUID NOT NULL,
    scoring_function_id UUID,
    par INTEGER NOT NULL CHECK (par >= 0),

    PRIMARY KEY (tournament_id, name),

    CONSTRAINT tasks_scoring_function_required_check
        CHECK (
            (type = 'SCORING' AND scoring_function_id IS NOT NULL)
            OR
            (type = 'COMPLETION' AND scoring_function_id IS NULL)
        ),

    CONSTRAINT tasks_tournament_id_fk
        FOREIGN KEY (tournament_id)
        REFERENCES tournaments(id)
        ON DELETE CASCADE,
    
    CONSTRAINT tasks_created_by_fk
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE RESTRICT,

    CONSTRAINT tasks_scoring_function_id_fk
        FOREIGN KEY (scoring_function_id)
        REFERENCES scoring_functions(id)
        ON DELETE RESTRICT
);

-- progress scoring task table schema
CREATE TABLE progress_scoring_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL,
    task_name TEXT NOT NULL,
    user_id UUID NOT NULL,
    score_input INTEGER NOT NULL,

    CONSTRAINT progress_scoring_tasks_task_fk
        FOREIGN KEY (tournament_id, task_name)
        REFERENCES tasks(tournament_id, name)
        ON DELETE CASCADE,

    CONSTRAINT progress_scoring_tasks_participation_fk
        FOREIGN KEY (tournament_id, user_id)
        REFERENCES tournament_participation(tournament_id, participant_id)
        ON DELETE RESTRICT
);

-- progress completion task table schema
CREATE TABLE progress_completion_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL,
    task_name TEXT NOT NULL,
    user_id UUID NOT NULL,
    value_input TEXT NOT NULL, -- what user inputs (score = par)

    CONSTRAINT progress_completion_tasks_task_fk
        FOREIGN KEY (tournament_id, task_name)
        REFERENCES tasks(tournament_id, name)
        ON DELETE CASCADE,

    CONSTRAINT progress_completion_tasks_participation_fk
        FOREIGN KEY (tournament_id, user_id)
        REFERENCES tournament_participation(tournament_id, participant_id)
        ON DELETE RESTRICT
);

-- round results table schema
CREATE TABLE round_results (
    tournament_id UUID NOT NULL,
    ordinal INTEGER NOT NULL,
    task_name TEXT NOT NULL,
    user_id UUID NOT NULL,
    score INTEGER NOT NULL,

    PRIMARY KEY (tournament_id, ordinal, task_name, user_id),

    CONSTRAINT round_results_rounds_fk
        FOREIGN KEY (tournament_id, ordinal)
        REFERENCES rounds(tournament_id, ordinal)
        ON DELETE CASCADE,

    CONSTRAINT round_results_tasks_fk
        FOREIGN KEY (tournament_id, task_name)
        REFERENCES tasks(tournament_id, name)
        ON DELETE CASCADE,

    CONSTRAINT round_results_participation_fk
        FOREIGN KEY (tournament_id, user_id)
        REFERENCES tournament_participation(tournament_id, participant_id)
        ON DELETE RESTRICT
);
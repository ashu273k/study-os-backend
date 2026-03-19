CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id           UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    email        VARCHAR(255)  NOT NULL UNIQUE,
    password     VARCHAR(255)  NOT NULL,
    name         VARCHAR(100)  NOT NULL,
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
--         CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed');
--     END IF;
-- END
-- $$;

CREATE TABLE IF NOT EXISTS tasks (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID         NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT, 
    status      task_status  NOT NULL DEFAULT 'pending',
    subject     VARCHAR(100),
    due_date    DATE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'resource_type') THEN
--         CREATE TYPE resource_type AS ENUM ('note', 'link', 'file');
--     END IF;
-- END
-- $$;

CREATE TABLE IF NOT EXISTS resources (
    id         UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title      VARCHAR(255)  NOT NULL,
    type       resource_type NOT NULL,
    content    TEXT,    
    url        VARCHAR(2048),
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    CONSTRAINT check_resource_fields CHECK (
        (type = 'link' AND url IS NOT NULL) OR
        (type = 'note' AND content IS NOT NULL) OR
        (type = 'file')
    )
);

CREATE TABLE IF NOT EXISTS progress (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id     UUID        NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    percent     SMALLINT    NOT NULL CHECK (percent >= 0 AND percent <= 100),
    note        TEXT,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS id_tasks_user_id       ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_resources_user_id  ON resources(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_task_id   ON progress(task_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status       ON tasks(status);
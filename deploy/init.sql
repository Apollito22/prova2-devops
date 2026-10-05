CREATE TABLE IF NOT EXISTS classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL CHECK (length(trim(name)) > 0),
    shift VARCHAR(20) NOT NULL CHECK (shift IN ('matutino', 'vespertino', 'noturno')),
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    start_date DATE NOT NULL
);

INSERT INTO classes (name, shift, capacity, start_date) VALUES
    ('Sistemas de Informação', 'noturno', 35, '2026-08-03'),
    ('Turma de DevOps', 'noturno', 30, '2026-10-05'),
    ('Programação Web', 'matutino', 25, '2026-08-03');

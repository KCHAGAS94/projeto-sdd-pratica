## ADDED Requirements

### Requirement: Task notes
The system SHALL allow a task to carry an optional free-text notes field, in addition to its title. Notes MAY be empty or blank; an empty or blank notes value SHALL be stored as no notes.

#### Scenario: Create task with notes
- **WHEN** a user submits the create-task form with a non-empty title and a non-empty observation/notes value
- **THEN** the system creates a new task with that title and stores the provided notes on the task

#### Scenario: Create task without notes
- **WHEN** a user submits the create-task form with a non-empty title and an empty or whitespace-only observation/notes value
- **THEN** the system creates a new task with that title and no notes

#### Scenario: Task with notes displayed in list
- **WHEN** a user visits the task list and a task has notes stored
- **THEN** the system displays that task's notes alongside its title

#### Scenario: Task without notes displayed in list
- **WHEN** a user visits the task list and a task has no notes stored
- **THEN** the system does not display a notes value for that task

### Requirement: Edit task notes
The system SHALL allow a user to edit an existing task's notes, including adding notes to a task that had none, and clearing notes back to empty.

#### Scenario: Add notes to a task with none
- **WHEN** a user edits a task that currently has no notes and submits a non-empty notes value
- **THEN** the system updates the task to store the submitted notes

#### Scenario: Update existing notes
- **WHEN** a user edits a task that currently has notes and submits a different non-empty notes value
- **THEN** the system updates the task's stored notes to the new value

#### Scenario: Clear existing notes
- **WHEN** a user edits a task that currently has notes and submits an empty or whitespace-only notes value
- **THEN** the system updates the task to have no notes

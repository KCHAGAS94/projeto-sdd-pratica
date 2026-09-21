## Purpose

Lets a user manage a personal list of tasks: create new tasks, view all of them, and mark them as completed or incomplete.

## Requirements

### Requirement: List tasks
The system SHALL display all tasks, ordered by the user's manually-set order (falling back to creation order, oldest first, for tasks that have not been manually reordered), including each task's title and completion status.

#### Scenario: No tasks exist
- **WHEN** a user visits the task list and no tasks have been created
- **THEN** the system displays an empty state indicating there are no tasks

#### Scenario: Tasks exist
- **WHEN** a user visits the task list and tasks exist
- **THEN** the system displays every task with its title and whether it is completed, in the current manual order

#### Scenario: New task appended to end of order
- **WHEN** a user creates a new task while other tasks already exist
- **THEN** the new task is placed after all existing tasks in the list order

### Requirement: Create task
The system SHALL allow a user to create a new task by submitting a non-empty title. The new task SHALL start in the incomplete state.

#### Scenario: Valid title submitted
- **WHEN** a user submits the create-task form with a non-empty title
- **THEN** the system creates a new task with that title, marked incomplete, and it appears in the task list

#### Scenario: Empty title submitted
- **WHEN** a user submits the create-task form with an empty or whitespace-only title
- **THEN** the system rejects the submission and does not create a task

### Requirement: Toggle task completion
The system SHALL allow a user to mark an existing task as completed, and to mark a completed task back as incomplete.

#### Scenario: Mark incomplete task as completed
- **WHEN** a user marks an incomplete task as done
- **THEN** the system updates that task's status to completed and reflects it in the task list

#### Scenario: Mark completed task as incomplete
- **WHEN** a user unmarks a completed task
- **THEN** the system updates that task's status to incomplete and reflects it in the task list

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

### Requirement: Reorder tasks
The system SHALL allow a user to reorder tasks in the list by dragging a task to a different position and dropping it there. The new order SHALL be persisted and used the next time the task list is displayed.

#### Scenario: Move a task earlier in the list
- **WHEN** a user drags a task from a later position and drops it before an earlier task
- **THEN** the system updates the list order so the dragged task appears at the new position, and every other task's relative order is preserved

#### Scenario: Move a task later in the list
- **WHEN** a user drags a task from an earlier position and drops it after a later task
- **THEN** the system updates the list order so the dragged task appears at the new position, and every other task's relative order is preserved

#### Scenario: Reordered list persists across visits
- **WHEN** a user reorders tasks and then reloads or revisits the task list
- **THEN** the system displays the tasks in the order set by the last reorder

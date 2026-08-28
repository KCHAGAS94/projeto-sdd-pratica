## Purpose

Lets a user manage a personal list of tasks: create new tasks, view all of them, and mark them as completed or incomplete.

## Requirements

### Requirement: List tasks
The system SHALL display all tasks, ordered by creation date (oldest first), including each task's title and completion status.

#### Scenario: No tasks exist
- **WHEN** a user visits the task list and no tasks have been created
- **THEN** the system displays an empty state indicating there are no tasks

#### Scenario: Tasks exist
- **WHEN** a user visits the task list and tasks exist
- **THEN** the system displays every task with its title and whether it is completed

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

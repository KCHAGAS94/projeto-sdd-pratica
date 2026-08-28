## ADDED Requirements

### Requirement: Delete task
The system SHALL allow a user to permanently delete an existing task. Once deleted, the task SHALL no longer appear in the task list.

#### Scenario: Delete an existing task
- **WHEN** a user deletes a task from the task list
- **THEN** the system removes that task and it no longer appears in the task list

### Requirement: Edit task title
The system SHALL allow a user to edit an existing task's title to a new non-empty value. The task's completion status SHALL be unaffected by the edit.

#### Scenario: Valid title edit
- **WHEN** a user edits a task's title to a new non-empty value
- **THEN** the system updates the task's title and displays the new title in the task list, with the completion status unchanged

#### Scenario: Empty title edit rejected
- **WHEN** a user submits an edit with an empty or whitespace-only title
- **THEN** the system rejects the edit and the task's title remains unchanged

## MODIFIED Requirements

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

## ADDED Requirements

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

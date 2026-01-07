package com.smarttodo.backend.service;
import com.smarttodo.backend.exception.TaskNotFoundException;

import com.smarttodo.backend.model.Task;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private Long nextId = 1L;

    public List<Task> getAllTasks() {
        return tasks;
    }
// Creates a new task and stores it in memory
   // Creates a new task and stores it in memory
public Task addTask(String title, String description, LocalDate dueDate) {

    // 🔒 Basic validation
    if (title == null || title.trim().isEmpty()) {
        throw new IllegalArgumentException("Task title cannot be empty");
    }

    Task task = new Task(nextId++, title, description, false, dueDate);
    tasks.add(task);
    return task;
}


// Toggles completion status of a task
    public Task toggleTask(Long id) {
    for (Task task : tasks) {
        if (task.getId().equals(id)) {
            task.setCompleted(!task.isCompleted());
            return task;
        }
    }
    throw new TaskNotFoundException(id);
}

// Deletes a task by ID
   public boolean deleteTask(Long id) {
    boolean removed = tasks.removeIf(task -> task.getId().equals(id));
    if (!removed) {
        throw new TaskNotFoundException(id);
    }
    return true;
}
}

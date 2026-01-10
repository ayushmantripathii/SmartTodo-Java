package com.smarttodo.backend.controller;
import com.smarttodo.backend.model.Task;
import com.smarttodo.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    // TEST endpoint
    @GetMapping("/test")
    public String test() {
        return "SmartTodo API is working!";
    }

    @GetMapping
    public List<Task> getTasks() {
        return service.getAllTasks();
    }




    @PostMapping
    public Task addTask(@RequestParam String title,
                        @RequestParam String description,
                        @RequestParam String dueDate) {

        return service.addTask(title, description, LocalDate.parse(dueDate));
    }
    @PutMapping("/{id}/toggle")
public Task toggleTask(@PathVariable Long id) {
    return service.toggleTask(id);
}
@DeleteMapping("/{id}")
public boolean deleteTask(@PathVariable Long id) {
    return service.deleteTask(id);
}

}

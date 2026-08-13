package com.taskpulse.controller;

import com.taskpulse.dto.ProductivityMetricsDto;
import com.taskpulse.model.Task;
import com.taskpulse.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Boolean completed) {
        return ResponseEntity.ok(taskService.getAllTasks(userId, search, completed));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(userId, task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId,
            @PathVariable Long id,
            @Valid @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(userId, id, task);
        return ResponseEntity.ok(updatedTask);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleTaskCompletion(@PathVariable Long id) {
        Task toggledTask = taskService.toggleTaskCompletion(id);
        return ResponseEntity.ok(toggledTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/metrics")
    public ResponseEntity<ProductivityMetricsDto> getMetrics(
            @RequestHeader(value = "X-User-Id", required = false, defaultValue = "1") Long userId) {
        return ResponseEntity.ok(taskService.getProductivityMetrics(userId));
    }
}

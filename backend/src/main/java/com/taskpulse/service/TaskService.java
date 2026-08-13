package com.taskpulse.service;

import com.taskpulse.dto.ProductivityMetricsDto;
import com.taskpulse.model.Priority;
import com.taskpulse.model.Task;
import com.taskpulse.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks(Long userId, String search, Boolean completed) {
        if (userId == null) {
            return List.of();
        }
        if (search != null && !search.trim().isEmpty()) {
            return taskRepository.findByUserIdAndTitleContainingIgnoreCaseOrUserIdAndDescriptionContainingIgnoreCase(
                    userId, search.trim(), userId, search.trim());
        }
        if (completed != null) {
            return taskRepository.findByUserIdAndCompletedOrderByCreatedAtDesc(userId, completed);
        }
        return taskRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public Task createTask(Long userId, Task task) {
        task.setUserId(userId);
        if (task.getPriority() == null) {
            task.setPriority(Priority.MEDIUM);
        }
        if (task.getCategory() == null || task.getCategory().trim().isEmpty()) {
            task.setCategory("General");
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Long userId, Long id, Task taskDetails) {
        Task task = getTaskById(id);
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        if (taskDetails.getPriority() != null) {
            task.setPriority(taskDetails.getPriority());
        }
        if (taskDetails.getCategory() != null) {
            task.setCategory(taskDetails.getCategory());
        }
        task.setCompleted(taskDetails.isCompleted());
        return taskRepository.save(task);
    }

    public Task toggleTaskCompletion(Long id) {
        Task task = getTaskById(id);
        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    public ProductivityMetricsDto getProductivityMetrics(Long userId) {
        if (userId == null) {
            return new ProductivityMetricsDto(0, 0, 0, 0.0, 0);
        }
        long total = taskRepository.countByUserId(userId);
        long completed = taskRepository.countByUserIdAndCompleted(userId, true);
        long pending = total - completed;
        double rate = total > 0 ? Math.round(((double) completed / total) * 1000.0) / 10.0 : 0.0;
        long highPriorityPending = taskRepository.countByUserIdAndPriorityAndCompleted(userId, Priority.HIGH, false);

        return new ProductivityMetricsDto(total, completed, pending, rate, highPriorityPending);
    }
}

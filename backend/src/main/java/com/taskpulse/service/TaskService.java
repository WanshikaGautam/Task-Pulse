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

    public List<Task> getAllTasks(String search, Boolean completed) {
        if (search != null && !search.trim().isEmpty()) {
            return taskRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search.trim(), search.trim());
        }
        if (completed != null) {
            return taskRepository.findByCompletedOrderByCreatedAtDesc(completed);
        }
        return taskRepository.findAllByOrderByCreatedAtDesc();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public Task createTask(Task task) {
        if (task.getPriority() == null) {
            task.setPriority(Priority.MEDIUM);
        }
        if (task.getCategory() == null || task.getCategory().trim().isEmpty()) {
            task.setCategory("General");
        }
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
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

    public ProductivityMetricsDto getProductivityMetrics() {
        long total = taskRepository.count();
        long completed = taskRepository.countByCompleted(true);
        long pending = total - completed;
        double rate = total > 0 ? Math.round(((double) completed / total) * 1000.0) / 10.0 : 0.0;
        long highPriorityPending = taskRepository.countByPriorityAndCompleted(Priority.HIGH, false);

        return new ProductivityMetricsDto(total, completed, pending, rate, highPriorityPending);
    }
}

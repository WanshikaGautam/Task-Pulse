package com.taskpulse.repository;

import com.taskpulse.model.Priority;
import com.taskpulse.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByOrderByCreatedAtDesc();

    List<Task> findByCompletedOrderByCreatedAtDesc(boolean completed);

    List<Task> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);

    long countByCompleted(boolean completed);

    long countByPriorityAndCompleted(Priority priority, boolean completed);
}

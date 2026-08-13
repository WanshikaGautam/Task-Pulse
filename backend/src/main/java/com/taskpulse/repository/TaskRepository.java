package com.taskpulse.repository;

import com.taskpulse.model.Priority;
import com.taskpulse.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Task> findByUserIdAndCompletedOrderByCreatedAtDesc(Long userId, boolean completed);

    List<Task> findByUserIdAndTitleContainingIgnoreCaseOrUserIdAndDescriptionContainingIgnoreCase(
            Long userId1, String title, Long userId2, String description);

    long countByUserId(Long userId);

    long countByUserIdAndCompleted(Long userId, boolean completed);

    long countByUserIdAndPriorityAndCompleted(Long userId, Priority priority, boolean completed);
}

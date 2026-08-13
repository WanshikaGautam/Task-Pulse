package com.taskpulse.dto;

public class ProductivityMetricsDto {
    private long totalTasks;
    private long completedTasks;
    private long pendingTasks;
    private double completionRate;
    private long highPriorityPending;

    public ProductivityMetricsDto() {
    }

    public ProductivityMetricsDto(long totalTasks, long completedTasks, long pendingTasks, double completionRate, long highPriorityPending) {
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.pendingTasks = pendingTasks;
        this.completionRate = completionRate;
        this.highPriorityPending = highPriorityPending;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(long completedTasks) {
        this.completedTasks = completedTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public double getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(double completionRate) {
        this.completionRate = completionRate;
    }

    public long getHighPriorityPending() {
        return highPriorityPending;
    }

    public void setHighPriorityPending(long highPriorityPending) {
        this.highPriorityPending = highPriorityPending;
    }
}

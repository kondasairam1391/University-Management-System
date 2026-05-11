package com.example.StudentManagement.repository;

import com.example.StudentManagement.entity.Faculty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FacultyRepository extends JpaRepository<Faculty, Long> {
}
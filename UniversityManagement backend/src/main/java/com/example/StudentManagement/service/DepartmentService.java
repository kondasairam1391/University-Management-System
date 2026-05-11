package com.example.StudentManagement.service;


import com.example.StudentManagement.entity.Department;

import com.example.StudentManagement.repository.DepartmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository repository;

    public DepartmentService(
            DepartmentRepository repository) {

        this.repository = repository;
    }

    public Department save(
            Department department) {

        return repository.save(department);
    }

    public List<Department> getAll() {

        return repository.findAll();
    }

    public Department update(
            Long id,
            Department department) {

        Department existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setDepartmentName(
                department.getDepartmentName()
        );

        return repository.save(existing);
    }

    public void delete(Long id) {

        repository.deleteById(id);
    }

    public void deleteAll() {

        repository.deleteAll();
    }
}
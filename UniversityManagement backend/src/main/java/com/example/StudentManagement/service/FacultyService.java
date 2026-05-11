package com.example.StudentManagement.service;


import com.example.StudentManagement.entity.Faculty;

import com.example.StudentManagement.repository.FacultyRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository repository;

    public FacultyService(
            FacultyRepository repository) {

        this.repository = repository;
    }

    public Faculty save(
            Faculty faculty) {

        return repository.save(faculty);
    }

    public List<Faculty> getAll() {

        return repository.findAll();
    }

    public Faculty update(
            Long id,
            Faculty faculty) {

        Faculty existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setName(
                faculty.getName()
        );

        existing.setSubject(
                faculty.getSubject()
        );

        existing.setDepartmentId(
                faculty.getDepartmentId()
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
package com.example.StudentManagement.service;


import com.example.StudentManagement.entity.Student;

import com.example.StudentManagement.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(
            StudentRepository repository) {

        this.repository = repository;
    }

    public Student save(
            Student student) {

        return repository.save(student);
    }

    public List<Student> getAll() {

        return repository.findAll();
    }

    public Student update(
            Long id,
            Student student) {

        Student existing =
                repository.findById(id)
                        .orElseThrow();

        existing.setName(
                student.getName()
        );

        existing.setAge(
                student.getAge()
        );

        existing.setEmail(
                student.getEmail()
        );

        existing.setDepartmentId(
                student.getDepartmentId()
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
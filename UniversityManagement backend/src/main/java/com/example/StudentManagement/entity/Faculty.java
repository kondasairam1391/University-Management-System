package com.example.StudentManagement.entity;

import jakarta.persistence.*;

@Entity
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int age;

    private String email;

    private String subject;

    private Long departmentId;

    public Faculty() {
    }

    public Faculty(Long id, String name, int age, String email,
                   String subject, Long departmentId) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.subject = subject;
        this.departmentId = departmentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // NAME

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // AGE

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // EMAIL

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // SUBJECT

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    // DEPARTMENT ID

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}
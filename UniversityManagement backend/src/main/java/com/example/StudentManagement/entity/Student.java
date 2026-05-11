package com.example.StudentManagement.entity;

import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private int age;

    private String email;

    private String studentClass;

    private Long departmentId;

    public Student() {
    }

    public Student(Long id, String name, int age, String email,
                   String studentClass, Long departmentId) {

        this.id = id;
        this.name = name;
        this.age = age;
        this.email = email;
        this.studentClass = studentClass;
        this.departmentId = departmentId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    // STUDENT CLASS

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    // DEPARTMENT ID

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }
}
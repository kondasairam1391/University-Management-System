package com.example.StudentManagement.controller;

import com.example.StudentManagement.entity.Department;
import com.example.StudentManagement.service.DepartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAll();
    }

    @PostMapping
    public Department addDepartment(@RequestBody Department department) {
        return departmentService.save(department);
    }

    @PutMapping("/{id}")
    public Department updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        return departmentService.update(id, department);
    }

    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable Long id) {
        departmentService.delete(id);
    }

    @DeleteMapping
    public void deleteAllDepartments() {
        departmentService.deleteAll();
    }
}
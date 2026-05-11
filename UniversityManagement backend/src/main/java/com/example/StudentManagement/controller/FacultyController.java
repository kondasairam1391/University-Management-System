package com.example.StudentManagement.controller;

import com.example.StudentManagement.entity.Faculty;
import com.example.StudentManagement.service.FacultyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final FacultyService facultyService;

    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAll();
    }

    @PostMapping
    public Faculty addFaculty(@RequestBody Faculty faculty) {
        return facultyService.save(faculty);
    }

    @PutMapping("/{id}")
    public Faculty updateFaculty(@PathVariable Long id, @RequestBody Faculty faculty) {
        return facultyService.update(id, faculty);
    }

    @DeleteMapping("/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        facultyService.delete(id);
    }

    @DeleteMapping
    public void deleteAllFaculty() {
        facultyService.deleteAll();
    }
}
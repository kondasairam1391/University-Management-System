package com.example.StudentManagement.repository;


import com.example.StudentManagement.entity.AppUser;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository
        extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByUsername(
            String username
    );
}
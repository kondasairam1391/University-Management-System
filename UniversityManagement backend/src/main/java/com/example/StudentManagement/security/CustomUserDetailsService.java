package com.example.StudentManagement.security;

import com.example.StudentManagement.entity.AppUser;

import com.example.StudentManagement.repository.AppUserRepository;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.User;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final AppUserRepository repository;

    public CustomUserDetailsService(
            AppUserRepository repository) {

        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String username)
            throws UsernameNotFoundException {

        AppUser user =
                repository.findByUsername(
                        username
                ).orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User Not Found"
                        )
                );

        return new User(

                user.getUsername(),

                user.getPassword(),

                List.of(
                        new SimpleGrantedAuthority(
                                user.getRole()
                        )
                )
        );
    }
}
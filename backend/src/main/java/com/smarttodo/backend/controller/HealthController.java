package com.smarttodo.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String root() {
        return "Nucleus Backend is alive 🧠🔥";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}

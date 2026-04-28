package com.example.forcoursework.controller;

import com.example.forcoursework.entity.CategoriesEntity;
import org.springframework.web.bind.annotation.*;
import com.example.forcoursework.entity.BootsEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.example.forcoursework.service.BootsService;

@RestController
@RequestMapping("/api/boots")
@CrossOrigin(origins = "http://localhost:3000")
public class BootsController {
    private final BootsService bootsService;

    public BootsController(BootsService bootsService) {
        this.bootsService = bootsService;
    }

    @GetMapping("/find/all")
    public List<BootsEntity> findAll(){
        return bootsService.findAll();
    }

}


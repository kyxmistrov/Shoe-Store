package com.example.forcoursework.controller;

import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.entity.CategoriesEntity;
import com.example.forcoursework.service.CategoriesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoriesController {
    private final CategoriesService categoriesService;

    public CategoriesController(CategoriesService categoriesService) {
        this.categoriesService = categoriesService;
    }


    @GetMapping("/find/all")
    public List<CategoriesEntity> findAll(){
        return categoriesService.findAll();
    }

    @GetMapping("/find/categoryIdsByGender/{gender}")
    public List<CategoriesEntity> findCategoryIdsByGender(@PathVariable String gender){
        return categoriesService.findCategoryIdsByGender(gender);
    }

}


package com.example.forcoursework.controller;

import com.example.forcoursework.entity.CategoriesEntity;
import com.example.forcoursework.entity.RatingEntity;
import com.example.forcoursework.service.RatingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
@CrossOrigin(origins = "http://localhost:3000")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }


    @GetMapping("/find/all")
    public List<RatingEntity> findAll(){
        return ratingService.findAll();
    }


    @GetMapping("/find/{id}")
    public List<RatingEntity> findId(@PathVariable Integer id){
        return ratingService.findId(id);
    }
}


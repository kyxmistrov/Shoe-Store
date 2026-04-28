package com.example.forcoursework.service;


import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.entity.CategoriesEntity;
import com.example.forcoursework.entity.RatingEntity;
import com.example.forcoursework.repository.RatingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class RatingService {

    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }


    public List<RatingEntity> findAll(){return ratingRepository.findAll();}

    public List<RatingEntity> findId(Integer id) {
        return ratingRepository.findId(id);
    }

}

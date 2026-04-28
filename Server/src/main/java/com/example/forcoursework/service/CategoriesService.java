package com.example.forcoursework.service;


import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.entity.CategoriesEntity;
import com.example.forcoursework.repository.BootsRepository;
import com.example.forcoursework.repository.CategoriesRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;

    public CategoriesService(CategoriesRepository categoriesRepository) {
        this.categoriesRepository=categoriesRepository;
    }


    public List<CategoriesEntity> findAll(){return categoriesRepository.findAll();}

    public List<CategoriesEntity> findCategoryIdsByGender(String gender) {
        return categoriesRepository.findCategoryIdsByGender(gender);
    }

}

package com.example.forcoursework.service;


import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.entity.CategoriesEntity;
import com.example.forcoursework.repository.BootsRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class BootsService {

    private final BootsRepository bootsRepository;

    public BootsService(BootsRepository bootsRepository) {
        this.bootsRepository = bootsRepository;
    }


    public List<BootsEntity> findAll(){return bootsRepository.findAll();}



}

package com.example.forcoursework.repository;


import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.entity.CategoriesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BootsRepository extends JpaRepository<BootsEntity, Integer> {



    @Query(
            value = "select * from public.boots",
            nativeQuery = true
    )
    List<BootsEntity> findAll();



}

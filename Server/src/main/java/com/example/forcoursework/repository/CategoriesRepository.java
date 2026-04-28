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
public interface CategoriesRepository extends JpaRepository<CategoriesEntity, Integer> {



    @Query(
            value = "select * from public.categories",
            nativeQuery = true
    )
    List<CategoriesEntity> findAll();

    @Query(
            value = "SELECT DISTINCT b.categoryId FROM BootsEntity b WHERE (:gender = 'all' OR b.gender = :gender)",
            nativeQuery = false
    )
    List<CategoriesEntity> findCategoryIdsByGender(@Param("gender") String gender);

}

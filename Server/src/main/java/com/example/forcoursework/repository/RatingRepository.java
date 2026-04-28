package com.example.forcoursework.repository;


import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.entity.RatingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RatingRepository extends JpaRepository<RatingEntity, Integer> {



    @Query(
            value = "select * from public.rating",
            nativeQuery = true
    )
    List<RatingEntity> findAll();


    @Query(
            value = "SELECT * FROM rating WHERE id = :id",
            nativeQuery = true
    )
    List<RatingEntity> findId(@Param("id") Integer id);
}

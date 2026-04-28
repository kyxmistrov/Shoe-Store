package com.example.forcoursework.repository;

import com.example.forcoursework.entity.RatingEntity;
import com.example.forcoursework.entity.SizeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface SizeRepository extends JpaRepository<SizeEntity, Integer> {


    @Query(
            value = "SELECT * FROM size WHERE boot_id = :boot_id",
            nativeQuery = true
    )
    List<SizeEntity> findSize(@Param("boot_id") Integer boot_id);
}

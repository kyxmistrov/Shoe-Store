package com.example.forcoursework.service;



import com.example.forcoursework.entity.RatingEntity;
import com.example.forcoursework.entity.SizeEntity;
import com.example.forcoursework.repository.SizeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class SizeService {

    private final SizeRepository sizeRepository;

    public SizeService(SizeRepository sizeRepository) {
        this.sizeRepository = sizeRepository;
    }


    public List<SizeEntity> findSize(Integer boot_id) {
        return sizeRepository.findSize(boot_id);
    }

}

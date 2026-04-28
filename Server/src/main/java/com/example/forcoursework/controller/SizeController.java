package com.example.forcoursework.controller;

import com.example.forcoursework.entity.SizeEntity;
import com.example.forcoursework.service.SizeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/size")
@CrossOrigin(origins = "http://localhost:3000")
public class SizeController {
    private final SizeService sizeService;

    public SizeController(SizeService sizeService) {
        this.sizeService = sizeService;
    }


    @GetMapping("/find/{boot_id}")
    public List<SizeEntity> findSize(@PathVariable Integer boot_id){
        return sizeService.findSize(boot_id);
    }
}


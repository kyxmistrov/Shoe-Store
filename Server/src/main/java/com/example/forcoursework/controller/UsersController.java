package com.example.forcoursework.controller;

import com.example.forcoursework.entity.BootsEntity;
import com.example.forcoursework.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/find")
    public ResponseEntity<Map<String, String>> findLoginByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
        System.out.println("email "+email);
        String username = usersService.findLoginByEmailAndPassword(email, password);
        System.out.println("username "+username);
        if (username != null && !username.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("username", username);
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Unauthorized");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<Map<String, String>> Registration(@RequestParam String login, @RequestParam String password,@RequestParam String email) {

       boolean findEmail= usersService.findEmail(email);

       if (findEmail){
           Map<String, String> response = new HashMap<>();
           response.put("error", "Email is already in use");
           return ResponseEntity.ok(response);
       }else {
           usersService.saveUser(login,password,email);
           Map<String, String> response = new HashMap<>();
           response.put("ok", "The user has been added");
           return ResponseEntity.ok(response);
       }


    }


}

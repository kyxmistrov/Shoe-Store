package com.example.forcoursework.service;



import com.example.forcoursework.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UsersService {

    private final UsersRepository usersRepository;


    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public String findLoginByEmailAndPassword(String email, String password){

        return usersRepository.findLoginByEmailAndPassword(email,password);
    }
    public boolean findEmail(String email){
        return usersRepository.findEmail(email);
    }

    public void saveUser(String login, String password, String email){
        usersRepository.saveUser(login, password, email);
    }

}

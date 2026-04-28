package com.example.forcoursework.repository;

import com.example.forcoursework.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<UsersEntity, Integer> {

    @Query(
            value = "SELECT login FROM users WHERE email = :email AND password = :password",
            nativeQuery = true
    )
    String findLoginByEmailAndPassword(@Param("email")String email,@Param("password") String password);



    @Query(
            value = "SELECT EXISTS (SELECT 1 FROM users WHERE email = :email ) AS email_exists",
            nativeQuery = true
    )
    boolean findEmail(@Param("email")String email);
    @Modifying
    @Query(
            value = "INSERT INTO public.users (login, password, email) VALUES (:login, :password, :email)",
            nativeQuery = true
    )
    void saveUser(@Param("login")String login,@Param("password")String password,@Param("email")String email);
}

package com.example.forcoursework.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "seasons", schema = "public", catalog = "footwear")
public class SeasonsEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "season")
    private String season;

    @OneToMany(mappedBy = "seasonId")
    @JsonIgnore
    private List<BootsEntity> boots;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public List<BootsEntity> getBoots() {
        return boots;
    }

    public void setBoots(List<BootsEntity> boots) {
        this.boots = boots;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SeasonsEntity that = (SeasonsEntity) o;

        if (id != that.id) return false;
        if (season != null ? !season.equals(that.season) : that.season != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (season != null ? season.hashCode() : 0);
        return result;
    }
}

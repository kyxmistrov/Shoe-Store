package com.example.forcoursework.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "countries", schema = "public", catalog = "footwear")
public class CountriesEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "county")
    private String county;

    @OneToMany(mappedBy = "countryId")
    @JsonIgnore
    private List<BootsEntity> boots;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
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

        CountriesEntity that = (CountriesEntity) o;

        if (id != that.id) return false;
        if (county != null ? !county.equals(that.county) : that.county != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (county != null ? county.hashCode() : 0);
        return result;
    }
}

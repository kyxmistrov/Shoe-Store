package com.example.forcoursework.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "brends", schema = "public", catalog = "footwear")
public class BrendsEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "brend")
    private String brend;

    @OneToMany(mappedBy = "brendId")
    @JsonIgnore
    private List<BootsEntity> boots;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBrend() {
        return brend;
    }

    public void setBrend(String brend) {
        this.brend = brend;
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

        BrendsEntity that = (BrendsEntity) o;

        if (id != that.id) return false;
        if (brend != null ? !brend.equals(that.brend) : that.brend != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (brend != null ? brend.hashCode() : 0);
        return result;
    }
}

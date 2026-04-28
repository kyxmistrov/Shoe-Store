package com.example.forcoursework.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "materials", schema = "public", catalog = "footwear")
public class MaterialsEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "material")
    private String material;

    @OneToMany(mappedBy = "materialId")
    @JsonIgnore
    private List<BootsEntity> boots;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
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

        MaterialsEntity that = (MaterialsEntity) o;

        if (id != that.id) return false;
        if (material != null ? !material.equals(that.material) : that.material != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (material != null ? material.hashCode() : 0);
        return result;
    }
}

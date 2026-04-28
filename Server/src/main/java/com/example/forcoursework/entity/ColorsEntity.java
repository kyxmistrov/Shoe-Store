package com.example.forcoursework.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "colors", schema = "public", catalog = "footwear")
public class ColorsEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "color")
    private String color;
    @Basic
    @Column(name = "boot")
    private Integer boot;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getBoot() {
        return boot;
    }

    public void setBoot(Integer boot) {
        this.boot = boot;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ColorsEntity that = (ColorsEntity) o;

        if (id != that.id) return false;
        if (color != null ? !color.equals(that.color) : that.color != null) return false;
        if (boot != null ? !boot.equals(that.boot) : that.boot != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (color != null ? color.hashCode() : 0);
        result = 31 * result + (boot != null ? boot.hashCode() : 0);
        return result;
    }
}

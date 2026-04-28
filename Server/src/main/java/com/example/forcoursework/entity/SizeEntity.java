package com.example.forcoursework.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "size", schema = "public", catalog = "footwear")
public class SizeEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @ManyToOne
    @JoinColumn(name="boot_id")
    private BootsEntity bootId;
    @Basic
    @Column(name = "size")
    private Integer size;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BootsEntity getBootId() {
        return bootId;
    }

    public void setBootId(BootsEntity bootId) {
        this.bootId = bootId;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SizeEntity that = (SizeEntity) o;

        if (id != that.id) return false;
        if (bootId != null ? !bootId.equals(that.bootId) : that.bootId != null) return false;
        if (size != null ? !size.equals(that.size) : that.size != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (bootId != null ? bootId.hashCode() : 0);
        result = 31 * result + (size != null ? size.hashCode() : 0);
        return result;
    }
}

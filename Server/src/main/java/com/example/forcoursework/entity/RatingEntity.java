package com.example.forcoursework.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "rating", schema = "public", catalog = "footwear")
public class RatingEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "r1")
    private Integer r1;
    @Basic
    @Column(name = "r2")
    private Integer r2;
    @Basic
    @Column(name = "r3")
    private Integer r3;
    @Basic
    @Column(name = "r4")
    private Integer r4;
    @Basic
    @Column(name = "r5")
    private Integer r5;
    @Basic
    @Column(name = "rat")
    private BigDecimal rat;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getR1() {
        return r1;
    }

    public void setR1(Integer r1) {
        this.r1 = r1;
    }

    public Integer getR2() {
        return r2;
    }

    public void setR2(Integer r2) {
        this.r2 = r2;
    }

    public Integer getR3() {
        return r3;
    }

    public void setR3(Integer r3) {
        this.r3 = r3;
    }

    public Integer getR4() {
        return r4;
    }

    public void setR4(Integer r4) {
        this.r4 = r4;
    }

    public Integer getR5() {
        return r5;
    }

    public void setR5(Integer r5) {
        this.r5 = r5;
    }

    public BigDecimal getRat() {
        return rat;
    }

    public void setRat(BigDecimal rat) {
        this.rat = rat;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RatingEntity that = (RatingEntity) o;

        if (id != that.id) return false;
        if (r1 != null ? !r1.equals(that.r1) : that.r1 != null) return false;
        if (r2 != null ? !r2.equals(that.r2) : that.r2 != null) return false;
        if (r3 != null ? !r3.equals(that.r3) : that.r3 != null) return false;
        if (r4 != null ? !r4.equals(that.r4) : that.r4 != null) return false;
        if (r5 != null ? !r5.equals(that.r5) : that.r5 != null) return false;
        if (rat != null ? !rat.equals(that.rat) : that.rat != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (r1 != null ? r1.hashCode() : 0);
        result = 31 * result + (r2 != null ? r2.hashCode() : 0);
        result = 31 * result + (r3 != null ? r3.hashCode() : 0);
        result = 31 * result + (r4 != null ? r4.hashCode() : 0);
        result = 31 * result + (r5 != null ? r5.hashCode() : 0);
        result = 31 * result + (rat != null ? rat.hashCode() : 0);
        return result;
    }
}

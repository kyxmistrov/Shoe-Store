package com.example.forcoursework.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "boots", schema = "public", catalog = "footwear")
public class BootsEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "img")
    private String img;

    @ManyToOne
    @JoinColumn(name="category_id")
    private CategoriesEntity categoryId;
    @Basic
    @Column(name = "price")
    private Integer price;
    @ManyToOne
    @JoinColumn(name="season_id")
    private SeasonsEntity seasonId;
    @Basic
    @Column(name = "gender")
    private String gender;

    @ManyToOne
    @JoinColumn(name="brend_id")
    private BrendsEntity brendId;

    @ManyToOne
    @JoinColumn(name="country_id")
    private CountriesEntity countryId;
    @Basic
    @Column(name = "articul")
    private String articul;
    @ManyToOne
    @JoinColumn(name="material_id")
    private MaterialsEntity materialId;
    @Basic
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "bootId")
    @JsonIgnore
    private List<SizeEntity> size;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public CategoriesEntity getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(CategoriesEntity categoryId) {
        this.categoryId = categoryId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public SeasonsEntity getSeasonId() {
        return seasonId;
    }

    public void setSeasonId(SeasonsEntity seasonId) {
        this.seasonId = seasonId;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public BrendsEntity getBrendId() {
        return brendId;
    }

    public void setBrendId(BrendsEntity brendId) {
        this.brendId = brendId;
    }

    public CountriesEntity getCountryId() {
        return countryId;
    }

    public void setCountryId(CountriesEntity countryId) {
        this.countryId = countryId;
    }

    public String getArticul() {
        return articul;
    }

    public void setArticul(String articul) {
        this.articul = articul;
    }

    public MaterialsEntity getMaterialId() {
        return materialId;
    }

    public void setMaterialId(MaterialsEntity materialId) {
        this.materialId = materialId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<SizeEntity> getSize() {
        return size;
    }

    public void setSize(List<SizeEntity> size) {
        this.size = size;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BootsEntity that = (BootsEntity) o;

        if (id != that.id) return false;
        if (title != null ? !title.equals(that.title) : that.title != null) return false;
        if (img != null ? !img.equals(that.img) : that.img != null) return false;
        if (categoryId != null ? !categoryId.equals(that.categoryId) : that.categoryId != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (seasonId != null ? !seasonId.equals(that.seasonId) : that.seasonId != null) return false;
        if (gender != null ? !gender.equals(that.gender) : that.gender != null) return false;
        if (brendId != null ? !brendId.equals(that.brendId) : that.brendId != null) return false;
        if (countryId != null ? !countryId.equals(that.countryId) : that.countryId != null) return false;
        if (articul != null ? !articul.equals(that.articul) : that.articul != null) return false;
        if (materialId != null ? !materialId.equals(that.materialId) : that.materialId != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (img != null ? img.hashCode() : 0);
        result = 31 * result + (categoryId != null ? categoryId.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (seasonId != null ? seasonId.hashCode() : 0);
        result = 31 * result + (gender != null ? gender.hashCode() : 0);
        result = 31 * result + (brendId != null ? brendId.hashCode() : 0);
        result = 31 * result + (countryId != null ? countryId.hashCode() : 0);
        result = 31 * result + (articul != null ? articul.hashCode() : 0);
        result = 31 * result + (materialId != null ? materialId.hashCode() : 0);
        result = 31 * result + (description != null ? description.hashCode() : 0);
        return result;
    }
}

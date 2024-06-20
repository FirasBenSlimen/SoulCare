package com.example.pokerplanninpi.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pokerplanninpi.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
}

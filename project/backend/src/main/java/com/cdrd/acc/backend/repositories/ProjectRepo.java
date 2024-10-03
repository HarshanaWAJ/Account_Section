package com.cdrd.acc.backend.repositories;

import com.cdrd.acc.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project, Integer> {
}

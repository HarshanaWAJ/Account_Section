package com.cdrd.acc.backend.repositories;

import com.cdrd.acc.backend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectRepo extends JpaRepository<Project, Integer> {

    @Query("SELECT p FROM Project p WHERE p.wing = ?1")
    List<Project> getProjectsByWing(String wing);

    @Query("SELECT p FROM Project p WHERE p.projectNo = ?1")
    Project getProjectByProjectNo(String projectNo);

    @Query("SELECT COUNT(p) FROM Project p")
    Integer getProjectCount();

}

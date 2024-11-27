package com.cdrd.acc.backend.controller;

import com.cdrd.acc.backend.dto.ProjectDTO;
import com.cdrd.acc.backend.entity.Project;
import com.cdrd.acc.backend.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/api/projects/add-project")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        ProjectDTO createdProject = projectService.createProject(projectDTO);
        return ResponseEntity.ok(createdProject);
    }

    @GetMapping("/api/projects/get-project-list")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/api/project/get-project-by-id/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable int id) {
        ProjectDTO projectDTO = projectService.getProjectById(id);
        return ResponseEntity.status(projectDTO.getStatusCode()).body(projectDTO);
    }

    @PutMapping("/api/project/update-project-by-id/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable int id, @RequestBody ProjectDTO projectDTO) {
        ProjectDTO updatedProject = projectService.updateProject(id, projectDTO);
        return ResponseEntity.status(updatedProject.getStatusCode()).body(updatedProject);
    }

    @DeleteMapping("/api/project/delete-project-by-id/{id}")
    public ResponseEntity<ProjectDTO> deleteProject(@PathVariable int id) {
        ProjectDTO deletedProject = projectService.deleteProject(id);
        return ResponseEntity.status(deletedProject.getStatusCode()).body(deletedProject);
    }


    @GetMapping("/api/project/wing")
    public ResponseEntity<List<ProjectDTO>> getProjectsByWing(@RequestParam String wing) {
        try {
            List<ProjectDTO> projectDTOs = projectService.getProjectsByWing(wing);
            if (projectDTOs != null && !projectDTOs.isEmpty()) {
                System.out.println(projectDTOs);
                return ResponseEntity.ok(projectDTOs);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/api/project/name")
    public ResponseEntity<ProjectDTO> getProjectByName(@RequestParam String projectNo) {
        try {
            ProjectDTO projectDTO = projectService.getProjectByName(projectNo);
            if (projectDTO != null) {
                return ResponseEntity.ok(projectDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("api/project/get-count")
    public ResponseEntity<Integer> getProjectCount() {
        try {
            Integer projectCount = projectService.getProjectCount();
            if (projectCount == 0) {
                return ResponseEntity.ok(0);
            } else {
                return ResponseEntity.ok(projectCount);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

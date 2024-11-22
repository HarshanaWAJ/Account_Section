package com.cdrd.acc.backend.services;

import com.cdrd.acc.backend.dto.ProjectDTO;
import com.cdrd.acc.backend.entity.Project;
import com.cdrd.acc.backend.repositories.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepo projectRepo;

    public ProjectDTO createProject(ProjectDTO projectDTO) {
        // Create a new Project entity
        Project project = new Project();
        project.setProjectNo(projectDTO.getProjectNo());
        project.setProjectName(projectDTO.getProjectName());
        project.setWing(projectDTO.getWing());
        project.setEstimatedValue(projectDTO.getEstimatedValue());
        project.setStartingDate(projectDTO.getStartingDate());
        project.setEndingDate(projectDTO.getEndingDate());
        project.setCurrentYear(projectDTO.getCurrentYear());
        project.setExpenditureUpToCurrentYear(projectDTO.getExpenditureUpToCurrentYear());
        project.setProjectType(projectDTO.getProjectType());

        // Save the project to the repository
        Project savedProject = projectRepo.save(project);

        // Set the saved project details back to the DTO
        projectDTO.setProject(savedProject); // Assuming you want to return the saved project
        projectDTO.setStatusCode(200);
        projectDTO.setMessage("Project created successfully");

        return projectDTO;
    }


    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    public ProjectDTO getProjectById(int id) {
        ProjectDTO projectDTO = new ProjectDTO();
        Optional<Project> projectOptional = projectRepo.findById(id);

        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();

            // Set the project details directly to the DTO
            projectDTO.setId(project.getId());
            projectDTO.setProjectNo(project.getProjectNo());
            projectDTO.setProjectName(project.getProjectName());
            projectDTO.setStartingDate(project.getStartingDate());
            projectDTO.setEndingDate(project.getEndingDate());
            projectDTO.setWing(project.getWing());
            projectDTO.setEstimatedValue(project.getEstimatedValue());

            projectDTO.setStatusCode(200);
            projectDTO.setMessage("Project retrieved successfully");
        } else {
            projectDTO.setStatusCode(404);
            projectDTO.setError("Project not found");
        }

        return projectDTO;
    }



    public ProjectDTO updateProject(int id, ProjectDTO projectDTO) {
        ProjectDTO responseDTO = new ProjectDTO();
        Optional<Project> projectOptional = projectRepo.findById(id);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setProjectNo(projectDTO.getProjectNo());
            project.setProjectName(projectDTO.getProjectName());
            project.setStartingDate(projectDTO.getStartingDate());
            project.setEndingDate(projectDTO.getEndingDate());
            project.setWing(projectDTO.getWing());
            project.setEstimatedValue(projectDTO.getEstimatedValue());

            Project updatedProject = projectRepo.save(project);
            responseDTO.setProject(updatedProject);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Project updated successfully");
        } else {
            responseDTO.setStatusCode(404);
            responseDTO.setError("Project not found");
        }
        return responseDTO;
    }

    public ProjectDTO deleteProject(int id) {
        ProjectDTO responseDTO = new ProjectDTO();
        Optional<Project> projectOptional = projectRepo.findById(id);
        if (projectOptional.isPresent()) {
            projectRepo.deleteById(id);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Project deleted successfully");
        } else {
            responseDTO.setStatusCode(404);
            responseDTO.setError("Project not found");
        }
        return responseDTO;
    }
    public List<ProjectDTO> getProjectsByWing(String wing) {
        try {
            List<Project> projectsByWing = projectRepo.getProjectsByWing(wing);
            return projectsByWing.stream()
                    .map(project -> {
                        ProjectDTO dto = new ProjectDTO();
                        dto.setProjectNo(project.getProjectNo());
                        dto.setProjectName(project.getProjectName());
                        dto.setId(project.getId());
                        // Set other properties of ProjectDTO if needed
                        return dto;
                    })
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList(); // Return an empty list instead of null
        }
    }


    public ProjectDTO getProjectByName(String projectNo) {
        try {
            Project project = projectRepo.getProjectByProjectNo(projectNo);
            if (project != null) {
                return convertToDTO(project);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null; // You can also throw a custom exception here
        }
        return null; // Return null if no project found
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setProjectNo(project.getProjectNo());
        dto.setProjectName(project.getProjectName());
        dto.setId(project.getId());
        dto.setWing(project.getWing());
        return dto;
    }
}

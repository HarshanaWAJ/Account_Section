package com.cdrd.acc.backend.controller;

import com.cdrd.acc.backend.dto.ReqRes;
import com.cdrd.acc.backend.entity.OurUsers;
import com.cdrd.acc.backend.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {
    @Autowired
    private UserManagementService userManagementService;

    //
    // Register new User
    //
    @PostMapping("/api/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes registerReq) {
        return ResponseEntity.ok(userManagementService.register(registerReq));
    }

    //
    // User Login
    @PostMapping("/api/auth/login") // Changed from "auth/register" to "auth/login"
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes loginReq) {
        return ResponseEntity.ok(userManagementService.login(loginReq));
    }

    //
    // Refresh Token
    //
    @PostMapping("/api/auth/refresh-token")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes refreshTokenReq) {
        return ResponseEntity.ok(userManagementService.refreshToken(refreshTokenReq));
    }

    //
    // Get All Users for Admin Purposes
    @GetMapping("/api/admin/get-all-users")
    public ResponseEntity<ReqRes> getAllUsers() {
        return ResponseEntity.ok(userManagementService.getAllUsers());
    }

    //
    // Get One User by ID for Admin Purposes
    //
    @GetMapping("/api/admin/get-user/{userID}")
    public ResponseEntity<ReqRes> getUserByID(@PathVariable Long userID) {
        return ResponseEntity.ok(userManagementService.getUsersById(userID));
    }

    //
    // Update Users for Admin Purposes
    //
    @PutMapping("/api/admin/update-user/{userID}") // Changed to PUT for updates
    public ResponseEntity<ReqRes> updateUserByID(@PathVariable Long userID, @RequestBody OurUsers updateReq) {
        return ResponseEntity.ok(userManagementService.updateUser(userID, updateReq));
    }

    //
    // Get User Details
    //
    @GetMapping("/api/get-user-profile")
    public ResponseEntity<ReqRes> getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        ReqRes response = userManagementService.getMyInfo(email);

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    //
    // Delete User
    //
    @DeleteMapping("/api/admin/delete-user/{userID}")
    public ResponseEntity<ReqRes> deleteUserByID(@PathVariable Long userID) {
        return ResponseEntity.ok(userManagementService.deleteUser(userID));
    }
}

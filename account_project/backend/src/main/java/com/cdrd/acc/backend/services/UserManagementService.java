package com.cdrd.acc.backend.services;

import com.cdrd.acc.backend.dto.ReqRes;
import com.cdrd.acc.backend.entity.OurUsers;
import com.cdrd.acc.backend.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //
    //User Registration
    //
    public ReqRes register(ReqRes registrationRequest) {
        ReqRes resp = new ReqRes();
        try {
            OurUsers ourUsers = new OurUsers();
            // Get Data from request
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setName(registrationRequest.getName());
            ourUsers.setRole(registrationRequest.getRole());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            OurUsers ourUsersResult = userRepo.save(ourUsers);

            if ( ourUsersResult.getId() > 0) {
                resp.setOurUsers((ourUsers));
                resp.setError("User Registered!");
                resp.setStatusCode(200);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    //
    // User Login
    //
    public ReqRes login(ReqRes loginRequest) {
        ReqRes resp = new ReqRes();
        try {
            // Check for hardcoded admin credentials
            if ("admin@cdrd.lk".equals(loginRequest.getEmail()) && "admin1234".equals(loginRequest.getPassword())) {
                var adminUser = new OurUsers(); // Create a new User object for admin
                adminUser.setEmail("admin@cdrd.lk");
                adminUser.setRole("ADMIN"); // Example role assignment

                var jwt = jwtUtils.generateToken(adminUser);
                var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), adminUser);

                resp.setStatusCode(200);
                resp.setToken(jwt);
                resp.setRefreshToken(refreshToken);
                resp.setExpirationTime("24Hrs");
                resp.setMessage("Admin logged in successfully");
                resp.setRole(adminUser.getRole()); // Set the role in the response
                return resp;
            }

            // Regular authentication flow
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow();

            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            resp.setStatusCode(200);
            resp.setToken(jwt);
            resp.setRefreshToken(refreshToken);
            resp.setExpirationTime("24Hrs");
            resp.setMessage("Successfully Logged in");
            resp.setRole(user.getRole()); // Assuming user has a getRole method

        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    //
    // Get Users List
    //
    public ReqRes getAllUsers() {
        ReqRes resp = new ReqRes();

        try {
            List<OurUsers> result = userRepo.findAll();
            if (!result.isEmpty()) {
                resp.setOurUsersList(result);
                resp.setStatusCode(200);
                resp.setMessage("User list Fetch Success");
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }

        return resp;
    }

    //
    //Generate New Token
    //
    public ReqRes refreshToken(ReqRes refreshTokenRequest){
        ReqRes response = new ReqRes();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            OurUsers users = userRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Refreshed Token");
            }
            response.setStatusCode(200);
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    //
    // Find a User By Id
    //
    public ReqRes getUsersById(Long id) {
        ReqRes reqRes = new ReqRes();
        try {
            OurUsers usersById = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            reqRes.setOurUsers(usersById);
            reqRes.setStatusCode(200);
            reqRes.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return reqRes;
    }

    //
    // Delete a User
    //
    public ReqRes deleteUser(Long userId) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUsers> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                userRepo.deleteById(userId);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User deleted successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return reqRes;
    }

    //
    // Update User Details
    //
    public ReqRes updateUser(Long userId, OurUsers updatedUser) {
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUsers> userOptional = userRepo.findById(userId);
            if (userOptional.isPresent()) {
                OurUsers existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                OurUsers savedUser = userRepo.save(existingUser);
                reqRes.setOurUsers(savedUser);
                reqRes.setStatusCode(200);
                reqRes.setMessage("User updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return reqRes;
    }


    //
    // Get User Info
    //
    public ReqRes getMyInfo(String email){
        ReqRes reqRes = new ReqRes();
        try {
            Optional<OurUsers> userOptional = userRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                reqRes.setOurUsers(userOptional.get());
                reqRes.setStatusCode(200);
                reqRes.setMessage("successful");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("User not found for update");
            }

        }catch (Exception e){
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return reqRes;

    }

}

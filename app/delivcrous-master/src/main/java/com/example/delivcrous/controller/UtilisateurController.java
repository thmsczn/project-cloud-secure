package com.example.delivcrous.controller;

import com.example.delivcrous.payload.response.MessageResponse;
import com.example.delivcrous.repository.UtilisateurRepository;
import com.example.delivcrous.security.jwt.JwtUtils;
import com.example.delivcrous.security.userDetails.UserDetailsImpl;
import com.example.delivcrous.model.Utilisateur;
import com.example.delivcrous.payload.request.LoginRequest;
import com.example.delivcrous.payload.request.RegisterRequest;
import com.example.delivcrous.payload.response.UserInfoResponse;
import com.example.delivcrous.service.UtilisateurService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import jakarta.validation.Valid;


import java.util.List;

@Path("api/utilisateurs")
public class UtilisateurController {

    @Inject
    private UtilisateurService utilisateurService;
    @Inject
    UtilisateurRepository utilisateurRepository;
    @Inject
    AuthenticationManager authenticationManager;
    @Inject
    JwtUtils jwtUtils;

    @GET
    @Path("/getutilisateurs")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.getAllUtilisateurs();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<MessageResponse> createUtilisateur(@Valid @RequestBody RegisterRequest registerRequest) {
        if (utilisateurRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        if (utilisateurRepository.existsByUsername("jdoe")) {
            System.out.println("jdoe existe deja haha");;
        }

        if (utilisateurRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }
        Utilisateur utilisateur = new Utilisateur(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                registerRequest.getPassword(),
                registerRequest.getNom(),
                registerRequest.getPrenom(),
                registerRequest.getSolde_crous(),
                registerRequest.getTel(),
                registerRequest.getAdresse()
        );

        utilisateurService.createUtilisateur(utilisateur);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public ResponseEntity<UserInfoResponse> authentificateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);


        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        userDetails.getTel(),
                        userDetails.getAdresse(),
                        userDetails.getSolde_crous()));
    }
}


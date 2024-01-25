package com.example.delivcrous;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        packages("com.example.delivcrous.controller", "com.example.delivcrous.exceptions", "com.example.delivcrous.model", "com.example.delivcrous.payload", "com.example.delivcrous.repository", "com.example.delivcrous.security", "com.example.delivcrous.service");
    }
}

package com.example.delivcrous.exceptions;
import org.springframework.security.core.AuthenticationException;

public class UserIdMismatchException extends AuthenticationException {
    public UserIdMismatchException(String msg) {
        super(msg);
    }
}

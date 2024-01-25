package com.example.delivcrous.exceptions;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@Provider
public class ConstraintViolationExceptionMapper implements ExceptionMapper<ConstraintViolationException> {

    @Override
    public Response toResponse(ConstraintViolationException exception) {
        StringBuilder message = new StringBuilder();
        for (ConstraintViolation<?> violation : exception.getConstraintViolations()) {
            message.append(violation.getPropertyPath()).append(": ").append(violation.getMessage()).append("\n");
        }
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(message.toString())
                .build();
    }
}

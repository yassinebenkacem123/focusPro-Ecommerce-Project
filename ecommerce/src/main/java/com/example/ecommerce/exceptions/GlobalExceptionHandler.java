package com.example.ecommerce.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.ecommerce.payload.APIResponse;

@RestControllerAdvice 
public class GlobalExceptionHandler {
    // for handling the validation exeception :
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> methodArgumentNotValidException(MethodArgumentNotValidException e){
        
        Map<String,String> response = new  HashMap<>();
        e.getBindingResult().getAllErrors().forEach(
            err -> {
                String fieldName = ((FieldError)err).getField(); // fieldName = "message".
                String message = err.getDefaultMessage();
                response.put(fieldName, message);
            }
        );
        return new ResponseEntity<Map<String,String>>(response, HttpStatus.BAD_REQUEST);
    }

    // for handling the not found resources :
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<APIResponse> resourceNotFoundException(ResourceNotFoundException e){
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(message, false);
        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    // for handling the api exception : like the when category name already exist or email already exist stuffs like these
    @ExceptionHandler(APIException.class)
    public ResponseEntity<APIResponse> apiExceptionHandler(APIException e){
        String message = e.getMessage();
        APIResponse apiResponse = new APIResponse(message, false);
        return new ResponseEntity<>(apiResponse,HttpStatus.BAD_REQUEST);
    }
    
}

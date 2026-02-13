package com.example.ecommerce.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;
    private String field;
    private String fieldValue;
    private Long fieldId;

    
    public ResourceNotFoundException(String resourceName, String field, String fieldValue){
        super(String.format("%s not found with %s: %d",resourceName, field, fieldValue)); // message.
        this.resourceName = resourceName;
        this.field = field;
        this.fieldValue = fieldValue;
    }

     
    public ResourceNotFoundException(String resourceName, String field, Long fieldId){
        super(String.format("%s not found with %s: %d",resourceName, field, fieldId));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldId = fieldId ;
    }
    
    public ResourceNotFoundException(String message){
        super(message);
    }
    
    

}

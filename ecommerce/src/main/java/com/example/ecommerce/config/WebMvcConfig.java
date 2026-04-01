package com.example.ecommerce.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${project.imagePath}")
    private String imagePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path folder = Paths.get(imagePath).toAbsolutePath().normalize();
        String location = folder.toUri().toString();
        if (!location.endsWith("/")) {
            location = location + "/";
        }

        registry
            .addResourceHandler("/ecommerce/images/**")
            .addResourceLocations(location);
    }

}
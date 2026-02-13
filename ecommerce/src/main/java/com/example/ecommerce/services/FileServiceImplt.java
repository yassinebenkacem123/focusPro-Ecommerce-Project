package com.example.ecommerce.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImplt implements FileService {
    @Override
    public String getImagePathName(String pathRoot, MultipartFile image) throws IOException {
        // get image's name:
        String imageName = image.getOriginalFilename();

        // generate unique image's name;
        String randomUUID = UUID.randomUUID().toString();
        String newUniqueImageName = randomUUID.concat(imageName.substring(imageName.lastIndexOf("."))).toString();

        // check if the folder exist or not:
        File folderPath = new File(pathRoot);
        if (!folderPath.exists()) {
            folderPath.mkdirs();
        }

        // upload the image :
        Path imageFinalPath = Paths.get(pathRoot, newUniqueImageName);
        Files.copy(image.getInputStream(), imageFinalPath, StandardCopyOption.REPLACE_EXISTING);
        return newUniqueImageName;
    }

}

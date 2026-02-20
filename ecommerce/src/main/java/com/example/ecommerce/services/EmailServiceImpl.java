package com.example.ecommerce.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    @Value("${email.sendder}")
    private  String emailSender;

    private final JavaMailSender mailSender;
    @Override
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setFrom(emailSender);
        message.setText(body);

        mailSender.send(message);
    }
    
}

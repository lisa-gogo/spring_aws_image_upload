package com.lisa.spring_aws_image_upload.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/user-profile")
@CrossOrigin("*")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Autowired
    public UserProfileController(UserProfileService userProfileService){
        this.userProfileService = userProfileService;
    }

    @GetMapping
    public List<UserProfile> getUserProfiles(){

        return userProfileService.getUserProfile();
    }

    @PostMapping(
            path = "{userProfileId}/image/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE

    )
    public void uploadUserProfileImage(@PathVariable("userProfileId")Long userProfileId,
                                       @RequestParam("file")MultipartFile file){
        System.out.println(userProfileId);
        userProfileService.uploadUserProfileImage(userProfileId,file);
    }

    @GetMapping("{userProfileId}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("userProfileId") Long userProfileId){

       return userProfileService.downloadUserProfileImage(userProfileId);
    }

    @PostMapping("/add")
    public String add(@RequestBody UserProfile newUser){
         userProfileService.saveStudent(newUser);
         return "Successfully add new user";

    }
    @DeleteMapping("/delete/{userProfileId}")
    public String deleteUser(@PathVariable("userProfileId") Long userProfileId){
        userProfileService.delete(userProfileId);
        return "Successfully delete";

    }

}

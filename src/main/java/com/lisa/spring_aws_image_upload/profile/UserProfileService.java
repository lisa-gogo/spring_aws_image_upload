package com.lisa.spring_aws_image_upload.profile;

import com.lisa.spring_aws_image_upload.FileStore.FileStore;
import com.lisa.spring_aws_image_upload.bucket.BucketName;
import com.lisa.spring_aws_image_upload.datastore.FakeUserProfileDataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static org.springframework.http.MediaType.*;


@Service
public class UserProfileService {

//    private final UserProfileDataAccessService userProfileDataAccessService;

    private final FakeUserProfileDataStore fakeUserProfileDataStore;
    private final FileStore fileStore;

   @Autowired
    public UserProfileService(FakeUserProfileDataStore fakeUserProfileDataStore,
                              FileStore fileStore){
       this.fakeUserProfileDataStore = fakeUserProfileDataStore;
       this.fileStore = fileStore;
   }

    public void saveStudent(UserProfile newUser) {
       fakeUserProfileDataStore.save(newUser);
    }

    List<UserProfile> getUserProfile(){
       return fakeUserProfileDataStore.findAll();
   }


    public void uploadUserProfileImage(Long userProfileId, MultipartFile file) {
        //1. check if image is not empty
        if(file.isEmpty()){
           throw new IllegalStateException("Cannot upload empty file [ "+file.getSize()+"]");
        }
        //2. if file is an image
        if(!Arrays.asList(IMAGE_JPEG,"image/jpeg",IMAGE_PNG, IMAGE_GIF).contains(file.getContentType())){
            throw new IllegalStateException("Files must be image");
        }

        //3. The user exist in our database
        UserProfile user = fakeUserProfileDataStore.findAll()
                .stream()
                .filter(userProfile -> userProfile.getUserProfileId().equals((userProfileId)))
                .findFirst()
                .orElseThrow(()-> new IllegalStateException(String.format("User profile %s not found", userProfileId)));
        //4. Grab some metadata from file if any

        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type",file.getContentType());
        metadata.put("Content-Length",String.valueOf(file.getSize()));
        //5. Store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(),user.getUserProfileId());
        String filename = String.format("%s-%s",file.getOriginalFilename(),UUID.randomUUID());
        try {fileStore.save(path,filename,Optional.of(metadata),file.getInputStream());

            user.setUserProfileImageLink(filename);
            fakeUserProfileDataStore.updateUserImageLink(filename,user.getUserProfileId());


    } catch(IOException e){
           throw new IllegalStateException(e);

        }
}
// download

    private UserProfile getUserProfileOrThrow(Long userProfileId) {
        return fakeUserProfileDataStore.findAll()
                .stream()
                .filter(userProfile -> userProfile.getUserProfileId().equals(userProfileId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("User profile %s not found", userProfileId)));
    }

    public byte[] downloadUserProfileImage(Long userProfileId) {
       UserProfile user = getUserProfileOrThrow( userProfileId);
        String path = String.format("%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                user.getUserProfileId());

        return user.getUserProfileImageLink()
                .map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);
    }


    public void delete(Long userProfileId) {
     var user =  fakeUserProfileDataStore.getOne(userProfileId);
     fakeUserProfileDataStore.delete(user);
    }
}

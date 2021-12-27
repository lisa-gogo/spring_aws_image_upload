package com.lisa.spring_aws_image_upload.profile;

import com.lisa.spring_aws_image_upload.datastore.FakeUserProfileDataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
//public class UserProfileDataAccessService {
//   private final FakeUserProfileDataStore fakeUserProfileDataStore;
//
//   @Autowired
//   public UserProfileDataAccessService(FakeUserProfileDataStore fakeUserProfileDataStore){
//       this.fakeUserProfileDataStore = fakeUserProfileDataStore;
//   }
//
//    List<UserProfile> getUserProfiles(){
//       return fakeUserProfileDataStore.getUserProfiles();
//    }
//
//}


@Configuration
public class UserProfileDataAccessService {

    @Bean
    CommandLineRunner commandLineRunner(
        FakeUserProfileDataStore repository){
        return args -> {
            UserProfile lisa = new UserProfile(
                    1l,
                    "lisa",
                      null
            );
            UserProfile Tom = new UserProfile(
                    3l,
                    "Tom",
                    null
            );

            repository.saveAll(List.of(lisa,Tom));
        };
    }

}
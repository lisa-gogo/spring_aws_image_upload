package com.lisa.spring_aws_image_upload.datastore;

import com.lisa.spring_aws_image_upload.profile.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

//@Repository
//public class FakeUserProfileDataStore {
//
//
//
//    public FakeUserProfileDataStore() {
//    }
//
//    public List<UserProfile> getUserProfiles(){
//        return List.of(new UserProfile(1l,"lisa",null),
//                new UserProfile(3L,"Tom",null))
//                ;
//    }
//}
@Repository
public interface FakeUserProfileDataStore extends JpaRepository<UserProfile,Long> {

}
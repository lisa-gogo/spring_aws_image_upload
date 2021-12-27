package com.lisa.spring_aws_image_upload.datastore;

import com.lisa.spring_aws_image_upload.profile.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import javax.transaction.Transactional;
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

    @Transactional //try to add this annotation
    @Modifying
    @Query("UPDATE UserProfile u SET u.userProfileImageLink = :filename WHERE u.userProfileId= :id ")
    void updateUserImageLink(@Param("filename") String Link, @Param("id") Long id);


//    @Query("SELECT * FROM UserProfile ORDER BY userProfileId");
//    List<UserProfile> findAllOrderByUserProfileIdAsc();
}

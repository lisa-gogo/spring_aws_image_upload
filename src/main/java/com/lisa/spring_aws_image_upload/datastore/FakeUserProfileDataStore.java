package com.lisa.spring_aws_image_upload.datastore;

import com.lisa.spring_aws_image_upload.profile.UserProfile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class FakeUserProfileDataStore {

    private static final List<UserProfile> USER_PROFILES = new ArrayList<>();

    static {
        USER_PROFILES.add(new UserProfile(UUID.randomUUID(),"lisa",null));
        USER_PROFILES.add(new UserProfile(UUID.randomUUID(),"Tom",null));
    }

    public List<UserProfile> getUserProfiles(){
        return USER_PROFILES;
    }
}

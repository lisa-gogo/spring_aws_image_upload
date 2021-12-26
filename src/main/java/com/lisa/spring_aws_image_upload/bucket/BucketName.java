package com.lisa.spring_aws_image_upload.bucket;

public enum BucketName {

    PROFILE_IMAGE("lisacode-image-upload-123");
    private final String bucketName;

    BucketName(String bucketName){
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }
}

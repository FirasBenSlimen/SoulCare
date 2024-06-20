package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Post;

import java.util.List;

public interface IPostService {
    public List<Post> getAllPosts();
    public Post getPostById(Long id);
    public Post saveOrUpdatePost(Post post);
    public void deletePost(Long id);
}

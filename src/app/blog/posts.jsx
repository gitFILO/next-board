'use client';
import {useQuery } from '@tanstack/react-query';
import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { Post } from '@/lib/models';

const getData = async () => {
    console.log("getDat called!")
    const res = await fetch("http://localhost:3000/api/blog");
    if (!res.ok) throw new Error("Fetching error");
    return res.json();
}

const Posts = () => {
    console.log("page..")
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getData, 
        refetchInterval: 2000 // 2초마다 폴링
    });
    
    if (!posts){
        return <div>empty!</div>
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <div className={styles.container}>
            {posts.map((post) => (
                <div className={styles.post} key={post.id}>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
    );
}


export default Posts;
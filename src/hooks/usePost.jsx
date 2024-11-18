import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if(sort) {
            console.log(typeof posts, typeof sort);
            return [...posts].sort((a,b) => a[sort].localeCompare(b[sort]));
        }
        console.log('func is done');
        return posts;
    }, [sort, posts]);

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    console.log(typeof sortedPosts);
    const sortedAndSearchedPosts = useMemo(() => {
        console.log(typeof sortedPosts);
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [query, sortedPosts]);

    return sortedAndSearchedPosts;
}
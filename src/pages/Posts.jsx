import React, {useEffect, useRef, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPagesCount} from "../utils/pages";
import {usePosts} from "../hooks/usePost";
import PostFilter from "../Components/PostFilter";
import PostForm from "../Components/PostForm";
import MyModal from "../Components/UI/MyModal/MyModal";
import MyButton from "../Components/UI/button/MyButton";
import Pagination from "../Components/UI/Pagination/Pagination";
import PostList from "../Components/PostList";
import Loader from "../Components/UI/Loader/Loader";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";


function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCount, limit));
    });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page)
    },[page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false )
    }

    const removePost = (post) => {
        console.log(typeof post);
        setPosts(posts.filter((p) => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton style={{marginTop: 15}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                OnChange={(value) => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: -1, name: 'Показать все'}
                ]}
            />
            {postError &&
                <h1 style={{display: 'flex', justifyContent: 'center'}}>Произошла ошибка {postError}</h1>
            }
            <PostList posts={sortedAndSearchedPosts} remove={removePost} title='Список постов 1' />
            <div ref={lastElement} style={{height: 20}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
            }
            <Pagination
                totalPages={totalPages}
                changePage={changePage}
                pages={posts}
            />
        </div>
    );
}
export default Posts;
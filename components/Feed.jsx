"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick, handleProfileClick}) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard 
                    key = {post._id}
                    post = {post}
                    handleTagClick = {handleTagClick}
                    handleProfileClick = {handleProfileClick}
                />
            ))}

        </div>
    )
}






const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allPosts, setAllPosts] = useState([])


    const router = useRouter()

    const handleProfileClick = (userId) => {
        router.push(`/profile/${userId}`)
    }

    const handleSearchChange = (e) => {
        e.preventDefault()
        console.log(e.target.value)
        setSearchText(e.target.value)
    }

    const handleTagClick = (tag) => {
        setSearchText(tag)
    }


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()

            setAllPosts(data)
        }

        fetchPosts()
    }, [])

    useEffect(() => {
        const filtered = searchText ? allPosts.filter((post) => {
            const tagMatch = post.tag && post.tag.toLowerCase().includes(searchText.toLowerCase());
            const userMatch = post.creator.username && post.creator.username.toLowerCase().includes(searchText.toLowerCase())
            const promptMatch = post.prompt && post.prompt.toLowerCase().includes(searchText.toLowerCase())
            return tagMatch || userMatch || promptMatch
        }) : allPosts

        setFilteredPosts(filtered)

    }, [searchText, allPosts])

    

    


    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username...'
                    value={searchText}
                    onChange={handleSearchChange} required
                    className='search_input peer'
                />
            </form>

            <PromptCardList 
                data = {filteredPosts}
                handleTagClick = {handleTagClick}
                handleProfileClick = {handleProfileClick}
            
            />

        </section>
    )
}

export default Feed
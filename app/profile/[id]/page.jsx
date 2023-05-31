"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';

const UserProfile = ({params}) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get('name')
    const [userPosts, setUserPosts] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const data = await response.json()

            setUserPosts(data)
        }

        if (params?.id) {
            fetchPosts()
        }
    }, [params.id])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                })

                const filteredPosts = posts.filter((p) => p._id !== post._id)

                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const isCurrentUser = session?.user.id === params?.id

    console.log(userName);
    return (
        <Profile
            name={isCurrentUser ? "My" : `${userName}'s`}
            desc={`Welcome to ${isCurrentUser ? "my" : `${userName}'s`} profile!`}
            data={userPosts}
            handleEdit={isCurrentUser ? handleEdit : null}
            handleDelete={isCurrentUser ? handleDelete : null}
        />
    )
}

export default UserProfile
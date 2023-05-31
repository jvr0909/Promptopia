"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';



const EditPrompt = () => {
    const [submitting, setsubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })
    const SearchParams = useSearchParams()
    const promptId = SearchParams.get('id')


    const router = useRouter()

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if (promptId) {
            getPromptDetails()
        }

    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setsubmitting(true)

        if (!promptId) {
            return alert('Prompt ID is missing')
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setsubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt
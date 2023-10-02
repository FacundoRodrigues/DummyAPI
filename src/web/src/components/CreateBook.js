import React, { useEffect, useState } from 'react'

export const CreateBook = () => {
    const INITIAL_VALUES = {
        title: '',
        author: ''
    }

    const [formState, setFormState] = useState(INITIAL_VALUES)

    const { title, author } = formState

    const handleSubmit = ( e ) => {
        e.preventDefault()

        try 
        {
            console.log(title)
            console.log(author)
            fetch("http://localhost:5199/Bookitems", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    author: author
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.status !== 200) console.log("Some error occured");
                console.log('OK')
                setFormState(INITIAL_VALUES)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = ({target}) => {
        setFormState({
            ...formState,
            [target.name] : target.value
        })
    }

    return (
        <>
            <h1>Create Book</h1>
            <hr />

            <form onSubmit={ handleSubmit }>
                <input
                    type='text'
                    name='title'
                    value={title}
                    placeholder='Title'
                    onChange={ handleInputChange }
                />

                <input
                    type='text'
                    name='author'
                    value={author}
                    placeholder='Author'
                    onChange={ handleInputChange }
                />

                <button>Save</button>
            </form>
        </>
    )
}

import React, { useEffect, useState } from 'react'

export const BookList = () => {
    const [book, setBook] = useState([])

    useEffect( () => {
        fetch('http://localhost:5199/Bookitems')
            .then(res => res.json())
            .then(data => setBook(data))
    },[])

    return (
        <>
            <h1>Book List</h1>
            <hr />

            { 
                book.map( item => 
                    <div key={item.id}>
                        <p>
                            <strong>{ item.title }</strong> - <cite>{ item.author }</cite>
                        </p>
                        <cite></cite>
                    </div>
                ) 
            }
        </>
    )
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BookList } from './components/BookList';
import { CreateBook } from './components/CreateBook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BookList  />
);
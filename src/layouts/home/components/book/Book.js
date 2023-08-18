import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';
import clsx from 'clsx';

import styles from './Book.module.scss';

function Book({ book }) {
    console.log(book);
    return (
        <Link to={`/book/${book.bookId}`} style={{ display: 'block', height: '100%' }}>
            <div className={clsx(styles.wrapper)}>
                <img src={book.bookImageLink} alt={book.bookTitle} title={book.bookTitle} />{' '}
            </div>{' '}
        </Link>
    );
}

export default Book;

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

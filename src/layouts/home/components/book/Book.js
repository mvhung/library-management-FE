import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';
import clsx from 'clsx';

import styles from './Book.module.scss';
function Book({ book }) {
    return (
        // <Grid item xs={6} md={4} xl={3}>
        // {/* <DefaultProjectCard
        //     image={book.image}
        //     label={book.category}
        //     title={book.title}
        //     description={book.description}
        //     action={{
        //         type: 'internal',
        //         route: '/profile',
        //         color: 'info',
        //         label: 'Mượn ngay',
        //     }}
        //     authors={book.authors}
        // /> */}
        // </Grid>
        <Link to={'/view/book'} style={{ display: 'block', height: '100%' }}>
            <div className={clsx(styles.wrapper)}>
                <img src={book.image} />
            </div>
        </Link>
    );
}

export default Book;

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

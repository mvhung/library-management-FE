import { Grid } from '@mui/material';
import PropTypes from 'prop-types';

import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';
function Book({ book }) {
    return (
        <Grid item xs={6} md={3} xl={3}>
            <DefaultProjectCard
                image={book.image}
                label={book.category}
                title={book.title}
                description={book.description}
                action={{
                    type: 'internal',
                    route: '/profile',
                    color: 'info',
                    label: 'Mượn ngay',
                }}
                authors={book.authors}
            />
        </Grid>
    );
}

export default Book;

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

import clsx from 'clsx';
import PropTypes from 'prop-types';

import styles from './SearchItem.module.scss';
import { Link } from 'react-router-dom';
function SearchItem({ id, title, publishYear, img }) {
    return (
        <Link to={'/book/' + id}>
            <div className={clsx(styles.wrapper)}>
                <img src={img} />
                <div className={clsx(styles.body)}>
                    <h4>{title}</h4>
                    <p>{publishYear}</p>
                </div>
            </div>
        </Link>
    );
}

export default SearchItem;

SearchItem.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    publishYear: PropTypes.number,
    img: PropTypes.string,
};

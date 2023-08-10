import clsx from 'clsx';
import styles from './Book.module.scss';
import PropTypes from 'prop-types';
function BookImg({ src, active }) {
    return (
        <div className={clsx(styles.bookimg, active ? styles.active : '')}>
            <img height={'112px'} src={src} />
        </div>
    );
}

export default BookImg;

BookImg.propTypes = {
    src: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
};

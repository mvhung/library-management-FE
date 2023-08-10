import PropTypes from 'prop-types';
import styles from './Book.module.scss';
import clsx from 'clsx';
function PreviewImg({ src }) {
    return (
        <div className={clsx(styles.previewImgWrapper)}>
            <img className={clsx(styles.previewImg)} src={src} />
        </div>
    );
}

export default PreviewImg;

PreviewImg.propTypes = {
    src: PropTypes.string.isRequired,
};

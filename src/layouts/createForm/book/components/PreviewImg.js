import PropTypes from 'prop-types';
import styles from './Book.module.scss';
import clsx from 'clsx';
function PreviewImg({ src, edit, ...prop }) {
    return (
        <div className={clsx(styles.previewImgWrapper)} {...prop}>
            <img className={clsx(styles.previewImg)} src={src} />
            {edit && (
                <span className={clsx(styles.deleteBtn)} onClick={edit}>
                    Delete
                </span>
            )}
        </div>
    );
}

export default PreviewImg;

PreviewImg.propTypes = {
    src: PropTypes.string.isRequired,
    edit: PropTypes.func,
};

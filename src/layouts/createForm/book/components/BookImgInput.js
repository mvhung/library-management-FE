import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styles from './Book.module.scss';
import clsx from 'clsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function BookImgInput({ onChangeFile, mini }) {
    return (
        <div className={clsx(styles.wrapper, mini ? styles.inputMini : '')}>
            <div className={clsx(styles.fileUpload)}>
                <input type="file" onChange={(e) => onChangeFile(e.target.files)} onClick={(e) => console.log(e)} />
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    );
}

export default BookImgInput;

BookImgInput.propTypes = {
    onChangeFile: PropTypes.func,
    mini: PropTypes.bool,
};

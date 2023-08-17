import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styles from './Book.module.scss';
import clsx from 'clsx';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function ImgInput({ onChangeFile, mini, ...prop }) {
    return (
        <div className={clsx(styles.wrapper, mini ? styles.inputMini : '')} {...prop}>
            <div className={clsx(styles.fileUpload)}>
                <input type="file" onChange={(e) => onChangeFile(e.target.files)} />
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    );
}

export default ImgInput;

ImgInput.propTypes = {
    onChangeFile: PropTypes.func,
    mini: PropTypes.bool,
};

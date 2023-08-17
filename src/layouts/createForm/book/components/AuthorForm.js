import { Grid, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

import PreviewImg from './PreviewImg';
import ImgInput from './ImgInput';

import styles from '../BookForm.module.css';
import styles2 from './Book.module.scss';
import clsx from 'clsx';
function AuthorInput({ author, handleChangeAuthor, handleChangeAuthorImg }) {
    return (
        <Grid item xs={6}>
            <div className={clsx(styles.wrapForm)}>
                <div className={clsx(styles.containerImg)}>
                    <div className={clsx(styles.wrapperPreview)} style={{ height: '112px', marginRight: '12px' }}>
                        {author.img ? (
                            <PreviewImg src={author.img} style={{ height: '100%' }} />
                        ) : (
                            // <ImgInput
                            //     mini
                            //     authorId={author.id}
                            //     onChangeFile={handleChangeAuthorImg}
                            //     style={{ height: '112px' }}
                            // />
                            // <input type="file" onChange={(e) => handleChangeAuthorImg(author.id, e.target.files)} />
                            <div className={clsx(styles2.wrapper, styles2.inputMini)} style={{ height: '112px' }}>
                                <div className={clsx(styles2.fileUpload)}>
                                    <input
                                        type="file"
                                        onChange={(e) => handleChangeAuthorImg(author.id, e.target.files)}
                                    />
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={clsx(styles.wrapperInput)}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Tên tác giả"
                        onChange={(e) => handleChangeAuthor(author.id, 'name', e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Giới thiệu"
                        onChange={(e) => handleChangeAuthor(author.id, 'introduce', e.target.value)}
                    />
                </div>
            </div>
        </Grid>
    );
}

export default AuthorInput;

AuthorInput.propTypes = {
    author: PropTypes.object.isRequired,
    handleChangeAuthor: PropTypes.func,
    handleChangeAuthorImg: PropTypes.func,
};

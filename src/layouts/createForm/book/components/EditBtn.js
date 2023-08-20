import clsx from 'clsx';
// import tooltip from 'assets/theme/components/tooltip';
import { Tooltip } from '@mui/material';
import Icon from '@mui/material/Icon';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Book.module.scss';

function EditBtn({ id }) {
    return (
        <Tooltip title={'edit'} placement="top">
            <Link className={clsx(styles.editBtn)} to={'/update/book/' + id}>
                <Icon>edit</Icon>
            </Link>
        </Tooltip>
    );
}

export default EditBtn;

EditBtn.propTypes = {
    id: PropTypes.number.isRequired,
};

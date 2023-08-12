import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './category.module.scss';
function CategoryBtn({ to, children }) {
    return (
        <div className={clsx(styles.categoryItem)}>
            <Link to={to}>{children}</Link>
        </div>
    );
}

export default CategoryBtn;

CategoryBtn.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
};

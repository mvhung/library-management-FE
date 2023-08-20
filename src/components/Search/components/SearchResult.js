import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './SearchItem.module.scss';
function SearchResult({ children }) {
    return <div className={clsx(styles.resultWrapper)}>{children}</div>;
}

export default SearchResult;

SearchResult.propTypes = {
    children: PropTypes.node,
};

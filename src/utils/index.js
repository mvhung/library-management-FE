import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { useState } from 'react';
export function WrapInput({ type, ...ref }) {
    const [focus, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return <TextField onFocus={onFocus} onBlur={onBlur} type={hasValue || focus ? type : 'text'} {...ref} />;
}
WrapInput.propTypes = {
    type: PropTypes.string,
};

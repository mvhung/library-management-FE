import { Card } from '@mui/material';
import PropTypes from 'prop-types';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import { Category } from '@mui/icons-material';

function BooksContainer({ category, children }) {
    return (
        <SoftBox mb={3}>
            <Card>
                <SoftBox pt={2} px={2}>
                    <SoftBox mb={3}>
                        <SoftTypography variant="h6" fontWeight="medium">
                            {category}
                        </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1}>
                        <SoftTypography variant="button" fontWeight="regular" color="text">
                            {/* Architects design houses */}
                        </SoftTypography>
                    </SoftBox>
                </SoftBox>
                {children}
            </Card>
        </SoftBox>
    );
}

export default BooksContainer;

BooksContainer.propTypes = {
    children: PropTypes.node.isRequired,
    category: PropTypes.string,
};

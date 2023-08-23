import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import LoanService from 'services/loan.service';
const style = {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const styleRentBtn = {
    display: 'block',
    textAlign: 'center',
    // backgroundColor: '#ccc',
    color: '#fff',
    borderRadius: '2px',
    padding: '10px',
    height: '100%',
    fontSize: '16px',
    marginLeft: '12px',
    width: '60px',
    cursor: 'pointer',
};

export default function RentModal({ user, book, children }) {
    const [open, setOpen] = React.useState(false);
    const [rentNum, setRentNum] = React.useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(user, book);
    const handleRent = () => {
        let postLoan = {
            user: { userId: user.userId },
            books: [
                {
                    bookId: book.bookId,
                    bookQuantity: rentNum,
                },
            ],
        };
        LoanService.addLoan([postLoan]);
    };

    return (
        <>
            <Button onClick={handleOpen}>{children}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p style={{ position: 'absolute', zIndex: 1, bottom: 0, fontSize: '16px' }}>
                        Available: {book.bookQuantity}
                    </p>
                    <TextField
                        required
                        autoComplete="off"
                        // defaultValue={quantity}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        id="outlined-number-required"
                        value={rentNum}
                        onChange={(e) => setRentNum(e.target.value)}
                        label="Số lượng mượn"
                        type="number"
                    />
                    <span
                        style={{ ...styleRentBtn, backgroundColor: book.bookQuantity > 0 ? '#2f95ec' : '#ccc' }}
                        onClick={book.bookQuantity > 0 ? handleRent : null}
                    >
                        Rent
                    </span>
                </Box>
            </Modal>
        </>
    );
}

RentModal.propTypes = {
    children: PropTypes.object,
    user: PropTypes.object,
    book: PropTypes.object,
};

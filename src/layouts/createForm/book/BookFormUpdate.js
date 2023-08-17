import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Box, Grid, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import styles from './BookForm.module.css';
import { WrapInput } from 'utils';
import PreviewImg from './components/PreviewImg';
import BookImg from './components/BookImg';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import BookImgInput from './components/ImgInput';
import clsx from 'clsx';

const data = {
    bookImg: [
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/9/1131w/canva-black-modern-employee-handbook-booklet-HlgaYfk8wVw.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/0/1131w/canva-black-modern-employee-handbook-booklet-56Yvsbgke30.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        // 'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
    ],
};

function BookFormUpdate({ currentBook }) {
    const { id } = useParams();

    const [activeImg, setActiveImg] = useState(currentBook.bookImg[0]);
    const [bookImg, setBookImg] = useState(currentBook.bookImg);

    const [title, setTitle] = useState(currentBook.title);
    const [description, setDescription] = useState(currentBook.description);
    const [date, setDate] = useState(currentBook.date);
    const [quantity, setQuantity] = useState(currentBook.quantity);
    const [author, setAuthor] = useState(currentBook.author);
    const [publisher, setPublisher] = useState(currentBook.publisher);
    const [category, setCategory] = useState(currentBook.category);

    function handleChangeImg(img) {
        setActiveImg(img);
    }
    function handleFileInput(file) {
        // console.log(file);
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);
            setActiveImg(newUrl);
            setBookImg((pre) => [...pre, newUrl]);
        }
    }
    function handleSubmit() {
        let object = { title, description, date, quantity, author, publisher, category };
        console.log(object);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid style={{ marginTop: '28px' }} container spacing={2}>
                <Grid item xs={6}>
                    <div className={clsx(styles.containerImg)}>
                        <div className={clsx(styles.wrapperPreview)}>
                            {activeImg ? (
                                <PreviewImg src={activeImg} />
                            ) : (
                                <BookImgInput onChangeFile={handleFileInput} />
                            )}
                        </div>

                        <Swiper modules={[Pagination, Scrollbar, A11y]} spaceBetween={20} slidesPerView={'auto'}>
                            {bookImg.map((img, index) => (
                                <SwiperSlide key={index} onClick={() => handleChangeImg(img)}>
                                    <BookImg src={img} active={img == activeImg} />
                                </SwiperSlide>
                            ))}

                            {activeImg && (
                                <SwiperSlide style={{ paddingRight: '36px' }}>
                                    <BookImgInput onChangeFile={handleFileInput} mini />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={clsx(styles.wrapperInput)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Tên sách"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <WrapInput
                                style={{ flex: 1, marginRight: '12px' }}
                                label="Năm xuất bản"
                                type="datetime-local"
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <TextField
                                required
                                id="outlined-number-required"
                                onChange={(e) => setQuantity(e.target.value)}
                                label="Số lượng"
                                type="number"
                            />
                        </div>
                        <TextareaAutosize
                            minRows={10}
                            placeholder="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            onChange={(e) => setAuthor(e.target.value)}
                            label="Tác giả"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            onChange={(e) => setPublisher(e.target.value)}
                            label="Nhà xuất bản"
                        />
                        <TextField id="outlined" onChange={(e) => setCategory(e.target.value)} label="Thể loại" />
                    </div>
                </Grid>
                <Grid item xs={12} md={6} lg={9}></Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <div className={clsx(styles.submitBtn)}>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

export default BookFormUpdate;

BookFormUpdate.propTypes = {
    currentBook: PropTypes.object,
    bookId: PropTypes.number.isRequired,
};

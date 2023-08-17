import { useState } from 'react';
import { Link } from 'react-router-dom';

import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import SoftTypography from 'components/SoftTypography';
import SoftButton from 'components/SoftButton';
import PageLayout from 'examples/LayoutContainers/PageLayout';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Box, Grid, TextField, Autocomplete, TextareaAutosize, Divider } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import styles from './BookForm.module.css';
import { WrapInput } from 'utils';
import PreviewImg from './components/PreviewImg';
import BookImg from './components/BookImg';
import { Pagination, Scrollbar, A11y } from 'swiper/modules';
import ImgInput from './components/ImgInput';
import clsx from 'clsx';
import { Height } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AuthorInput from './components/AuthorForm';

function BookForm() {
    const [activeImg, setActiveImg] = useState('');
    const [bookImg, setBookImg] = useState('');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [authors, setAuthors] = useState([{ id: 0, name: 'ahh', introduce: 'haha', img: null }]);
    const [publisher, setPublisher] = useState('');
    const [category, setCategory] = useState('');

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
        let object = { title, description, date, quantity, authors, publisher, category };
        console.log(object);
    }

    function handelAddAuthor() {
        setAuthors((pre) => [...pre, { id: pre.length, name: null, introduce: null, img: null }]);
    }

    function handleChangeAuthor(id, key, value) {
        setAuthors((pre) => {
            pre[id][key] = value;
            return [...pre];
        });
    }
    function handleChangeAuthorImg(id, file) {
        console.log(file);
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);
            setAuthors((pre) => {
                pre[id]['img'] = newUrl;
                return [...pre];
            });
        }
    }
    console.log(authors);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid style={{ marginTop: '28px' }} container spacing={2}>
                <Grid item xs={6}>
                    <div className={clsx(styles.containerImg)}>
                        <div className={clsx(styles.wrapperPreview)}>
                            {activeImg ? <PreviewImg src={activeImg} /> : <ImgInput onChangeFile={handleFileInput} />}
                        </div>

                        {/* <Swiper modules={[Pagination, Scrollbar, A11y]} spaceBetween={20} slidesPerView={'auto'}>
                            {bookImg.map((img, index) => (
                                <SwiperSlide key={index} onClick={() => handleChangeImg(img)}>
                                    <BookImg src={img} active={img == activeImg} />
                                </SwiperSlide>
                            ))}

                            {activeImg && (
                                <SwiperSlide style={{ paddingRight: '36px' }}>
                                    <ImgInput onChangeFile={handleFileInput} mini />
                                </SwiperSlide>
                            )}
                        </Swiper> */}
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

                        <TextField id="outlined" onChange={(e) => setCategory(e.target.value)} label="Thể loại" />
                    </div>
                </Grid>
            </Grid>
            <Divider />
            <h5 style={{ marginBottom: '12px' }}>Tác giả</h5>
            <Grid container>
                {authors.map((author, index) => (
                    <AuthorInput
                        author={author}
                        key={index}
                        handleChangeAuthor={handleChangeAuthor}
                        handleChangeAuthorImg={handleChangeAuthorImg}
                    />
                ))}
                <Grid item xs={6}>
                    <div className={clsx(styles.addAuthor)} onClick={handelAddAuthor}>
                        <FontAwesomeIcon icon={faPlus} fontSize={'32px'} />
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={9}></Grid>
            <Grid item xs={12} md={6} lg={3}>
                <div className={clsx(styles.submitBtn)}>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </Grid>
        </DashboardLayout>
    );
}

export default BookForm;

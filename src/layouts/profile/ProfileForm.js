import { Box, Grid, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import { WrapInput } from 'utils';
import clsx from 'clsx';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from '../createForm/book/BookForm.module.css';

function ProfileForm() {
    const { id } = useParams();
    const [user, setUser] = useState({
        username: null,
        firtsname: null,
        lastname: null,
        address: null,
        email: null,
        password: null,
    });

    useEffect(() => {}, []);

    // const [activeImg, setActiveImg] = useState(data.bookImg[0]);
    // const [bookImg, setBookImg] = useState(data.bookImg);

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [date, setDate] = useState('');
    // const [quantity, setQuantity] = useState('');
    // const [author, setAuthor] = useState('');
    // const [publisher, setPublisher] = useState('');
    // const [category, setCategory] = useState('');

    // function handleChangeImg(img) {
    //     setActiveImg(img);
    // }
    // function handleFileInput(file) {
    //     // console.log(file);
    //     if (file.length != 0) {
    //         let newUrl = URL.createObjectURL(file[0]);
    //         setActiveImg(newUrl);
    //         setBookImg((pre) => [...pre, newUrl]);
    //     }
    // }
    function handleSubmit() {
        let object = user;
        console.log(object);
    }
    function handleInput(key, value) {
        user[key] = value;
        setUser(user);
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid style={{ marginTop: '28px' }} container spacing={2}>
                {/* <Grid item xs={6}>
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
                </Grid> */}
                <Grid item xs={6}>
                    <div className={clsx(styles.wrapperInput)}>
                        <TextField
                            required
                            id="outlined-required"
                            label="User Name"
                            onChange={(e) => handleInput('username', e.target.value)}
                        />
                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                style={{ flex: 1, marginRight: '12px' }}
                                label="Firt Name"
                                // type="datetime-local"
                                onChange={(e) => handleInput('firstname', e.target.value)}
                            />
                            <TextField
                                // required
                                id="outlined"
                                onChange={(e) => handleInput('lastname', e.target.value)}
                                label="Last Name"
                                // type="number"
                            />
                        </div>
                        {/* <TextareaAutosize
                            minRows={10}
                            placeholder="description"
                            onChange={(e) => handleInput(e.target.value)}
                        /> */}
                        <TextField
                            required
                            id="required"
                            onChange={(e) => handleInput('password', e.target.value)}
                            label="Password"
                            type="password"
                        />
                        <TextField
                            required
                            id="required"
                            onChange={(e) => handleInput('email', e.target.value)}
                            label="Email"
                            type="email"
                        />
                        <TextField
                            id="outlined"
                            onChange={(e) => handleInput('address', e.target.value)}
                            label="Address"
                        />
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

export default ProfileForm;

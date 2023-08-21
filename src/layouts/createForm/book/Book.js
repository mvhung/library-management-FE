import { useState } from 'react';
import { Link } from 'react-router-dom';

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
import clsx from 'clsx';
import Separator from 'layouts/authentication/components/Separator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import SoftAvatar from 'components/SoftAvatar';
import CategoryBtn from '../category/categoryBtn';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import BookService from 'services/book.service';
import UserService from 'services/user.service';
import EditBtn from './components/EditBtn';
function Book() {
    const { bookId } = useParams();
    const [user, setUser] = useState();
    const [userRole, setUserRole] = useState();

    useEffect(() => {
        UserService.getUser().then((res) => {
            if (res) {
                setUserRole(res.roleName);
            }
        });
    }, []);

    const [bookDetail, setBookDetail] = useState(null);
    const [activeImg, setActiveImg] = useState('');
    const [bookImg, setBookImg] = useState('');

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const book = await BookService.getBookById(bookId);
                setBookDetail(book);
                setActiveImg(book.bookImageLink);
                setBookImg(book.bookImageLink);
            } catch (error) {
                console.error('Error fetching book detail:', error);
            }
        };

        fetchBookDetail();
    }, [bookId]);

    const handleSubmit = () => {
        // Viết code xử lý thuê sách
    };

    const renderAuthors = bookDetail?.authors?.map((author, index) => (
        <div key={index} style={{ marginRight: '14px' }}>
            <SoftAvatar
                src={author.authorImageUrl}
                alt={author.authorFullName}
                size="md"
                sx={({ borders: { borderWidth }, palette: { white } }) => ({
                    border: `${borderWidth[2]} solid ${white.main}`,
                    cursor: 'pointer',
                    position: 'relative',
                    ml: -1.25,

                    '&:hover, &:focus': {
                        zIndex: '10',
                    },
                })}
            />
            <span style={{ fontSize: '14px' }}>{author.authorFullName}</span>
        </div>
    ));

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {bookDetail && (
                <Grid style={{ marginTop: '28px' }} container spacing={2}>
                    <Grid item xs={6}>
                        <div className={clsx(styles.containerImg)}>
                            {/* Hiển thị ảnh sách */}
                            <div className={clsx(styles.wrapperPreview)}>
                                {activeImg ? <PreviewImg src={activeImg} /> : null}
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ padding: '0 30px' }}>
                        <h1 className={clsx(styles.title)}>{bookDetail.bookTitle}</h1>
                        <p className={clsx(styles.publishYear)}>
                            <span>Published in</span>
                            <FontAwesomeIcon icon={faCircle} />
                            {bookDetail.bookPublishedYear}
                        </p>

                        <div className={clsx(styles.avatar)}>{renderAuthors}</div>

                        <Separator />

                        <SoftBox display="flex">
                            <span style={{ fontSize: '14px', marginRight: '12px' }}>Edit and publish:</span>
                            <div className={styles.publisher}>
                                <SoftAvatar
                                    src={bookDetail.publisher.publisherImageUrl}
                                    alt={bookDetail.publisher.publisherName}
                                    size="sm"
                                />
                                <span style={{ fontSize: '14px' }}>{bookDetail.publisher.publisherName}</span>
                            </div>
                        </SoftBox>

                        <div className={clsx(styles.submitBtn)} style={{ marginTop: '32px' }}>
                            <button onClick={handleSubmit}>Rent Now</button>
                            {userRole == 'ADMIN' && <EditBtn id={bookId} />}
                        </div>

                        <div className={clsx(styles.wrapCategory)}>
                            <CategoryBtn to={`/category/${bookDetail.category.categoryId}`}>
                                {bookDetail.category.categoryName}
                            </CategoryBtn>
                        </div>
                    </Grid>
                </Grid>
            )}

            {/* Hiển thị mô tả sách */}
            {bookDetail && (
                <Grid>
                    <div className={clsx(styles.paragraph)}>
                        <h3>Description</h3>
                        <p style={{ fontSize: '16px' }}>{bookDetail.bookDescription}</p>
                    </div>
                </Grid>
            )}
        </DashboardLayout>
    );
}

export default Book;

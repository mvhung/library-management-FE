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
import BookImgInput from './components/BookImgInput';
import clsx from 'clsx';
import Separator from 'layouts/authentication/components/Separator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import SoftAvatar from 'components/SoftAvatar';
import CategoryBtn from '../category/categoryBtn';

const book = {
    title: 'black modern Employee Handbook booklet ',
    publishYear: '2017-22-13',
    author: {
        name: 'david teo',
        img: 'https://avatar.canva.com/avatars/users/0d893959-a2df-4dfc-b1e3-ae27c7b8d1f9/200.png',
    },
    publisher: [
        {
            name: 'david teo',
            img: 'https://avatar.canva.com/avatars/users/0d893959-a2df-4dfc-b1e3-ae27c7b8d1f9/200.png',
        },
        {
            name: 'david teo',
            img: 'https://avatar.canva.com/avatars/users/0d893959-a2df-4dfc-b1e3-ae27c7b8d1f9/200.png',
        },
        {
            name: 'david teo',
            img: 'https://avatar.canva.com/avatars/users/0d893959-a2df-4dfc-b1e3-ae27c7b8d1f9/200.png',
        },
        {
            name: 'david teo',
            img: 'https://avatar.canva.com/avatars/users/0d893959-a2df-4dfc-b1e3-ae27c7b8d1f9/200.png',
        },
    ],
    category: ['Kinh dị', 'Hài hước'],
    description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut excepturi eum sequi minus, sint tenetur quidem debitis adipisci? Quia, molestiae architecto dolorum animi tempora veritatis ipsum sit non itaque voluptate. Sed omnis voluptate itaque fugit laudantium, molestiae odit adipisci, at reprehenderit accusantium quos dicta beatae eum delectus consequuntur cupiditate recusandae quia voluptates, repellat sit repudiandae eius ipsa! Optio saepe rerum facilis voluptate aliquid unde adipisci, sit molestiae id dolor enim cupiditate necessitatibus aspernatur repellat repudiandae odit? In illo vitae ducimus eveniet hic saepe vero nam, accusantium repellat rerum laudantium officiis, esse adipisci architecto deserunt natus doloremque! Numquam ipsa magni a, voluptatem itaque recusandae exercitationem accusantium maxime, aliquam commodi laudantium sint voluptatum. Consequuntur libero distinctio fugit quidem dolor, laboriosam tenetur officia mollitia officiis consequatur accusantium, corporis consectetur voluptate cumque error veniam reprehenderit maiores vel voluptates provident aspernatur! Similique minus, ipsam dolore dicta earum aliquam quasi fugiat ex ipsum dolor saepe quam possimus vitae quaerat ea perferendis et, neque maiores dolorum adipisci ut corrupti dolorem minima corporis. Tempora natus ipsam illum placeat vero quisquam ullam modi repudiandae ipsum ducimus aspernatur totam provident maxime rem obcaecati unde dolorem amet quia vitae, sint consequuntur? Facilis numquam corrupti esse porro dolor quo vel! Laborum, illo?',
    bookImg: [
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/9/1131w/canva-black-modern-employee-handbook-booklet-HlgaYfk8wVw.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/0/1131w/canva-black-modern-employee-handbook-booklet-56Yvsbgke30.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
        'https://marketplace.canva.com/EAFaLQ-J2hY/1/1/1131w/canva-black-modern-employee-handbook-booklet-g-IjmvIEP6w.jpg',
    ],
};

function Book() {
    // getCurt
    const renderPublisher = book.publisher.map(({ img: media, name }, index) => (
        <Tooltip key={index} title={name} placement="bottom">
            <SoftAvatar
                src={media}
                alt={name}
                size="xs"
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
        </Tooltip>
    ));

    const [activeImg, setActiveImg] = useState(book.bookImg[0]);
    const [bookImg, setBookImg] = useState(book.bookImg);

    function handleChangeImg(img) {
        setActiveImg(img);
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
                            {activeImg ? <PreviewImg src={activeImg} /> : <></>}
                        </div>

                        <Swiper modules={[Pagination, Scrollbar, A11y]} spaceBetween={20} slidesPerView={'auto'}>
                            {bookImg.map((img, index) => (
                                <SwiperSlide key={index} onClick={() => handleChangeImg(img)}>
                                    <BookImg src={img} active={img == activeImg} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </Grid>
                <Grid item xs={6} style={{ padding: '0 30px' }}>
                    <h1 className={clsx(styles.title)}>{book.title}</h1>
                    <p className={clsx(styles.publishYear)}>
                        <span>Published in</span>
                        <FontAwesomeIcon icon={faCircle} />
                        {book.publishYear}
                    </p>
                    <div className={clsx(styles.avatar)}>
                        <img src={book.author.img} /> by <span>{book.author.name}</span>
                    </div>
                    <Separator />
                    <SoftBox display="flex">
                        <span style={{ fontSize: '14px', marginRight: '12px' }}>Edit and publish:</span>
                        {renderPublisher}
                    </SoftBox>
                    <div className={clsx(styles.submitBtn)} style={{ marginTop: '32px' }}>
                        <button onClick={handleSubmit}>Rent Now</button>
                    </div>
                    <div className={clsx(styles.wrapCategory)}>
                        {book.category.map((category, index) => (
                            <CategoryBtn key={index} to="/">
                                {category}
                            </CategoryBtn>
                        ))}
                    </div>
                </Grid>
            </Grid>
            <Grid>
                <div className={clsx(styles.paragraph)}>
                    <h3>description</h3>
                    <paragraph>{book.description}</paragraph>
                </div>
            </Grid>
        </DashboardLayout>
    );
}

export default Book;

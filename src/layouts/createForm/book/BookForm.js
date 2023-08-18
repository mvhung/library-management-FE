import { useState } from 'react';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Grid, TextField, TextareaAutosize, Divider } from '@mui/material';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AuthorInput from './components/AuthorForm';
import PreviewImg from './components/PreviewImg';
import { uploadImageToS3 } from 'aws/uploadImageToS3';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { WrapInput } from 'utils';
import ImgInput from './components/ImgInput';
import styles from './BookForm.module.css';

function BookForm() {
    const [activeImg, setActiveImg] = useState('');
    const [bookImg, setBookImg] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [authors, setAuthors] = useState([{ name: '', introduce: '', url: null }]);

    const [category, setCategory] = useState({ name: '', description: '' });
    const [publisher, setPublisher] = useState({ name: '', introduce: '', url: null });

    const [authorImage, setAuthorImage] = useState('');
    const [publisherImage, setPublisherImage] = useState('');

    async function handleFileInput(file, type) {
        if (file.length !== 0) {
            const newUrl = URL.createObjectURL(file[0]);
            setActiveImg(newUrl);

            if (type === 'book') {
                setBookImg(file[0]);
            } else if (type === 'author') {
                setAuthorImage(file[0]);
            } else if (type === 'publisher') {
                setPublisherImage(file[0]);
            }
        }
    }

    const handleChangeImg = (img) => {
        setActiveImg(img);
    };

    async function handleUploadImage(file, type) {
        if (!file) {
            return null;
        }

        const uploadedImage = await uploadImageToS3(file, type);
        return uploadedImage;
    }

    const handleSubmit = async () => {
        const uploadedBookImage = await handleUploadImage(bookImg, 'books');
        const uploadedPublisherImage = await handleUploadImage(publisherImage, 'publishers');

        const bookAuthors = await Promise.all(
            authors.map(async (author) => {
                const uploadedAuthorImage = await handleUploadImage(author.img, 'authors');
                return {
                    authorFullName: author.name,
                    authorIntroduce: author.introduce,
                    authorImageUrl: uploadedAuthorImage,
                };
            }),
        );
        const postData = {
            bookTitle: title,
            bookDescription: description,
            bookPublishedYear: parseInt(date.substring(0, 4)),
            bookQuantity: parseInt(quantity),
            bookImageLink: uploadedBookImage,
            category: {
                categoryName: category.name,
                categoryDescription: '',
            },
            publisher: {
                publisherName: publisher.name,
                publisherIntroduce: publisher.introduce,
                publisherWebsiteUrl: '',
                publisherImageUrl: uploadedPublisherImage,
            },
            authors: bookAuthors,
        };

        console.log('Submit data:', postData);
        // Here you can send the postData to your API endpoint
    };
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid style={{ marginTop: '28px' }} container spacing={2}>
                <Grid item xs={6}>
                    <div className={clsx(styles.containerImg)}>
                        <div className={clsx(styles.wrapperPreview)}>
                            {activeImg ? <PreviewImg src={activeImg} /> : <ImgInput onChangeFile={handleFileInput} />}
                        </div>
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
            {/* <Grid container>
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
            </Grid> */}
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

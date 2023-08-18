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

    const [authors, setAuthors] = useState([{ name: '', introduce: '', img: null }]);

    const [category, setCategory] = useState({ name: '', description: '' });

    const [publisher, setPublisher] = useState({ name: '', introduce: '', img: null });

    function handleFileInput(file) {
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);
            setActiveImg(newUrl);
            setBookImg((pre) => [...pre, newUrl]);
        }
    }

    const handleChangeImg = (img) => {
        setActiveImg(img);
    };

    const handleSubmit = async () => {
        if (bookImg) {
            const uploadedBookImage = await uploadImageToS3(bookImg, 'books');
            console.log('Uploaded book image:', uploadedBookImage);
        }

        if (publisher.img) {
            const uploadedPublisherImage = await uploadImageToS3(publisher.img, 'publishers');
            setPublisherImageUrl(uploadedPublisherImage);
            console.log('Uploaded publisher image:', uploadedPublisherImage);
        }

        const bookAuthors = authors.map(async (author) => {
            if (author.img) {
                const uploadedAuthorImage = await uploadImageToS3(author.img, 'authors');
                return {
                    authorFullName: author.name,
                    authorIntroduce: author.introduce,
                    authorImageUrl: uploadedAuthorImage,
                };
            } else {
                return {
                    authorFullName: author.name,
                    authorIntroduce: author.introduce,
                };
            }
        });

        const postData = {
            bookTitle: title,
            bookDescription: description,
            bookPublishedYear: parseInt(date.substring(0, 4)),
            bookQuantity: parseInt(quantity),
            bookImageLink: uploadedBookImages,
            category: {
                categoryName: category.name,
                categoryDescription: '',
            },
            publisher: {
                publisherName: publisher.name,
                publisherIntroduce: publisher.introduce,
                publisherWebsiteUrl: '',
                publisherImageUrl: publisher.img,
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

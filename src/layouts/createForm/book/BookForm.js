import { useEffect, useState } from 'react';
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
import BookService from 'services/book.service';
import { useParams } from 'react-router-dom';

function BookForm() {
    const { id } = useParams();

    const [activeImg, setActiveImg] = useState('');
    const [bookImg, setBookImg] = useState('');
    const [bookImgFile, setBookImgFile] = useState();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [authors, setAuthors] = useState([{ id: 0, name: '', introduce: '', img: null, imgFile: null }]);

    const [category, setCategory] = useState('');
    const [publisher, setPublisher] = useState({ id: 0, name: '', introduce: '', img: null, imgFile: null });

    useEffect(() => {
        if (id) {
            BookService.getBookById(id).then((res) => {
                // setActiveImg()
                if (res) {
                    setActiveImg(res.bookImageLink);
                    setCategory(res.category.categoryName);
                    setDate(res.bookPublishedYear);
                    setDescription(res.bookDescription);
                    setTitle(res.bookTitle);
                    setQuantity(res.bookQuantity);
                    setPublisher((pre) => {
                        pre.name = res.publisher.publisherName;
                        pre.introduce = res.publisher.publisherIntroduce;
                        pre.img = res.publisher.publisherImageUrl;
                        return { ...pre };
                    });
                    setAuthors((pre) => {
                        pre = [];
                        res.authors.map((author, index) =>
                            pre.push({
                                id: index,
                                name: author.authorFullName,
                                introduce: author.authorIntroduce,
                                img: author.authorImageUrl,
                                imgFile: null,
                            }),
                        );
                        return [...pre];
                    });
                }
            });
        }
    }, [id]);

    function handleChangeImg(img) {
        setActiveImg(img);
    }
    function handleFileInput(file) {
        // console.log(file);
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);
            setActiveImg(newUrl);
            setBookImgFile(file[0]);
            setBookImg((pre) => [...pre, newUrl]);
        }
    }

    async function handleUploadImage(file, type) {
        if (!file) {
            return null;
        }

        const uploadedImage = await uploadImageToS3(file, type);
        return uploadedImage;
    }

    const handleSubmit = async () => {
        let uploadedBookImage;
        let uploadedPublisherImage;

        uploadedBookImage = await handleUploadImage(bookImgFile, 'books');
        uploadedPublisherImage = await handleUploadImage(publisher.imgFile, 'publishers');
        const bookAuthors = await Promise.all(
            authors.map(async (author) => {
                const uploadedAuthorImage = await handleUploadImage(author.imgFile, 'authors');
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
                categoryName: category,
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
        BookService.createBook(postData).then((res) => {
            console.log(res);
        });
        console.log('Submit data:', postData);
        // Here you can send the postData to your API endpoint
    };

    const handleUpdate = async () => {
        let uploadedBookImage;
        let uploadedPublisherImage;

        if (bookImgFile) {
            uploadedBookImage = await handleUploadImage(bookImgFile, 'books');
        } else {
            uploadedBookImage = activeImg;
        }
        if (publisher.imgFile) {
            uploadedPublisherImage = await handleUploadImage(publisher.imgFile, 'publishers');
        } else {
            uploadedPublisherImage = publisher.img;
        }

        const bookAuthors = await Promise.all(
            authors.map(async (author, index) => {
                let uploadedAuthorImage;
                if (author.imgFile) {
                    uploadedAuthorImage = await handleUploadImage(author.imgFile, 'authors');
                } else {
                    uploadedAuthorImage = author.img;
                }
                return {
                    authorFullName: author.name,
                    authorIntroduce: author.introduce,
                    authorImageUrl: uploadedAuthorImage,
                };
            }),
        );
        const postData2 = {
            bookTitle: title,
            bookDescription: description,
            bookPublishedYear: parseInt((date + '     ').substring(0, 4)),
            bookQuantity: parseInt(quantity),
            bookImageLink: uploadedBookImage,
            category: {
                categoryName: category,
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
        BookService.updateBook(id, postData2).then((res) => {
            console.log(res);
        });
        console.log('Submit data:', postData2);
        // Here you can send the postData to your API endpoint
    };

    function handleChangeAuthor(id, key, value) {
        setAuthors((pre) => {
            pre[id][key] = value;
            return [...pre];
        });
    }
    function handleChangeAuthorImg(id, file) {
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);
            setAuthors((pre) => {
                pre[id]['img'] = newUrl;
                pre[id]['imgFile'] = file[0];
                return [...pre];
            });
        }
    }
    function handleChangePublisher(id, key, value) {
        setPublisher((pre) => {
            pre[key] = value;
            return { ...pre };
        });
    }
    function handleChangePublisherImg(id, file) {
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);
            setPublisher((pre) => {
                pre['img'] = newUrl;
                pre['imgFile'] = file[0];
                return { ...pre };
            });
        }
    }
    function handelAddAuthor(type) {
        if (type == 'publisher') {
            setPublisher((pre) => [...pre, { id: pre.length, name: null, introduce: null, img: null, imgFile: null }]);
        } else if (type == 'author') {
            setAuthors((pre) => [...pre, { id: pre.length, name: null, introduce: null, img: null, imgFile: null }]);
        }
    }

    function deleteImg(type, id) {
        // setAuthors((pre) => {
        //     pre[id]['img'] = "";
        //     return [...pre];
        // });
        if (type == 'publisher') {
            setPublisher((pre) => {
                pre['img'] = '';
                pre['imgFile'] = '';
                return { ...pre };
            });
        } else if (type == 'author') {
            setAuthors((pre) => {
                pre[id]['img'] = '';
                pre[id]['imgFile'] = '';
                return [...pre];
            });
        } else {
            setActiveImg('');
            setBookImgFile(null);
        }
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid style={{ marginTop: '28px' }} container spacing={2}>
                <Grid item xs={6}>
                    <div className={clsx(styles.containerImg)}>
                        <div className={clsx(styles.wrapperPreview)}>
                            {activeImg ? (
                                <PreviewImg edit={() => deleteImg()} src={activeImg} />
                            ) : (
                                <ImgInput onChangeFile={handleFileInput} />
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={clsx(styles.wrapperInput)}>
                        <TextField
                            required
                            autoComplete="off"
                            // defaultValue={title}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={title}
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
                                autoComplete="off"
                                // defaultValue={date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={date}
                            />
                            <TextField
                                required
                                autoComplete="off"
                                // defaultValue={quantity}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={quantity}
                                id="outlined-number-required"
                                onChange={(e) => setQuantity(e.target.value)}
                                label="Số lượng"
                                type="number"
                            />
                        </div>
                        <TextareaAutosize
                            value={description}
                            minRows={10}
                            placeholder="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            id="outlined"
                            autoComplete="off"
                            // defaultValue={category}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            label="Thể loại"
                        />
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
                        deleteImg={() => deleteImg('author', author.id)}
                    />
                ))}
                <Grid item xs={6}>
                    <div className={clsx(styles.addAuthor)} onClick={() => handelAddAuthor('author')}>
                        <FontAwesomeIcon icon={faPlus} fontSize={'32px'} />
                    </div>
                </Grid>
            </Grid>
            {/* note: author and publiser use same form  */}
            <Divider />
            <h5 style={{ marginBottom: '12px' }}>Nhà xuất bản</h5>
            <Grid container>
                <AuthorInput
                    author={publisher}
                    deleteImg={() => deleteImg('publisher')}
                    handleChangeAuthor={handleChangePublisher}
                    handleChangeAuthorImg={handleChangePublisherImg}
                />

                {/* <Grid item xs={6}>
                    <div className={clsx(styles.addAuthor)} onClick={() => handelAddAuthor('publisher')}>
                        <FontAwesomeIcon icon={faPlus} fontSize={'32px'} />
                    </div>
                </Grid> */}
            </Grid>
            <Grid item xs={12} md={6} lg={9}></Grid>
            <Grid item xs={12} md={6} lg={3}>
                <div className={clsx(styles.submitBtn)}>
                    {id ? (
                        <button onClick={handleUpdate}>Update</button>
                    ) : (
                        <button onClick={handleSubmit}>Submit</button>
                    )}
                </div>
            </Grid>
        </DashboardLayout>
    );
}

export default BookForm;

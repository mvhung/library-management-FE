import { Box, Grid, TextField, Autocomplete, TextareaAutosize } from '@mui/material';
import { WrapInput } from 'utils';
import clsx from 'clsx';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles2 from '../createForm/book/BookForm.module.css';
import UserService from 'services/user.service';

// trash import
import styles from '../createForm/book/BookForm.module.css';
import PreviewImg from '../createForm/book/components/PreviewImg';
import BookImgInput from '../createForm/book/components/ImgInput';

function ProfileForm() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: null,
        firstName: null,
        lastName: null,
        address: null,
        email: null,
        // password: null,
    });

    // const [activeImg, setActiveImg] = useState();
    const [avatar, setAvatar] = useState();

    const [username, setUsername] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [avatarUrl, setAvatarUrl] = useState();

    useEffect(() => {
        UserService.getUserById(id).then(
            (res) => {
                // setUser(res);
                setUsername(res.username);
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setPassword(res.password);
                setEmail(res.email);
                setAddress(res.address);
                setAvatarUrl(res.avatarUrl);
            },
            (error) => {
                console.log(error);
            },
        );
    }, []);

    function handleSubmit() {
        let user = { username, firstName, lastName, address, email, password };
        console.log(user);
        UserService.updateUserAvatar(id, avatar).then((res) => {
            console.log(res);
        });
        UserService.updateUser(id, user).then(
            (res) => {
                navigate('/profile');
            },
            (error) => {
                console.log(error);
            },
        );
    }
    function handleFileInput(file) {
        // console.log(file);
        if (file.length != 0) {
            let newUrl = URL.createObjectURL(file[0]);

            setAvatarUrl(newUrl);
            setAvatar(file[0]);
        }
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid style={{ marginTop: '28px' }} container spacing={2}>
                <Grid item xs={6}>
                    <div className={clsx(styles2.containerImg)}>
                        <div className={clsx(styles2.wrapperPreview)}>
                            {avatarUrl ? (
                                <PreviewImg src={avatarUrl} edit />
                            ) : (
                                <BookImgInput onChangeFile={handleFileInput} />
                            )}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={clsx(styles.wrapperInput)}>
                        <TextField
                            autocomplete="off"
                            defaultValue={username}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={username}
                            required
                            id="outlined-required"
                            label="User Name"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                autocomplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={firstName}
                                value={firstName}
                                style={{ flex: 1, marginRight: '12px' }}
                                label="First Name"
                                // type="datetime-local"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                autocomplete="off"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={lastName}
                                value={lastName}
                                // required
                                id="outlined"
                                onChange={(e) => setLastName(e.target.value)}
                                label="Last Name"
                                // type="number"
                            />
                        </div>

                        <TextField
                            autocomplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={password}
                            value={password}
                            required
                            id="required"
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                        />
                        <TextField
                            autocomplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={email}
                            value={email}
                            required
                            id="required"
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            type="email"
                        />
                        <TextField
                            autocomplete="off"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            defaultValue={address}
                            value={address}
                            id="outlined"
                            onChange={(e) => setAddress(e.target.value)}
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

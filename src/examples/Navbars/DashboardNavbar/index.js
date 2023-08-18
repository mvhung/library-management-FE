/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from 'react';

// react-router components
import { useLocation, Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';

// Soft UI Dashboard React examples
import Breadcrumbs from 'examples/Breadcrumbs';
import NotificationItem from 'examples/Items/NotificationItem';

// Custom styles for DashboardNavbar
import {
    navbar,
    navbarContainer,
    navbarRow,
    navbarIconButton,
    navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles';

// Soft UI Dashboard React context
import { useSoftUIController, setTransparentNavbar, setMiniSidenav, setOpenConfigurator } from 'context';

// Images
import team2 from 'assets/images/team-2.jpg';
import logoSpotify from 'assets/images/small-logos/logo-spotify.svg';
import UserService from 'services/user.service';
import AuthService from 'services/auth.service';
import { MenuItem } from '@mui/material';
import Search from 'components/Search/Search';

function DashboardNavbar({ absolute, light, isMini }) {
    const [user, setUser] = useState();

    useEffect(() => {
        UserService.getUser().then((res) => {
            setUser(res);
            return res;
        });
    }, []);
    const [navbarType, setNavbarType] = useState();
    const [controller, dispatch] = useSoftUIController();
    const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
    const [openMenu, setOpenMenu] = useState(false);
    const route = useLocation().pathname.split('/').slice(1);

    useEffect(() => {
        // Setting the navbar type
        if (fixedNavbar) {
            setNavbarType('sticky');
        } else {
            setNavbarType('static');
        }

        // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
        }

        /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
        window.addEventListener('scroll', handleTransparentNavbar);

        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();

        // Remove event listener on cleanup
        return () => window.removeEventListener('scroll', handleTransparentNavbar);
    }, [dispatch, fixedNavbar]);

    const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
    const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
    const handleCloseMenu = () => setOpenMenu(false);

    const handleLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    // Render the notifications menu
    const renderMenu = () => (
        <Menu
            anchorEl={openMenu}
            anchorReference={null}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(openMenu)}
            onClose={handleCloseMenu}
            sx={{ mt: 2 }}
        >
            <MenuItem>
                <Link to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem>
                <p onClick={handleLogout} to="/authentication/log-out">
                    Log out
                </p>
            </MenuItem>
        </Menu>
    );

    return (
        <AppBar
            position={absolute ? 'absolute' : navbarType}
            color="inherit"
            sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
        >
            <Toolbar sx={(theme) => navbarContainer(theme)}>
                <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
                    <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
                </SoftBox>
                {isMini ? null : (
                    <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
                        <SoftBox pr={1}>
                            {/* <SoftInput
                                placeholder="Search some book..."
                                icon={{ component: 'search', direction: 'left' }}
                            /> */}
                            <Search />
                        </SoftBox>
                        <SoftBox style={{ display: 'flex' }} color={light ? 'white' : 'inherit'}>
                            {user ? (
                                <h4
                                    style={{ fontSize: '14px', padding: '8px', cursor: 'pointer', userSelect: 'none' }}
                                    onClick={handleOpenMenu}
                                >
                                    {user.username}
                                </h4>
                            ) : (
                                <Link to="/sign-in">
                                    <IconButton sx={navbarIconButton} size="small">
                                        <Icon
                                            sx={({ palette: { dark, white } }) => ({
                                                color: light ? white.main : dark.main,
                                            })}
                                        >
                                            account_circle
                                        </Icon>
                                        <SoftTypography
                                            variant="button"
                                            fontWeight="medium"
                                            color={light ? 'white' : 'dark'}
                                        >
                                            Sign in
                                        </SoftTypography>
                                    </IconButton>
                                </Link>
                            )}

                            <IconButton size="small" color="inherit" sx={navbarMobileMenu} onClick={handleMiniSidenav}>
                                <Icon className={light ? 'text-white' : 'text-dark'}>
                                    {miniSidenav ? 'menu_open' : 'menu'}
                                </Icon>
                            </IconButton>

                            {renderMenu()}
                        </SoftBox>
                    </SoftBox>
                )}
            </Toolbar>
        </AppBar>
    );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
    absolute: PropTypes.bool,
    light: PropTypes.bool,
    isMini: PropTypes.bool,
};

export default DashboardNavbar;

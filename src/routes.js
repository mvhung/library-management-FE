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

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from 'layouts/dashboard';
import Home from 'layouts/home';
import Tables from 'layouts/tables';
import Billing from 'layouts/billing';
import Profile from 'layouts/profile';
import SignIn from 'layouts/authentication/sign-in';
import SignUp from 'layouts/authentication/sign-up';

// Soft UI Dashboard React icons
import Shop from 'examples/Icons/Shop';
import Office from 'examples/Icons/Office';
import CustomerSupport from 'examples/Icons/CustomerSupport';
import CreditCard from 'examples/Icons/CreditCard';
import Document from 'examples/Icons/Document';
import SpaceShip from 'examples/Icons/SpaceShip';
import BookForm from 'layouts/createForm/book/BookForm';
import Cube from 'examples/Icons/Cube';
import Book from 'layouts/createForm/book/Book';
import BookFormUpdate from 'layouts/createForm/book/BookFormUpdate';
import ProfileForm from 'layouts/profile/ProfileForm';
const routes = [
    // {
    //     type: 'collapse',
    //     name: 'Dashboard',
    //     key: 'dashboard',
    //     route: '/dashboard',
    //     icon: <Shop size="12px" />,
    //     component: <Dashboard />,
    //     noCollapse: true,
    // },
    {
        type: 'collapse',
        name: 'Home',
        key: 'home',
        route: '/home',
        icon: <Shop size="12px" />,
        component: <Home />,
        noCollapse: true,
    },
    // {
    //     type: 'collapse',
    //     name: 'Tables',
    //     key: 'tables',
    //     route: '/tables',
    //     icon: <Office size="12px" />,
    //     component: <Tables />,
    //     noCollapse: true,
    // },
    // {
    //     type: 'collapse',
    //     name: 'Billing',
    //     key: 'billing',
    //     route: '/billing',
    //     icon: <CreditCard size="12px" />,
    //     component: <Billing />,
    //     noCollapse: true,
    // },
    {
        type: null,
        name: 'Book',
        key: 'book-infor',
        route: 'book/:bookId',
        icon: <Cube size="12px" />,
        component: <Book />,
        noCollapse: true,
    },
    {
        type: 'Admin',
        name: 'Book form',
        key: 'book-form',
        route: 'create/book',
        icon: <Cube size="12px" />,
        component: <BookForm />,
        noCollapse: true,
    },
    {
        type: null,
        name: 'Book form update',
        key: 'book-form-update',
        route: 'update/book/:id',
        icon: <Cube size="12px" />,
        component: <BookFormUpdate />,
        noCollapse: true,
    },
    {
        type: null,
        name: 'profile update',
        key: 'profile-update',
        route: 'edit/profile/:id',
        icon: <Cube size="12px" />,
        component: <ProfileForm />,
        noCollapse: true,
    },

    // { type: 'title', title: 'Account Pages', key: 'account-pages' },
    {
        type: null,
        name: 'Profile',
        key: 'profile',
        route: '/profile',
        icon: <CustomerSupport size="12px" />,
        component: <Profile />,
        noCollapse: true,
    },
    {
        type: null,
        name: 'Sign In',
        key: 'sign-in',
        route: '/sign-in',
        icon: <Document size="12px" />,
        component: <SignIn />,
        noCollapse: true,
    },
    {
        type: null,
        name: 'Sign Up',
        key: 'sign-up',
        route: '/sign-up',
        icon: <SpaceShip size="12px" />,
        component: <SignUp />,
        noCollapse: true,
    },
];

export default routes;

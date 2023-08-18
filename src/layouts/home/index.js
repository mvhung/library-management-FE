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
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// @mui material components
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

// Soft UI Dashboard React components
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart';

// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography';

// Dashboard layout components
import BuildByDevelopers from 'layouts/dashboard/components/BuildByDevelopers';
import WorkWithTheRockets from 'layouts/dashboard/components/WorkWithTheRockets';
import Projects from 'layouts/dashboard/components/Projects';
import OrderOverview from 'layouts/dashboard/components/OrderOverview';
import ProfileInfoCard from 'examples/Cards/InfoCards/ProfileInfoCard';
import ProfilesList from 'examples/Lists/ProfilesList';
import DefaultProjectCard from 'examples/Cards/ProjectCards/DefaultProjectCard';
import PlaceholderCard from 'examples/Cards/PlaceholderCard';
// Data
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData';
import gradientLineChartData from 'layouts/dashboard/data/gradientLineChartData';

// Images
import homeDecor1 from 'assets/images/home-decor-1.jpg';
import homeDecor2 from 'assets/images/home-decor-2.jpg';
import homeDecor3 from 'assets/images/home-decor-3.jpg';
import team1 from 'assets/images/team-1.jpg';
import team2 from 'assets/images/team-2.jpg';
import team3 from 'assets/images/team-3.jpg';
import team4 from 'assets/images/team-4.jpg';
import Book from './components/book/Book';
import { BooksContainer } from './components/book';

import React, { useEffect, useState } from 'react';

import BookService from 'services/book.service';
import AuthService from 'services/auth.service';

function Home() {
    const { size } = typography;
    const { chart, items } = reportsBarChartData;
    const [booksByCategory, setBooksByCategory] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchBooksByCategory = async () => {
            try {
                const categories = await BookService.getCategories();
                const booksData = await Promise.all(
                    categories.map(async (category) => {
                        const booksInCategory = await BookService.getBooksByCategoryId(category.categoryId);
                        return { category, books: booksInCategory };
                    }),
                );
                setBooksByCategory(booksData);
            } catch (error) {
                console.error('Error fetching books by category:', error);
            }
        };

        const fetchUserInfo = async (user) => {
            try {
                user = await AuthService.getCurrentUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchBooksByCategory();
        fetchUserInfo();
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox p={2}>
                {' '}
                {booksByCategory.length > 0 ? (
                    booksByCategory.map((categoryData) => (
                        <BooksContainer
                            key={categoryData.category.categoryId}
                            category={categoryData.category.categoryName}
                        >
                            <SoftBox p={2}>
                                <Swiper slidesPerView={4} spaceBetween={30}>
                                    {' '}
                                    {categoryData.books.map((book) => (
                                        <SwiperSlide key={book.bookId} style={{ height: '300px' }}>
                                            <Book book={book} />{' '}
                                        </SwiperSlide>
                                    ))}{' '}
                                </Swiper>{' '}
                            </SoftBox>{' '}
                        </BooksContainer>
                    ))
                ) : (
                    <p> Không có dữ liệu sách. </p>
                )}{' '}
            </SoftBox>{' '}
        </DashboardLayout>
    );
}

export default Home;

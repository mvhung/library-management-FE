import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import UserService from 'services/user.service';
import { useNavigate, useParams } from 'react-router-dom';
import BookService from 'services/book.service';

function BookManager() {
    const [rows, setRows] = React.useState([]);
    // const {id} = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {
        BookService.getBooks().then((res) => {
            console.log(res);
            setRows((pre) => {
                pre = [];
                res.content.map((book) =>
                    pre.push({
                        id: book.bookId,
                        bookTitle: book.bookTitle,
                        bookPublishedYear: book.bookPublishedYear,
                        publisherName: book.publisher.publisherName,
                        authors: book.authors.map((author) => author.authorFullName),
                        bookQuantity: book.bookQuantity,
                    }),
                );
                return [...pre];
            });
        });
    }, []);
    const handleEditClick = (id) => () => {
        navigate('/update/book/' + id);
    };

    const handleDeleteClick = (id) => () => {
        // alert('Hello! I am an alert box!!');
        BookService.deleteBook(id).then((res) => {
            console.log(res);
        });
        setRows(rows.filter((row) => row.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'bookTitle',
            headerName: 'Title',
            width: 150,
            editable: true,
        },
        {
            field: 'bookPublishedYear',
            headerName: 'Published year',
            width: 100,
            editable: true,
        },
        {
            field: 'publisherName',
            headerName: 'Publisher name',
            width: 100,
            editable: true,
        },
        {
            field: 'authors',
            headerName: 'Publisher name',
            width: 100,
            editable: true,
        },
        {
            field: 'bookQuantity',
            headerName: 'Quantity',
            type: 'number',
            width: 200,
            editable: true,
        },

        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        key={0}
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        key={1}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    function EditToolbar() {
        return (
            <GridToolbarContainer>
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        navigate('/create/book');
                    }}
                    style={{ fontSize: '16px' }}
                >
                    Add
                </Button>
            </GridToolbarContainer>
        );
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box sx={{ height: 550, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </DashboardLayout>
    );
}

export default BookManager;

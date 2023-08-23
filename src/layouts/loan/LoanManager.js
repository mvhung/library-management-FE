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
import LoanService from 'services/loan.service';

function LoanManager() {
    const [rows, setRows] = React.useState([]);
    // const {id} = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {
        LoanService.getLoans().then((res) => {
            setRows((pre) => {
                pre = [];
                res.map((loan) =>
                    pre.push({
                        id: loan.loanId,
                        username: loan.userName,
                        bookTitle: loan.bookTitle,
                        bookQuantity: loan.bookQuantity,
                        bookImageLink: loan.bookImageLink,
                    }),
                );
                return [...pre];
            });
        });
    }, []);

    const handleEditClick = (id) => () => {
        navigate('/edit/profile/' + id);
    };

    const handleDeleteClick = (id) => () => {
        // alert('Hello! I am an alert box!!');
        LoanService.deleteLoan(id).then((res) => {
            console.log(res);
        });
        setRows(rows.filter((row) => row.id !== id));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'username',
            headerName: 'User name',
            width: 150,
            editable: true,
        },

        {
            field: 'bookTitle',
            headerName: 'Book title',
            width: 200,
            editable: true,
        },

        {
            field: 'bookQuantity',
            headerName: 'Book quantity',
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
                    // <GridActionsCellItem
                    //     key={0}
                    //     icon={<EditIcon />}
                    //     label="Edit"
                    //     className="textPrimary"
                    //     onClick={handleEditClick(id)}
                    //     color="inherit"
                    // />,
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
                        navigate('/create/user');
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
                    // slots={{
                    //     toolbar: EditToolbar,
                    // }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </DashboardLayout>
    );
}

export default LoanManager;

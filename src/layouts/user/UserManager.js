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

function UserManager() {
    const [rows, setRows] = React.useState([]);
    // const {id} = useParams()
    const navigate = useNavigate();

    React.useEffect(() => {
        UserService.getUsers().then((res) => {
            setRows((pre) => {
                pre = [];
                res.content.map((user) =>
                    pre.push({
                        id: user.userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        address: user.address,
                        email: user.email,
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
        UserService.deleteUser(id).then((res) => {
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
            field: 'firstName',
            headerName: 'First name',
            width: 100,
            editable: true,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 100,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 200,
            editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            // type: 'email',
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

export default UserManager;

import {Button, Col, Container, Form, Row} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import pagination from "../pagination";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changeProfileStatus, changeUserRole, fetchUsers} from "../../actions/userActions";
import {
    changingStatusFormatter,
    fullNameFormatter,
    indexFormatter,
    rolesFormatter,
    statusFormatter
} from "../formatters";
import {getAllRoles} from "../../actions/roleActions";

const UserList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const role = useSelector(state => state.role);

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(getAllRoles())
    }, [dispatch])


    const onChangeProfileStatus = (id) => {
        dispatch(changeProfileStatus(id))
    };

    const roleToUser = (userId, roleName) => {
        if (roleName !== '') {
            dispatch(changeUserRole(userId, roleName));
        }
    };

    const roleFormatter = (cell, row) => {
        return (
            <>
                <Form>
                    <Form.Control as="select" name="role">
                        <option value="" disabled>ROLE</option>
                        {
                            role.roles.map(r => (
                                <option key={r.id} value={r.name}>{r.name}</option>
                            ))
                        }
                    </Form.Control>
                </Form>
                <br/>
                <Button size="sm">Add</Button>&nbsp;
                <Button size="sm">Remove</Button>
            </>
        )
    }

    const {SearchBar} = Search;

    const defaultSorted = [{
        dataField: 'username',
        order: 'asc'
    }];

    const columns = [
        {dataField: 'id', text: 'Id', hidden: true},
        {dataField: 'number', text: 'No.', formatter: (cell, row, rowIndex) => indexFormatter(cell, row, rowIndex),
            headerStyle: {width: "45px"}},
        {dataField: 'name', text: 'Full name', sort: true, formatter: (cell, row) => fullNameFormatter(cell, row)},
        {dataField: 'email', text: 'Email', sort: true},
        {dataField: 'username', text: 'Username', sort: true},
        {dataField: 'status', text: 'Is account active', sort: false, formatter: (cell, row) => statusFormatter(cell, row)},
        {
            dataField: 'deactivate', text: 'Change status', formatter: (cell,row) => changingStatusFormatter(row),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    onChangeProfileStatus(row.id)
                }
            }
        },
        {dataField: 'roles', text: 'Roles', formatter: (cell) => rolesFormatter(cell)},
        {
            dataField: 'addRole', text: 'Manage roles', formatter: roleFormatter,
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    roleToUser(row.id, e.target.id);
                },
            }
        }
    ];

    return (
        <Container>
            <br/>
            <ToolkitProvider bootstrap4 keyField="id" data={user.users} columns={columns} search>
                {
                    props => (
                        <div>
                            <Row>
                                <Col xs={2}>
                                    <SearchBar className="search-label" {...props.searchProps} />
                                </Col>
                            </Row>
                            <hr/>
                            <BootstrapTable striped hover defaultSorted={defaultSorted} pagination={pagination}
                                            {...props.baseProps} />
                        </div>
                    )
                }
            </ToolkitProvider>
        </Container>
    )
};

export default UserList;
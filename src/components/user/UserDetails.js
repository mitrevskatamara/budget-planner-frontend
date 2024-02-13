import {Container, Row, Col, Table} from "react-bootstrap";

const UserDetails = () => {
    const currentUser = localStorage.getItem("user");
    const user = JSON.parse(currentUser);

    return (
        <Container>
            <br/>
            <h3>User Details</h3>
            <br/>
            <Row>
                <Col xs={3}>
                    <img width="250px" alt="User details"
                         src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png"/>
                </Col>
                <Col xs={6}>
                    <Table striped>
                        <thbody>
                            <tr>
                                <th>First name</th>
                                <th>{user.firstName}</th>
                            </tr>
                            <tr>
                                <th>Last name</th>
                                <th>{user.lastName}</th>

                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>{user.email}</th>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <th>{user.username}</th>
                            </tr>
                        </thbody>
                    </Table>
                </Col>

            </Row>
        </Container>
    )
};

export default UserDetails;
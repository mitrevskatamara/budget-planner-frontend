import { Navbar, Container, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <Navbar fixed="bottom">
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div>
                        2023, All Rights Reserved by Tamara Mitrevska
                    </div>
                </Col>
            </Container>
        </Navbar>
    )
};

export default Footer;
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetAdmin } from "../redux/adminRedux";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    padding: 10px 20px;
    background-color: #6d6a6a;
`;

const Wrapper = styled.div`
    height: 60px;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right:0;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.div`
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 1px;
    color: white;
`;

const Right = styled.div`
    flex: 1;
`;

const Menu = styled.div`
    display: flex;
    justify-content: ${ props => props.position };
`;

const MenuItem = styled.span`
    font-weight: 400;
    margin: 0 12px;
    cursor: pointer;
    color: white;

    &:hover a{
        color: #19beff;
    }

    &:hover {
        color: #19beff;
    }

    & a {
        text-decoration: none;
        color: white;
    }
`;

const NavBar = ( { admin } ) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch( resetAdmin() );
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Menu position={ "flex-start" }>
                        <MenuItem>
                            <Link to="/app">
                                USERS
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/app/products">
                                PRODUCTS
                            </Link>
                        </MenuItem>
                    </Menu>
                </Left>
                <Center>
                    <Logo>
                        E-commerce
                    </Logo>
                </Center>
                <Right>
                    <Menu position={ "flex-end" }>
                        { admin ? (
                            <>
                                <MenuItem>Hello { admin }</MenuItem>
                                <MenuItem onClick={ handleLogout }>LOGOUT</MenuItem>
                            </>
                        ) : <MenuItem>LOGIN</MenuItem> }
                    </Menu>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default NavBar;
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from 'react';
import { getCartByUserId } from "../redux/callAPI";
import { resetUser } from "../redux/userRedux";
import { resetCart } from "../redux/cartRedux";

const Container = styled.div`
    height: 50px;
    padding: 10px 20px;
    background-color: white;
    ${ mobile( {
    padding: "8px 10px"
} ) }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 10px 20px;
    ${ mobile( {
    padding: "8px 10px"
} ) }
    position: fixed;
    background-color: ${ props => props.status ? "rgba(0, 0, 0, 0.3)" : "white" };
    transition: all 1s linear;
    z-index: 88;
    top: 0;
    left: 0;
    right: 0;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    ${ mobile( {
    minWidth: "25%"
} ) }
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.div`
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 1px;
    ${ mobile( {
    fontSize: "18px",
    fontWeight: 600,
    letterSpacing: 0,
} ) }
    color: ${ props => props.status ? "white" : "black" };
`;

const Right = styled.div`
    flex: 1;
    ${ mobile( {
    flex: 2
} ) }
`;

const Menu = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const MenuItem = styled.span`
    font-weight: 400;
    margin: 0 12px;
    cursor: pointer;
     ${ mobile( {
    margin: " 0 4px"
} ) }

    & a {
        text-decoration: none;
        color: ${ props => props.status ? "white" : "black" };
    }

    &:hover a {
        color: #59bdff;
    }
`;

const NavBar = () => {
    const { user } = useSelector( state => state.user );
    const cart = useSelector( state => state.cart );
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {
        user && getCartByUserId( dispatch, user );
    }, [ dispatch, user ] )

    const [ status, setStatus ] = useState( "" );
    const handleScroll = useCallback( () => {
        const position = window.pageYOffset;
        if ( position === 0 ) {
            setStatus( "" );
        } else {
            if ( !status ) setStatus( "change" );
        }
    }, [ status ] );

    useEffect( () => {
        window.addEventListener( 'scroll', handleScroll, { passive: true } );
        return () => {
            window.removeEventListener( 'scroll', handleScroll );
        };
    }, [ handleScroll ] );

    const hanlderReset = () => {
        if ( user ) {
            dispatch( resetUser() );
            dispatch( resetCart() );
            history.push( "/" );
        }
    }

    return (
        <Container>
            <Wrapper status={ status }>
                <Left>
                    <MenuItem status={ status }>
                        <Link to="/">
                            HOME
                        </Link>
                    </MenuItem>
                    <MenuItem status={ status }>
                        <Link to="/products">
                            PRODUCTS
                        </Link>
                    </MenuItem>
                </Left>
                <Center>
                    <Logo status={ status }>
                        E-commerce
                    </Logo>
                </Center>
                <Right>
                    <Menu>
                        <MenuItem status={ status }>
                            { user ? <Link to="/">Hello { user.lastname }</Link> :
                                ( <Link to="/user/login">
                                    LOGIN
                                </Link> )
                            }
                        </MenuItem>
                        <MenuItem status={ status }>
                            { user ? <Link to="/" onClick={ hanlderReset }>LOGOUT</Link> :
                                <Link to="/user/register">REGISTER</Link>
                            }
                        </MenuItem>
                        <MenuItem status={ status }>
                            <Badge badgeContent={ cart?.products.length } color="primary" >
                                <Link to="/cart">
                                    <ShoppingCartOutlined style={ { fontSize: "20px" } } />
                                </Link>
                            </Badge>
                        </MenuItem>
                    </Menu>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default NavBar

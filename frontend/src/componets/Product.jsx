import {
    SearchOutlined,
    ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";


const ActionContainer = styled.div`
    position: absolute;
    z-index: 3;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    transition: all .2s ease-in-out;
    opacity: 0;
`;

const Container = styled.div`
    min-width: 280px;
    height: 350px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content:center;
    flex: 1;
    background-color: #f5fbfd;
    margin: 5px;

    &:hover ${ ActionContainer }{
        opacity: 1;
    }

    ${ mobile( {
    margin: "5px 0px",
    height: "220px",
} ) }
`;
const Circle = styled.div`
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
`;
const ImgContainer = styled.div`
    height: 75%;
    width: 80%;
    z-index: 2;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ActionItem = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 4px;
    background-color:white;
    transition: all 0.5s linear;

    & a {
        color: black;
        display: flex;
    }

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        background-color: #e9f5f5;
    }
`;

const Product = ( { product } ) => {
    const history = useHistory();
    const path = history.location.pathname;
    return (
        <Container>
            <Circle />
            <ImgContainer>
                <Image src={ product.img } />
            </ImgContainer>
            <ActionContainer>
                <ActionItem>
                    <Link to={ `/product/${ product._id }` }>
                        <ShoppingCartOutlined />
                    </Link>
                </ActionItem>
                { path === "/" && (
                    <>
                        <ActionItem>
                            <Link to="/products">
                                <SearchOutlined />
                            </Link>
                        </ActionItem>
                    </>
                ) }
            </ActionContainer>
        </Container>
    )
}

export default Product

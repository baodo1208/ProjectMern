
import Announcement from '../componets/Announcement';
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from 'react-redux';
import { hanlderQuantity } from '../redux/cartRedux';
import { useHistory } from 'react-router-dom';
import { hanldeCart } from '../redux/callAPI';
import { useEffect } from 'react';

const Container = styled.div`
    padding: 20px;
`;
const Title = styled.h1`
    text-transform: uppercase;
    font-weight: 500;
    text-align: center;
    width: 100%;
`;
const Top = styled.div`
    margin: 10px 0 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    ${ mobile( {
    padding: 0,
} ) }
`;
const TopLeft = styled.div`
    flex: 1;
`;

const TopRight = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`;


const InfoContainer = styled.div`
    display: flex;
    ${ mobile( {
    flexDirection: 'column',
} ) }
`;
const Products = styled.div`
    flex: 9;
`;
const Product = styled.div`
    display: flex;
`;
const ImgContainer = styled.div`
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Image = styled.img`
    width: 80%;
`;

const InforProduct = styled.div`
    flex: 9;
    display: flex;
    justify-content: space-between;
`;
const ProductDetails = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: ${ props => props.type };
    align-items: ${ props => props.type };
`;
const ProductDetail = styled.div`
    margin-bottom: 22px ;
    ${ mobile( {
    marginBottom: "10px"
} ) }
`;

const Action = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Price = styled.div`
    margin-top: 30px;
    font-size: 30px;
    font-weight: 200;
    letter-spacing: 1px;
`;

const CheckOut = styled.div`
    flex: 3;

    & > div {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 20px 10px;
    }
`;
const Heading = styled.h3`
    font-size: 30px;
    font-weight: 300;
    text-transform: uppercase;
`;
const List = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;
const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
`;
const Quantity = styled.span`
    padding: 0 4px;
    font-size: 23px;
    font-weight: 500;
`
const NameService = styled.div``;
const PriceService = styled.div``;
const CheckoutBtn = styled.button`
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    padding: 10px 12px;
    width: 100%;
    background-color: black;
    color:  white;
    text-align: center;
    border:none;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 12px;
    background-color: ${ ( props ) => props.type === "dark" && "black" };
    background-color: ${ ( props ) => props.type === "light" && "white" };
    color: ${ ( props ) => props.type === "dark" && "white" };
    color: ${ ( props ) => props.type === "light" && "black" };
    text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
`;

const Hr = styled.div`
    width: 100%;
    border-top: 1px solid #ccc;
    margin: 10px 0;
`;

const BtnRemove = styled.button`
    padding: 8px 10px;
    border: none;
    border-radius: 2px;
    background-color: #0ac0ee;
    color: #ffa0a0;
    text-transform: uppercase;
    font-weight: 600;
    transition: all .5s linear;

    &:hover {
        cursor: pointer;
        background-color: #57d8f8;
    }
`;

const Cart = () => {
    const { userId, total, products } = useSelector( state => state.cart );
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect( () => {
        !userId && history.push( "/user/login" );
    }, [ userId, history ] )

    const hanlderClick = ( index, type ) => {
        dispatch( hanlderQuantity( { index, type } ) )
    }

    const hanldeRemove = ( id ) => {
        const cartUpdate = products.filter( product => product.productId !== id );
        hanldeCart( dispatch, { userId, products: cartUpdate } );
    }

    return (
        <>
            <Announcement />
            <Container>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopLeft>
                        <Button type="light" onClick={ () => history.push( "/products" ) }>Continue Shopping</Button>
                    </TopLeft>
                    <TopRight>
                        <Button type="dark">Checkout Now</Button>
                    </TopRight>
                </Top>
                <InfoContainer>
                    <Products>
                        { products && products.map( ( item, index ) => (
                            <div key={ index }>
                                <Product>
                                    <ImgContainer>
                                        { <Image src={ item.img } /> }
                                    </ImgContainer>
                                    <InforProduct>
                                        <ProductDetails>
                                            <ProductDetail>
                                                <b>Product:</b> { item.desc }
                                            </ProductDetail>
                                            <ProductDetail>
                                                <b>ID: </b> { item._id }
                                            </ProductDetail>
                                            <ProductDetail>
                                                <b>Size: </b> { item.size }
                                            </ProductDetail>
                                            <ProductDetail>
                                                { item.desc }
                                            </ProductDetail>
                                            <ProductDetail>
                                                <BtnRemove onClick={ () => { hanldeRemove( item.productId ) } }>Remove</BtnRemove>
                                            </ProductDetail>
                                        </ProductDetails>
                                        <ProductDetails type="center">
                                            <Action>
                                                <Add onClick={ () => { hanlderClick( index, "inc" ) } } />
                                                <Quantity>{ item.quantity }</Quantity>
                                                <Remove onClick={ () => { hanlderClick( index, "dec" ) } } />
                                            </Action>
                                            <Price>${ item.price }</Price>
                                        </ProductDetails>
                                    </InforProduct>
                                </Product>
                                <Hr />
                            </div>
                        ) ) }
                    </Products>
                    <CheckOut>
                        <div>
                            <Heading>ORDER SUMMARY</Heading>
                            <List>
                                <Item>
                                    <NameService>Subtotal</NameService>
                                    <PriceService>$ { total }</PriceService>
                                </Item>
                                <Item>
                                    <NameService>Shipping Discount</NameService>
                                    <PriceService>$ -5.90</PriceService>
                                </Item>
                                <Item>
                                    <NameService>Estimated Shipping</NameService>
                                    <PriceService>$ 5.90</PriceService>
                                </Item>
                                <b>
                                    <Item>
                                        <NameService>Total</NameService>
                                        <PriceService>$ { total }</PriceService>
                                    </Item>
                                </b>
                            </List>
                            <CheckoutBtn>CHECKOUT NOW</CheckoutBtn>
                        </div>
                    </CheckOut>
                </InfoContainer>
            </Container>
        </>
    )
}

export default Cart

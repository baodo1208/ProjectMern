import Announcement from "../componets/Announcement";
import NewsLetter from "../componets/NewsLetter";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, createCart } from './../redux/callAPI';

const Container = styled.div`
    padding: 50px;
    display: flex;
    ${ mobile( {
    flexDirection: "column",
    padding: "10px"
} ) }
`;
const Left = styled.div`
    flex: 1;
    height: 90vh;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    ${ mobile( {
    height: "50vh"
} ) }
`;
const Right = styled.div`
    flex: 1;
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    ${ mobile( {
    padding: "10px"
} ) }
`;
const Title = styled.h1`
    font-weight: 400;
`;
const Drc = styled.div`
    margin: 20px 0px;
`;
const Price = styled.div`
    font-size: 40px;
    font-weight: 100;
`;
const FilterContainer = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    ${ mobile( {
    width: "100%"
} ) }
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
`;
const FilterName = styled.div`
    font-size: 20px;
    font-weight: 200;
`;

const FilterSize = styled.select`
    padding: 4px 8px;
    margin-left: 12px;
    border-radius: 2px;
`;
const FilterOption = styled.option``;

const Actions = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${ mobile( {
    width: "100%"
} ) }
`;
const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
`;
const Action = styled.div`
    cursor: pointer;
`;
const Quantity = styled.div`
    width: 30px;
    height: 30px;
    border: 1px solid teal;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 400;
    margin: 0 12px;
`;
const Button = styled.button`
    text-transform: uppercase;
    padding: 10px 12px;
    background-color: transparent;
    transition: all .3s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #0af5f5;
    }
`;

const Error = styled.div`
    text-align: center;
    margin-top: 12px;
    color: ${ props => ( props.type === "err" && "red" ) };
    color: ${ props => ( props.type === "success" && "green" ) };
    font-size: 14px;
`;


const Product = () => {
    const location = useLocation();
    const [ product, setProduct ] = useState( {
        img: "",
        price: 0,
        desc: "",
        title: ""
    } );
    const [ quantity, setQuantity ] = useState( 1 );
    const [ size, setSize ] = useState( "" );
    const [ mess, setMess ] = useState( {
        type: "",
        text: ""
    } );
    const { user } = useSelector( state => state.user );
    const { products } = useSelector( state => state.product );
    const cart = useSelector( state => state.cart );
    const dispatch = useDispatch();
    const history = useHistory();

    const id = location.pathname.split( "/" )[ 2 ];

    useEffect( () => {
        window.scrollTo( {
            top: 0,
            left: 0,
            behavior: 'smooth'
        } )
        id && setProduct( products.find( product => product._id === id ) )
        !products.length && history.push( "/products" );
    }, [ id, products, history ] )


    const hanlderATC = async () => {
        if ( !user ) {
            history.push( "/user/login", { from: `product/${ id }` } );
        } else {
            const { _id, categories, ...others } = product;
            const products = cart.products;
            const userId = user._id;
            if ( !size ) {
                setMess( { type: "err", text: "You must choose size !!" } );
            } else {
                try {
                    if ( products.length ) {
                        if ( !products.every( product => product.productId !== _id ) ) {
                            setMess( { type: "err", text: "Product already in cart!!" } );
                        } else {
                            const updateCart = {
                                userId,
                                products: [
                                    ...products,
                                    {
                                        ...others,
                                        productId: _id,
                                        size, quantity
                                    }
                                ]
                            }
                            addCart( dispatch, updateCart );
                            setMess( { type: "success", text: "Add to cart success, pls check your cart" } );
                        }
                    } else {
                        const newCart = {
                            userId,
                            products: [ {
                                ...others,
                                productId: _id,
                                size, quantity
                            } ]
                        }
                        createCart( dispatch, newCart );
                        setMess( { type: "success", text: "Add to cart success, pls check your cart" } );
                    }
                } catch ( e ) {
                    console.log( e );
                }
            }
        }
    }


    return (
        <>
            <Announcement />
            <Container>
                <Left>
                    <Image src={ product.img } />
                </Left>
                <Right>
                    <Title>{ product.title }</Title>
                    <Drc>{ product.desc }</Drc>
                    <Price>$ { product.price }</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterName>Size</FilterName>
                            <FilterSize name="size" onChange={ ( e ) => setSize( e.target.value ) }>
                                { product.size?.map( ( s, index ) => (
                                    <FilterOption key={ index }>{ s }</FilterOption>
                                ) ) }
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <Actions>
                        <QuantityContainer>
                            <Action onClick={ () => { quantity > 1 && setQuantity( quantity - 1 ) } }><Remove /></Action>
                            <Quantity>{ quantity }</Quantity>
                            <Action onClick={ () => setQuantity( quantity + 1 ) }><Add /></Action>
                        </QuantityContainer>
                        <Button onClick={ hanlderATC }>Add to cart</Button>
                    </Actions>
                    { mess.type && <Error type={ mess.type }>{ mess.text }</Error> }
                </Right>
            </Container>
            <NewsLetter />
        </>
    )
}

export default Product

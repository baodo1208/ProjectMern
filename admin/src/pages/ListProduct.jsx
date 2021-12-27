import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/callAPI";
import Product from "../componets/Product";
import { Link } from "react-router-dom";

const Container = styled.div`
    padding: 20px 10px;
`;

const Button = styled.button`
    padding: 10px 16px;
    border: none;
    background-color: #6dd1ff;
    color: white;
    cursor: pointer;
    border-radius: 3px;
`;

const ProductList = () => {
    const { products } = useSelector( state => state.products );
    const dispatch = useDispatch();
    const [ called, setCalled ] = useState( false );


    useEffect( () => {
        if ( !products.length && !called ) {
            getProducts( dispatch );
            setCalled( true );
        }
    }, [ dispatch, products, called ] )

    return (
        <>
            <Container>
                <Link to="/app/product">
                    <Button>Create Product</Button>
                </Link>
                { products.length ? ( products.map( ( product, index ) => (
                    <Product key={ index } product={ product }></Product>
                ) ) ) : "" }
            </Container>
        </>
    )
}

export default ProductList

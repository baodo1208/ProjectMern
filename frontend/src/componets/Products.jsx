
import styled from "styled-components";
import Product from "./Product";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../redux/callAPI";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 20px 15px;
    ${ mobile( {
    padding: "10px 0px"
} ) }
`;


const Products = ( { cat, filters, sort, limit } ) => {
    const { products } = useSelector( state => state.product );
    const [ filteredProducts, setFilteredProducts ] = useState( [] );
    const dispatch = useDispatch();


    useEffect( () => {
        cat ? getProducts( dispatch, cat ) : getProducts( dispatch );
    }, [ cat, dispatch ] )

    useEffect( () => {
        const filterFunc = () => {
            setFilteredProducts( products.filter( product =>
                Object.entries( filters ).every( ( [ key, value ] ) =>
                    product[ key ].includes( value )
                )
            ) )
        }
        filters && filterFunc();
    }, [ filters, products ] )

    useEffect( () => {
        if ( sort === "newest" ) {
            setFilteredProducts( ( prev ) => [ ...prev.sort( ( a, b ) => a.createdAt - b.createdAt ) ] );
        } else if ( sort === "asc" ) {
            setFilteredProducts( ( prev ) => [ ...prev.sort( ( a, b ) => a.price - b.price ) ] );
        } else if ( sort === "desc" ) {
            setFilteredProducts( ( prev ) => [ ...prev.sort( ( a, b ) => b.price - a.price ) ] );
        }
    }, [ sort ] )


    return (
        <Container>
            {
                !( filteredProducts.length ) ? products.slice( 0, limit ).map( ( pr, index ) => ( <Product key={ index } product={ pr } /> ) )
                    : filteredProducts.map( ( pr, index ) => ( <Product key={ index } product={ pr } /> ) )
            }
        </Container>
    )
}

export default Products

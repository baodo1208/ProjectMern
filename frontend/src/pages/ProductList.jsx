import Products from '../componets/Products';
import styled from "styled-components";
import NewsLetter from '../componets/NewsLetter';
import Announcement from '../componets/Announcement';
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from 'react';

const Container = styled.div`
    padding: 20px;
`;
const Title = styled.h1`
    margin-bottom: 40px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${ mobile( {
    alignItems: "flex-start"
} ) }
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
    ${ mobile( {
    flexDirection: "column"
} ) }
`;
const FilterName = styled.h3`
    font-weight: 600;
`;
const FilterSelect = styled.select`
    padding: 8px;
    margin-left: 20px;
    border:1px solid #ccc;
    outline: none;
    border-radius: 2px;
    ${ mobile( {
    marginTop: "12px",
    marginLeft: 0,
    width: "100%"
} ) }
`;
const FilterOption = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const [ filters, setFilters ] = useState( {} );
    const [ sort, setSort ] = useState( "newest" );
    const cat = location.pathname.split( "/" )[ 2 ];

    const hanlderFiters = ( e ) => {
        setFilters( prev => ( {
            ...prev,
            [ e.target.name ]: e.target.value
        } ) )
    }


    return (
        <>
            <Announcement />
            <Container>
                <Title>Clothes</Title>
                <FilterContainer>
                    <Filter>
                        <FilterName>Filter Products:</FilterName>
                        <FilterSelect name="size" defaultValue={ "none" } onChange={ hanlderFiters }>
                            <FilterOption disabled value="none">Size</FilterOption>
                            <FilterOption value="S">S</FilterOption>
                            <FilterOption value="M">M</FilterOption>
                            <FilterOption value="L">L</FilterOption>
                        </FilterSelect>
                    </Filter>
                    <Filter>
                        <FilterName>Sort Products:</FilterName>
                        <FilterSelect onChange={ ( e ) => setSort( e.target.value ) }>
                            <FilterOption value="newest">Newest</FilterOption>
                            <FilterOption value="asc">Price(asc)</FilterOption>
                            <FilterOption value="desc">Price(desc)</FilterOption>
                        </FilterSelect>
                    </Filter>
                </FilterContainer>
            </Container>
            <Products cat={ cat } filters={ filters } sort={ sort } />
            <NewsLetter />
        </>
    )
}

export default ProductList

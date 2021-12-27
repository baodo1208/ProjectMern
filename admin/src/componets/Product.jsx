import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteProduct } from "../redux/callAPI";

const Container = styled.div`
    padding: 10px;
    display: flex;
`;
const Left = styled.div`
    flex: 1;
    height: 80vh;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
`;
const Right = styled.div`
    flex: 1;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
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
`;

const Button = styled.button`
    text-transform: uppercase;
    padding: 10px 12px;
    background-color: transparent;
    transition: all .3s ease-in-out;

    & a {
        text-decoration: none;
        color: black;
    }

    &:hover {
        cursor: pointer;
        background-color: #0af5f5;
    }
`;


const Product = ( { product } ) => {
    const dispatch = useDispatch();

    const handleDelete = ( id ) => {
        deleteProduct( dispatch, id );
    }

    return (
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
                        <FilterName>Category</FilterName>
                        <FilterSize name="cat">
                            { product.categories?.map( ( c, index ) => (
                                <FilterOption key={ index }>{ c }</FilterOption>
                            ) ) }
                        </FilterSize>
                    </Filter>
                    <Filter>
                        <FilterName>Size</FilterName>
                        <FilterSize name="size">
                            { product.size?.map( ( s, index ) => (
                                <FilterOption key={ index }>{ s }</FilterOption>
                            ) ) }
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <Actions>
                    <Button onClick={ () => handleDelete( product._id ) }>Delete</Button>
                    <Button >
                        <Link to={ `/app/product/${ product._id }` }>
                            Update
                        </Link>
                    </Button>
                </Actions>
            </Right>
        </Container>
    )
};

export default Product
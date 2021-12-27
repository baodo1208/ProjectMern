import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const CategoryItem = styled.div`
    flex: 1;
    height: 75vh;
    margin: 3px;
    position: relative;
    ${ mobile( {
    margin: "3px 0px"
} ) }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    ${ mobile( {
    height: "30vh"
} ) }
`;

const InfoContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    color: white;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-size: 16px;
    transition: all .5s ease-in-out;

    &:hover {
        transform: scale(0.9);
    }
`;

const Category = ( { category } ) => {
    return (
        <CategoryItem>
            <Image src={ category.img } />
            <InfoContainer>
                <Title>{ category.title }</Title>
                <Link to={ `/products/${ category.cat }` }>
                    <Button><span>Shop Now</span></Button>
                </Link>
            </InfoContainer>
        </CategoryItem>
    )
}

export default Category

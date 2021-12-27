import styled from "styled-components";
import Category from "./Category";
import { mobile } from "../responsive";
import { categories } from "../data";

const Container = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    ${ mobile( {
    padding: "20px 0px",
    flexDirection: "column",
} ) }
`;

const Categories = () => {
    return (
        <Container>
            { categories.map( category => (
                <Category key={ category.id } category={ category } />
            ) ) }
        </Container>
    )
}

export default Categories
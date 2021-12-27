import styled from "styled-components";

const Container = styled.div`
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
`;
const Text = styled.span`
    letter-spacing: 1px;
    color: white;
    font-size: 16px;
    font-weight: 400;
`;

const Annoucement = () => {
    return (
        <Container>
            <Text>Super Deal! Free Shipping on Orders Over $50</Text>
        </Container>
    )
}

export default Annoucement

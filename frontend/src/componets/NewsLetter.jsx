import styled from "styled-components"
import { Send } from "@material-ui/icons";
import { mobile } from "../responsive"

const Container = styled.div`
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fcf5f5;
`;

const Title = styled.h3`
    font-size: 70px;
    margin-bottom: 20px;
`;

const Drc = styled.span`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    text-align: center;
`;

const InputContainer = styled.div`
    display: flex;
    width: 50%;
    border-radius: 3px;
    ${ mobile( {
    width: "60%"
} ) }
`;

const Input = styled.input`
    flex: 8;
    outline: none;
    border: none;
    padding: 12px 0px 12px 16px;
    min-width: 80%;
    border: 1px solid lightgray;
`;

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    padding: 6px 8px;
`;

const NewsLetter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Drc>Get timely updates from your favorite products.</Drc>
            <InputContainer>
                <Input placeholder="Your email..." />
                <Button>
                    <Send style={ { color: "white" } } />
                </Button>
            </InputContainer>
        </Container>
    )
}

export default NewsLetter

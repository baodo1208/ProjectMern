import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { login } from "../redux/callAPI";

const Container = styled.div`
    display: flex;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center no-repeat;
    background-size: cover;
`;
const Form = styled.form`
    padding: 20px;
    background-color: white;
    width: 26%;
    min-height: 50%;
`;
const Title = styled.h1`
    font-weight: 300;
    text-transform: uppercase;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    outline: none;
    margin: 10px 0px;
`;

const Error = styled.span`
    display: block;
    color: red;
    font-size: 12px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

const Button = styled.button`
    width: 40%;
    padding: 16px 10px;
    color: white;
    background-color: ${ props => props.color };
    border: none;
    cursor: pointer;
`;

const Login = () => {
    const [ adminInfo, setAdminInfo ] = useState( {
        username: "",
        password: ""
    } );
    const [ messErr, setMessErr ] = useState( {} );
    const { error, isFetching } = useSelector( state => state.admin );
    const dispatch = useDispatch();
    const history = useHistory();

    const hanlderInput = ( e ) => {
        setAdminInfo( prev => ( {
            ...prev,
            [ e.target.name ]: e.target.value
        } ) )
        setMessErr( prev => ( {
            ...prev,
            [ e.target.name ]: ""
        } ) )
    }

    const hanlderSubmit = ( e ) => {
        let isValid = true;
        e.preventDefault();
        Object.entries( adminInfo ).forEach( ( [ key, value ] ) => {
            if ( !value ) {
                setMessErr( prev => ( {
                    ...prev,
                    [ key ]: "Must be fullfil"
                } ) )
                isValid = false;
            }
        } )
        isValid && login( dispatch, adminInfo, history );
    }


    return (
        <Container>
            <Form>
                <Title>SIGN IN</Title>
                <Wrapper>
                    <Input name="username" onChange={ hanlderInput } placeholder="Username..." />
                    { messErr.username && ( <Error>{ messErr.username }</Error> ) }
                    <Input name="password" onChange={ hanlderInput } placeholder="Password..." />
                    { ( messErr.password || error ) && ( <Error>{ messErr.password || "Login failure" }</Error> ) }
                </Wrapper>
                <Buttons>
                    <Button type="button" color="#ffa9a9" onClick={ () => history.goBack() } >BACK</Button>
                    <Button type="button" color="teal" onClick={ hanlderSubmit } disabled={ isFetching }>LOGIN</Button>
                </Buttons>
            </Form>
        </Container >
    )
}

export default Login

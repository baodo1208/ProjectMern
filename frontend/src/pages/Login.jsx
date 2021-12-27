import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from './../redux/callAPI';
import GoogleIcon from '@mui/icons-material/Google';

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
    min-height: 60%;
    ${ mobile( {
    width: "50%",
    minHeight: "32%"
} ) }
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
const Actions = styled.div``;
const Action = styled.div`
    font-size: 12px;
    text-decoration: none;
    margin: 10px 0;
    cursor: pointer;

    & a {
        color: black;
        text-decoration: none;
    }
`;

const GoogleAction = styled.div`
    display: flex;
    justify-content: center;
    background-color: #53e1fa;
    padding: 4px 0;
    align-items: center;
    color: white;
`;

const Login = () => {
    const [ userInfo, setUserInfo ] = useState( {
        username: "",
        password: ""
    } );
    const [ messErr, setMessErr ] = useState( {} );
    const { error } = useSelector( state => state.user );
    const dispatch = useDispatch();
    const history = useHistory();


    const hanlderInput = ( e ) => {
        setUserInfo( prev => ( {
            ...prev,
            [ e.target.name ]: e.target.value
        } ) )
        setMessErr( prev => ( {
            ...prev,
            [ e.target.name ]: ""
        } ) )
    }

    const handleLoginByGoogle = () => {
        window.open( "https://backend-project-intern.herokuapp.com/auth/google", "_self" );
        // window.open( "http://localhost:8000/auth/google", "_self" )
    }

    const hanlderSubmit = ( e ) => {
        let isValid = true;
        e.preventDefault();
        Object.entries( userInfo ).forEach( ( [ key, value ] ) => {
            if ( !value ) {
                setMessErr( prev => ( {
                    ...prev,
                    [ key ]: "Must be fullfil"
                } ) )
                isValid = false;
            }
        } )
        if ( isValid ) {
            login( dispatch, userInfo, history );
        }
    }

    return (
        <Container>
            <Form>
                <Title>SIGN IN</Title>
                <Wrapper>
                    <Input name="username" onChange={ hanlderInput } placeholder="Username..." />
                    { messErr.username && ( <Error>{ messErr.username }</Error> ) }
                    <Input name="password" onChange={ hanlderInput } placeholder="Password..." />
                    { messErr.password && ( <Error>{ messErr.password }</Error> ) }
                    { error && ( <Error>Login failure</Error> ) }
                </Wrapper>
                <Buttons>
                    <Button type="button" color="#ffa9a9" onClick={ () => history.goBack() } >BACK</Button>
                    <Button type="button" color="teal" onClick={ hanlderSubmit }>LOGIN</Button>
                </Buttons>
                <Actions>
                    <Action type="button" onClick={ handleLoginByGoogle }>
                        <GoogleAction>
                            <GoogleIcon style={ { color: "white", marginRight: 4, fontSize: 18 } } />
                            Login by Google
                        </GoogleAction>
                    </Action>
                    <Action>DO NOT YOU REMEMBER THE PASSWORD?</Action>
                    <Action>
                        <Link to="/user/register">
                            CREATE A NEW ACCOUNT
                        </Link>
                    </Action>
                </Actions>
            </Form>
        </Container >
    )
}

export default Login

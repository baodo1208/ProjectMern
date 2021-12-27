import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from 'react-redux';
import { registerUser } from "../redux/callAPI";

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
    ${ mobile( {
    backgroundPosition: "right top"
} ) }
`;
const Form = styled.form`
    padding: 20px;
    background-color: white;
    width: 40%;
    min-height: 60%;
    ${ mobile( {
    width: "60%"
} ) }
`;
const Title = styled.h1`
    font-weight: 300;
    text-transform: uppercase;
`;
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    ${ mobile( {
    marginTop: "10px"
} ) }
`;

const InputWrap = styled.div`
    min-width: 40%;
    min-height: 70px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    outline: none;
    margin: 10px 10px 0px 0px;
    ${ mobile( {
    padding: "8px"
} ) }
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

const Error = styled.span`
    color: red;
    font-size: 12px;
`;

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ userInfo, setUserInfo ] = useState( {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    } );
    const [ err, setErr ] = useState( {} );

    const hanlderInput = ( e ) => {
        setUserInfo( prev => ( {
            ...prev,
            [ e.target.name ]: e.target.value
        } ) )
        setErr( prev => ( { ...prev, [ e.target.name ]: "" } ) )
    }

    const hanlderBlur = () => {
        if ( userInfo.password && confirmPassword !== userInfo.password ) {
            setErr( prev => ( {
                ...prev,
                cfpass: "confirmpassword must equal password"
            } ) );
        } else {
            setErr( {} )
        }
    }

    const hanlderCfPass = ( e ) => {
        setErr( prev => ( {
            ...prev,
            cfpass: ""
        } ) );
        setConfirmPassword( e.target.value )
    }

    const hanlderSubmit = () => {
        let isAllow = true;
        Object.entries( userInfo ).forEach( ( [ key, value ] ) => {
            if ( value === "" ) {
                setErr( prev => ( {
                    ...prev,
                    [ key ]: "required"
                } ) )
                isAllow = false
            }
        } )

        if ( isAllow ) {
            if ( confirmPassword !== userInfo.password ) {
                setErr( prev => ( { ...prev, cfpass: "confirmpassword must equal password" } ) )
            } else {
                registerUser( dispatch, userInfo, history );
            }
        }

    }

    return (
        <Container>
            <Form>
                <Title>CREATE AN ACCOUNT</Title>
                <Wrapper>
                    <InputWrap>
                        <Input name="firstname" onInput={ hanlderInput } placeholder="FirstName..." />
                        { err.firstname && <Error>{ err.firstname }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input name="lastname" onInput={ hanlderInput } placeholder="LastName..." />
                        { err.lastname && <Error>{ err.lastname }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input name="username" onInput={ hanlderInput } placeholder="Username..." />
                        { err.username && <Error>{ err.username }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input name="email" onInput={ hanlderInput } placeholder="Email..." />
                        { err.email && <Error>{ err.email }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input name="password" type="password" onInput={ hanlderInput } placeholder="Password..." />
                        { err.password && <Error>{ err.password }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input type="password" onInput={ hanlderCfPass } onBlur={ hanlderBlur } placeholder="ConfirmPassword..." />
                        { err.cfpass && <Error>{ err.cfpass }</Error> }
                    </InputWrap>
                </Wrapper>
                <Buttons>
                    <Button type="button" color="#ffa9a9" onClick={ () => history.goBack() }>BACK</Button>
                    <Button type="button" color="teal" onClick={ hanlderSubmit } >REGISTER</Button>
                </Buttons>
                <Actions>
                    <Action>DO NOT YOU REMEMBER THE PASSWORD?</Action>
                    <Action>
                        <Link to="/user/login">
                            YOU ALREADY HAVE AN ACCOUNT
                        </Link>
                    </Action>
                </Actions>
            </Form>
        </Container>
    )
}

export default Register

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../redux/callAPI";

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
    width: 40%;
    min-height: 60%;
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
`;

const InputRadio = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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

const Error = styled.span`
    color: red;
    font-size: 12px;
`;

const NewUser = () => {
    const location = useLocation();
    const history = useHistory();
    const { listUser } = useSelector( state => state.users );
    const idUser = location.pathname.split( "/" )[ 3 ];
    const [ update, setUpdate ] = useState( false );
    const [ user, setUser ] = useState( {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        isAdmin: false
    } );

    useEffect( () => {
        if ( idUser ) {
            setUser( listUser.find( user => user._id === idUser ) );
            setUpdate( true );
        }
    }, [ idUser, listUser ] )
    const dispatch = useDispatch();
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ err, setErr ] = useState( {} );

    const hanlderInput = ( e ) => {
        if ( e.target.name === "isAdmin" ) {
            setUser( prev => ( {
                ...prev,
                [ e.target.name ]: ( e.target.value === "true" ? true : false )
            } ) )
        } else {
            setUser( prev => ( {
                ...prev,
                [ e.target.name ]: e.target.value
            } ) )
        }
        setErr( prev => ( { ...prev, [ e.target.name ]: "" } ) )
    }

    const hanlderBlur = () => {
        if ( user.password && ( confirmPassword !== user.password ) ) {
            setErr( prev => ( {
                ...prev,
                cfpass: "confirmpassword must equal password"
            } ) );
        } else {
            setErr( prev => ( {
                ...prev,
                cfpass: ""
            } ) );
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
        Object.entries( user ).forEach( ( [ key, value ] ) => {
            if ( value === "" ) {
                setErr( prev => ( {
                    ...prev,
                    [ key ]: "required"
                } ) )
                isAllow = false;
            }
        } )
        if ( !update && ( confirmPassword !== user.password ) ) {
            setErr( prev => ( { ...prev, cfpass: "confirmpassword must equal password" } ) )
            isAllow = false;
        }
        if ( isAllow ) {
            if ( update ) {
                updateUser( dispatch, idUser, user, history );
                history.goBack();
            } else {
                createUser( dispatch, user, history );
                history.goBack();
            }
        }
    }


    return (
        <Container>
            <Form>
                <Title>{ update ? "UPDATE USER" : "CREATE AN ACCOUNT" }</Title>
                <Wrapper>
                    <InputWrap>
                        <Input onChange={ hanlderInput } defaultValue={ user.firstname } name="firstname" placeholder="FirstName..." />
                        { err.firstname && <Error>{ err.firstname }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input onChange={ hanlderInput } defaultValue={ user.lastname } name="lastname" placeholder="LastName..." />
                        { err.lastname && <Error>{ err.lastname }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input onChange={ hanlderInput } defaultValue={ user.username } name="username" placeholder="Username..." />
                        { err.username && <Error>{ err.username }</Error> }
                    </InputWrap>
                    <InputWrap>
                        <Input onChange={ hanlderInput } defaultValue={ user.email } name="email" placeholder="Email..." />
                        { err.email && <Error>{ err.email }</Error> }
                    </InputWrap>
                    { !update && (
                        <>
                            <InputWrap>
                                <Input onChange={ hanlderInput } defaultValue={ user.password } name="password" type="password" placeholder="Password..." />
                                { err.password && <Error>{ err.password }</Error> }
                            </InputWrap>
                            <InputWrap>
                                <Input onChange={ hanlderCfPass } onBlur={ hanlderBlur } defaultValue={ confirmPassword } type="password" placeholder="ConfirmPassword..." />
                                { err.cfpass && <Error>{ err.cfpass }</Error> }
                            </InputWrap>
                        </>
                    ) }
                    <InputWrap>
                        <InputRadio>
                            <input onClick={ hanlderInput } type="radio" checked={ user.isAdmin } name="isAdmin" value={ true } />
                            <span style={ { marginLeft: 8 } }>ADMIN</span>
                        </InputRadio>
                    </InputWrap>
                    <InputWrap>
                        <InputRadio>
                            <input onClick={ hanlderInput } defaultChecked={ true } type="radio" name="isAdmin" value={ false } />
                            <span style={ { marginLeft: 8 } }>USER</span>
                        </InputRadio>
                    </InputWrap>
                </Wrapper>
                <Buttons>
                    <Button type="button" color="#ffa9a9" onClick={ () => history.goBack() }>BACK</Button>
                    { idUser ? <Button type="button" color="teal" onClick={ hanlderSubmit }>UPDATE</Button>
                        : <Button type="button" color="teal" onClick={ hanlderSubmit }>SAVE</Button>
                    }

                </Buttons>
            </Form>
        </Container>
    )
}

export default NewUser;

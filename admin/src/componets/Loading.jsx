import React from 'react';
import styled from "styled-components";
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #eeeeee;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 22;
`;

const Loading = () => {
    const { isLoading } = useSelector( state => state.loading );
    return (
        <>
            { isLoading ? <Container>
                <CircularProgress />
            </Container> : "" }
        </>
    )
}

export default Loading

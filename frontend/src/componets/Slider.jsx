import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { useHistory } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    ${ mobile( {
    display: "none"
} ) }
`;
const Arrow = styled.span`
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${ ( props ) => props.type === "prev" && "10px" };
    right: ${ ( props ) => props.type === "next" && "10px" };
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    cursor: pointer;
    z-index: 2;
`;
const Wrapper = styled.div`
    display: flex;
    height: 100%;
    transform: translateX(${ ( props ) => props.indexSlide * ( -100 ) }vw) ;
    transition: all 1s ease-in-out;
    
`;
const Slide = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 80vh;
    position: relative;
    color: #63ebfd;
`;
const ImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;
`;
const Image = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;
const InfoContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Title = styled.h1`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 70px;
    margin-bottom: 30px;
`;
const Button = styled.button`
    padding: 16px;
    background-color: transparent;
    border: 2px solid black;
    color: black;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 400;
    transition: all .5s ease;

    &:hover {
        transform: scale(1.08);
        cursor: pointer;
    }
`;

const Slider = () => {
    const [ indexSlide, setIndexSlide ] = useState( 0 );
    const history = useHistory();

    useEffect( () => {
        const num = setInterval( () => {
            setIndexSlide( indexSlide === 2 ? ( 0 ) : ( indexSlide + 1 ) )
        }, 3000 )
        return () => {
            clearInterval( num );
        }
    }, [ indexSlide ] )

    const hanlderBtn = ( type ) => {
        if ( type === "prev" ) {
            setIndexSlide( indexSlide === 0 ? 2 : ( indexSlide - 1 ) )
        } else {
            setIndexSlide( indexSlide === 2 ? ( 0 ) : ( indexSlide + 1 ) )
        }
    }

    const hanlderClick = () => {
        history.push( "/products" );
    }

    return (
        <Container>
            <Arrow type="prev" onClick={ () => hanlderBtn( "prev" ) }>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper indexSlide={ indexSlide }>
                { sliderItems.map( slider => (
                    <Slide key={ slider.id }>
                        <ImgContainer>
                            <Image src={ slider.img }></Image>
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{ slider.title }</Title>
                            <Button onClick={ hanlderClick }>SHOP NOW</Button>
                        </InfoContainer>
                    </Slide>
                ) ) }
            </Wrapper>
            <Arrow type="next" onClick={ () => hanlderBtn( "next" ) }>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider

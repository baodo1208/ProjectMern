import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import storage from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { createProduct, updateProduct } from "../redux/callAPI";

const metadata = {
    contentType: 'image/jpeg'
};


const Container = styled.div`
    display: flex;
    min-height: 120vh;
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

const Wrap = styled.div`
    flex: 1;
    display: flex; 
    justify-content: space-between;
`;

const WrapInput = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ccc;
    outline: none;
`;

const Img = styled.img`
    height: 10vh;
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
    cursor: ${ props => ( ( props.loading === "isLoading" ) ? "none" : "pointer" ) };
    opacity: ${ props => ( props.loading === "isLoading" ) ? "0.6" : undefined };
`;


const HandleProduct = () => {
    const location = useLocation();
    const history = useHistory();
    const [ loading, setLoading ] = useState( "" );
    const [ file, setFile ] = useState( null );
    const [ newImg, setNewImg ] = useState( false );
    const idProduct = location.pathname.split( "/" )[ 3 ];
    const { products } = useSelector( state => state.products );
    // url img for delete img in firebase when update product with newImg
    const imgRef = useRef( "" );
    const [ product, setProduct ] = useState( {
        title: "",
        desc: "",
        img: "",
        categories: [],
        size: [],
        price: ""
    } );
    const [ err, setErr ] = useState( {} );
    const dispatch = useDispatch();

    useEffect( () => {
        if ( idProduct ) {
            const product = products.find( product => product._id === idProduct );
            if ( product ) {
                imgRef.current = product.img;
                setProduct( product );
            } else {
                history.push( "/app/products" );
            }
        }
    }, [ idProduct, products, history ] )


    const hanldeChange = ( e ) => {
        const name = e.target.name;
        if ( name === "categories" || name === "size" ) {
            const oldValue = product[ name ];
            const newValue = oldValue.includes( e.target.value ) ? oldValue.filter( value => value !== e.target.value )
                : [ ...oldValue, ( !oldValue.includes( e.target.value ) && e.target.value ) ];
            setProduct( prev => ( {
                ...prev,
                [ name ]: newValue
            } ) )
        } else {
            setProduct( prev => ( {
                ...prev,
                [ name ]: e.target.value
            } ) )
        }
        setErr( prev => ( {
            ...prev,
            [ name ]: ""
        } ) )
    }

    const onImageChange = ( event ) => {
        if ( event.target.files && event.target.files[ 0 ] ) {
            setProduct( prev => ( {
                ...prev,
                img: URL.createObjectURL( event.target.files[ 0 ] )
            } ) )
            // set file for upload firebase
            setFile( event.target.files[ 0 ] );
            setNewImg( true );
            setErr( prev => ( {
                ...prev,
                img: ""
            } ) )
        }
    }


    const checkValid = () => {
        let isValid = true;
        Object.entries( product ).forEach( ( [ key, value ] ) => {
            if ( key !== "img" && value.length === 0 ) {
                setErr( prev => ( {
                    ...prev,
                    [ key ]: "must be fullfil"
                } ) )
                isValid = false;
            }
        } )
        if ( !product.img ) {
            setErr( prev => ( {
                ...prev,
                img: "must be fullfil"
            } ) )
            isValid = false;
        }
        return isValid;
    }


    const hanldeUpload = () => {
        if ( checkValid() ) {
            if ( newImg ) {
                const fileName = new Date().getTime() + file.name;
                const storageRef = ref( storage, 'images/' + fileName );
                const uploadTask = uploadBytesResumable( storageRef, file, metadata );
                if ( !idProduct ) {
                    //  create new product
                    uploadTask.on( 'state_changed',
                        () => {
                            setLoading( "isLoading" );
                        },
                        () => {
                            console.log( "error" )
                        },
                        () => {
                            getDownloadURL( uploadTask.snapshot.ref ).then( ( downloadURL ) => {
                                const productReq = { ...product, img: downloadURL }
                                createProduct( dispatch, productReq );
                                history.goBack();
                            } );
                        }
                    );
                } else {
                    // update product, update img in firebase

                    // delete old-img before update new img in firebase 
                    if ( imgRef.current ) {
                        const imgDelete = imgRef.current.split( "?" )[ 0 ].split( "%" )[ 1 ].slice( 2 );
                        const desertRef = ref( storage, `images/${ imgDelete }` );
                        deleteObject( desertRef );
                    }

                    uploadTask.on( 'state_changed',
                        () => {
                            setLoading( "isLoading" );
                        },
                        () => {
                            console.log( "error" )
                        },
                        () => {
                            getDownloadURL( uploadTask.snapshot.ref ).then( ( downloadURL ) => {
                                const productReq = { ...product, img: downloadURL }
                                updateProduct( dispatch, idProduct, productReq );
                                history.goBack();
                            } );
                        }
                    );

                }
            } else {
                // only update product 
                updateProduct( dispatch, idProduct, product );
                history.goBack();
            }
        }
    }


    return (
        <Container>
            <Form>
                <Title>New Product</Title>
                <Wrapper>
                    <Input defaultValue={ product.title || "" } onInput={ hanldeChange } name="title" placeholder="Title..." />
                    { err.title && <Error>{ err.title }</Error> }
                    <Input defaultValue={ product.desc || "" } onInput={ hanldeChange } name="desc" placeholder="Desc..." />
                    { err.desc && <Error>{ err.desc }</Error> }
                    <Input defaultValue={ product.price || "" } onInput={ hanldeChange } name="price" placeholder="Price..." />
                    { err.price && <Error>{ err.price }</Error> }
                    <Input onChange={ onImageChange } name="img" type="file" placeholder="Img..." />
                    { err.img && <Error>{ err.img }</Error> }
                    <div>
                        { product.img ? <Img src={ product.img } />
                            : <Img src={ "https://via.placeholder.com/150" } />
                        }
                    </div>
                    <Wrap>
                        <WrapInput>
                            <Input checked={ product.categories?.includes( "women" ) } onChange={ hanldeChange } name="categories" type="checkbox" value="women" />
                            <label style={ { marginLeft: '4px' } }>Women</label>
                        </WrapInput>
                        <WrapInput>
                            <Input checked={ product.categories?.includes( "jacket" ) } onChange={ hanldeChange } name="categories" type="checkbox" value="jacket" />
                            <label style={ { marginLeft: '4px' } }>Jacket</label>
                        </WrapInput>
                        <WrapInput>
                            <Input checked={ product.categories?.includes( "man" ) } onChange={ hanldeChange } name="categories" type="checkbox" value="man" />
                            <label style={ { marginLeft: '4px' } }>Man</label>
                        </WrapInput>
                    </Wrap>
                    { err.categories && <Error>{ err.categories }</Error> }
                    <Wrap>
                        <WrapInput>
                            <Input checked={ product.size.includes( "X" ) } onChange={ hanldeChange } name="size" type="checkbox" value="X" />
                            <label style={ { marginLeft: '4px' } }>X</label>
                        </WrapInput>
                        <WrapInput>
                            <Input checked={ product.size?.includes( "S" ) } onChange={ hanldeChange } name="size" type="checkbox" value="S" />
                            <label style={ { marginLeft: '4px' } }>S</label>
                        </WrapInput>
                        <WrapInput>
                            <Input checked={ product.size?.includes( "M" ) } onChange={ hanldeChange } name="size" type="checkbox" value="M" />
                            <label style={ { marginLeft: '4px' } }>M</label>
                        </WrapInput>
                        <WrapInput>
                            <Input checked={ product.size?.includes( "L" ) } onChange={ hanldeChange } name="size" type="checkbox" value="L" />
                            <label style={ { marginLeft: '4px' } }>L</label>
                        </WrapInput>
                    </Wrap>
                    { err.size && <Error>{ err.size }</Error> }
                </Wrapper>
                <Buttons>
                    <Button type="button" color="#ffa9a9" onClick={ () => history.goBack() }>BACK</Button>
                    <Button type="button" color="teal" onClick={ hanldeUpload } loading={ loading }>UPLOAD</Button>
                </Buttons>
            </Form>
        </Container >
    )
}

export default HandleProduct;
import styled from "styled-components";
import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    ${ mobile( {
    flexDirection: 'column'
} ) }
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const TradeMark = styled.h1`
    letter-spacing: 1px;
`;
const Drc = styled.div`
    margin: 20px 0px;
`;
const ListLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    
`;
const LinkItem = styled.div`
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${ ( props ) => props.bg };
`;
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${ mobile( {
    backgroundColor: "#fcf5f5"
} ) }
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 10px;
    display:flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 60%;
    margin-top: 10px;
`;

const Footer = () => {
    return (
        <Container>
            <Left>
                <TradeMark>E-commerce</TradeMark>
                <Drc>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable.</Drc>
                <ListLink>
                    <LinkItem bg="#3B5999">
                        <Facebook />
                    </LinkItem>
                    <LinkItem bg="#E4405F">
                        <Instagram />
                    </LinkItem>
                    <LinkItem bg="#55ACEE">
                        <Twitter />
                    </LinkItem>
                    <LinkItem bg="#E60023">
                        <Pinterest />
                    </LinkItem>
                </ListLink>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Man Fashion</ListItem>
                    <ListItem>Accessories</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>Woman Fashion</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Wishlist</ListItem>
                    <ListItem>Terms</ListItem>
                </List>
            </Center>
            <Right>
                <Title>Contact</Title>
                <ContactItem>
                    <Room style={ { marginRight: "10px" } } />Cau Giay, Ha Noi
                </ContactItem>
                <ContactItem>
                    <Phone style={ { marginRight: "10px" } } />+1 234 56 789
                </ContactItem>
                <ContactItem>
                    <MailOutline style={ { marginRight: "10px" } } />e-commerce@gmail.com
                </ContactItem>
                <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
            </Right>
        </Container>
    )
}

export default Footer

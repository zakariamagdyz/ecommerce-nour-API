import React from "react";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  LocationOn,
  MailOutline,
  Phone,
  Pinterest,
  Twitter,
} from "@mui/icons-material";
import mediaDevices from "../style/mediaDevices";

///////////////////////////////////

const Container = styled.div`
  display: flex;
  margin-top: 8rem;
  @media ${mediaDevices.mobile} {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 2rem 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
`;

const Center = styled.div`
  flex: 1;
  padding: 2rem;

  @media ${mediaDevices.mobile} {
    display: none;
  }
`;

const Title = styled.h3`
  margin-bottom: 3rem;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 1rem;
`;

const Right = styled.div`
  flex: 1;
  padding: 2rem;
  @media ${mediaDevices.mobile} {
    background-color: #f7f7f7;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;
const Payment = styled.img`
  width: 60%;
`;

/////////////////////////////////

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>LAMA.</Logo>
        <Desc>
          t is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here,
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>WishList</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOn />
          622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone />
          +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline />
          contact@zakaria.dev
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;

import React from "react";
import styled from "styled-components";
import { Theme } from "../../theme";
import WhiteLogo from "../../assets/Logo.jpg";
import FooterLogo from '../../assets/FooterLogo.png'
import Coveo from '../../assets/Coveo.png'


const Footer: React.FC = () => {
  return (
    <Wrapper>
      <Logo src={FooterLogo} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: #484c4b;
  padding: 32px 0px;
`;

const Logo = styled.img`
  height: 100px;
  object-fit: contain;
  margin-left: 100px;
`;

export default Footer;

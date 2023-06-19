import React from 'react';
import {Theme} from '../../theme';
import styled from "styled-components";
import { NavLink } from 'react-router-dom';
import { NavBarConfig } from '../../config/HomeConfig';


const NavBar: React.FC = ()=>{
    if(NavBarConfig.length > 0)
    {
        return <Wrapper>
        <NavigationWrapper>
            {NavBarConfig.map((item)=>{
                return<NavigationLink key = {item.title} href={item.redirectTo}>{item.title}</NavigationLink>
            })}
        </NavigationWrapper>
    </Wrapper>
    }
    else{
        return null
    }

    
};

const Wrapper = styled.nav`
height: 40px;
width: 100%;
background-color: ${Theme.navbar};
`

const NavigationWrapper = styled.ul`
margin-left: 20px;
display: flex;
color : white;
width: 20%;
min-width: 400px;
height: 40px;
justify-content: space-around;
align-items: center;
@media (max-width: 480px) {
    margin-left: 0px;
    padding-left: 0;
    width: 100%;
    min-width: auto;
}
`

const NavigationLink = styled.a`
color: white;
font-size: 14px;
text-decoration: none;
opacity: 0.8;
transition: 0.2s ease-in-out all;
&:hover{
    opacity: 1;
}
&.active{
    opacity: 1;
}
`

export default NavBar;



import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Search from './Search';
import Logout from './Logout';

const TopBarWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
`;

const Brand = styled.h1``;

const Username = styled.h1`
    font-size: 24px;
    line-height: 24px;
    height: 24px;
    margin: 0;
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50px;
    margin-top: auto;
    margin-bottom: auto;
`;

const TopBar = ({ user }) => (
    <TopBarWrapper>
        <Brand>Riftter</Brand>
        <Search />
        <Right>
            <Username>{`${user.name} ${user.surname}`}</Username>
            <Logout />
        </Right>
    </TopBarWrapper>
)


const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(TopBar);
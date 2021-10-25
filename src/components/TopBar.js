import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { connect } from 'react-redux';
import Search from './Search';
import { Typography, Stack } from '@mui/material';
import AccountMenu from './AccountMenu/AccountMenu';
import { useHistory } from 'react-router-dom';

const NewTopBar = ({ user }) => {
    const history = useHistory();
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ borderBottomColor: '#00BFFF', borderBottomWidth: '2px', borderBottomStyle: 'solid' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            '&:hover': {
                                textDecoration: 'underline',
                                cursor: 'pointer'
                            } 
                        }}
                        onClick={() => history.push('/home')}
                    >
                        Riftter
                    </Typography>
                    <Typography
                        variant="h4"
                        noWrap
                        sx={{ margin: '0px 30px' }}
                    >
                        hey {user.username}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Stack direction="row" spacing={1}>
                        <Search />
                        <AccountMenu />
                    </Stack>  
                </Toolbar>
            </AppBar>
        </Box>
    )
}


const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(NewTopBar);
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { AccountCircle } from '@mui/icons-material'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AccountMenu = ({ clearUser, user }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const menuOpen = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setModalOpen(true)
    handleClose()
  }

  const handleModalClose = () => {
    handleClose()
    setModalOpen(false)
  }

  const handleProfile = () => {
    handleClose();
    history.push(`/profile/${user.id}`);
  }

  const history = useHistory();

  const logout = (e) => {
      e.preventDefault()
      return fetch(`http://localhost:3000/auth/logout`, {
          credentials: 'include'
      })
      .then(() => {
          clearUser();
          setModalOpen(false)
          history.push('/');
      })
      .catch((err) => console.log({ err }));
  }
  

  return (
    <div>
      <Stack 
        direction="column" 
        justifyContent="center"
        sx={{ m: '10px' }}
      >
        <AccountCircle 
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleClick}
        />
      </Stack>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you wish to logout?
            </Typography>
            <Typography id="modal-modal-body" paragraph={true} sx={{
              margin: '10px 0px'
            }}>
              This action is not reversible and will cause you to lose all of your unsaved data.
            </Typography>
            <Stack direction="row" spacing={2} sx={{
              marginTop: '20px'
            }}>
              <Button variant="contained" color="secondary" onClick={logout}>Confirm</Button>
              <Button variant="contained">Return</Button>
            </Stack>
          </Box>
        </Modal>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => ({
  clearUser: () => dispatch({ type: 'user/clear' })
});

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu)
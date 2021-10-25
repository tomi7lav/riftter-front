import React, { useEffect, useState } from 'react';
import { default as styledC } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  

const SearchWrapper = styledC.div`
    position: relative;
    margin-top: 5px;
`;

const SearchResults = styledC.div`
    position: absolute;
    border: 1px solid grey;
    z-index: 99;
    background: white;
    width: 100%;
    box-sizing: border-box;
    border-radius: 0px 0px 7px 7px;

   
`;

const SearchResultItem = styledC.div`
    border-bottom: 1px solid grey;
    padding: 8px;
    box-sizing: border-box;
    color: black;

    &:hover {
        cursor: pointer;
        background-color: whitesmoke;
    }

    &:last-child {
        border-bottom: none;
        border-radius: 0px 0px 7px 7px;
    }
`;


const searchUser = (val) => {
    return fetch(`http://localhost:3000/users/search/${val}`, {
        credentials: 'include',
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
};

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [focused, setFocused] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(searchValue.length > 2) {
            searchUser(searchValue).then((results) => {
                setSearchResults(results);
            })
        }
    }, [searchValue])

    const navigate = (e, id) => {
        e.preventDefault();
        history.push(`/profile/${id}`)
    }

    return (
        <SearchWrapper>
            <SearchBar >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                 <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 
                        'aria-label': 'search',
                        onChange: e => setSearchValue(e.target.value),
                        onFocus: () => setFocused(true),
                        onBlur: () => setFocused(false)
                    }}
                />
                {searchValue.length > 2 && focused && searchResults && (
                    <SearchResults>
                        {searchResults.map(item => {
                            console.log({ item })
                            return (
                                <SearchResultItem key={item.id} onMouseDown={(e) => navigate(e, item.id)}>{item.username}</SearchResultItem>
                            )
                        })}
                    </SearchResults>
                )}
            </SearchBar>
            
        </SearchWrapper>
    )
}

export default Search;
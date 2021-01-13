import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SearchBar = styled.input`
    font-size: 16px;
    height: 24px;
`;

const SearchWrapper = styled.div`
    position: relative;
    margin-top: 20px;
`;

const SearchResults = styled.div`
    position: absolute;
    border: 1px solid grey;
    border-bottom: none;
    z-index: 99;
    background: white;
    width: 100%;
    box-sizing: border-box;
`;

const SearchResultItem = styled.div`
    border-bottom: 1px solid grey;
    padding: 5px;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
        background-color: whitesmoke;
    }
`;


const searchUser = (val) => {
    return fetch(`http://localhost:3000/profiles/search/${val}`, {
        credentials: 'include',
    })
    .then(res => res.json())
    .catch((err) => console.log({ err }));
};

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [focused, setFocused] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if(searchValue.length > 2 && fetching === false) {
            setFetching(true);
            searchUser(searchValue).then((results) => {
                setSearchResults(results);
                setFetching(false)
            })
        }
    }, [searchValue])

    const navigate = (e, id) => {
        console.log('clicked')
        e.preventDefault();
        history.push(`/profile/${id}`)
    }

    return (
        <SearchWrapper>
            <SearchBar 
                type="text" 
                onChange={e => setSearchValue(e.target.value)} 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {searchValue.length > 2 && focused && searchResults && (
                <SearchResults>
                    {searchResults.map(item => {
                        return (
                            <SearchResultItem key={item.id} onMouseDown={(e) => navigate(e, item.id)}>{item.username}</SearchResultItem>
                        )
                    })}
                </SearchResults>
            )}
        </SearchWrapper>
    )
}

export default Search;
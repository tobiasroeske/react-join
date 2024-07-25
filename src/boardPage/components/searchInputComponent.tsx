function SearchInput() {
    return (
        <div className="inputContainer">
            <label htmlFor="searchInput" />
            <input
                type="text"
                id="searchInput"
                name='searchInput'
                placeholder='Find Task' />
            <img src="/assets/icons/search.png" alt="" />
        </div>
    );
}

export default SearchInput;
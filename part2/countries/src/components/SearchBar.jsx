const SearchBar = ({ newCountry, handleCountryChange }) => {
  return (
    <div>
      <form>
        <div>
          find countries{" "}
          <input value={newCountry} onChange={handleCountryChange} />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

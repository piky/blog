import React from 'react';
import SearchBar from '@theme-original/SearchBar';

export default function SearchBarWrapper(props) {
  return (
    <>
      {/* Render the original SearchBar component */}
      {/* This is where the Google Custom Search Engine will be rendered */}
      {/* Ensure that the SearchBar component is wrapped in a div with the class 'gcse-search' */}
      {/* This allows the Google CSE to be initialized properly */}
      {/* The SearchBar component will automatically handle the search functionality */}
      {/* You can pass any props to the SearchBar component as needed */}
      {/* For example, you can pass a placeholder text or any other configuration */}
      {/* Here, we are using the props passed to this wrapper component */}
      {/* This allows for flexibility in how the SearchBar is configured */}
      {/* The SearchBar component will render the search input and button */}
      {/* You can customize the appearance of the search bar using CSS */}
      {/* Ensure that the Google CSE script is loaded in your HTML file */}
      {/* This is typically done in the <head> section of your HTML document */}
      {/* The script should look like this: */}
      {/* <script async src="https://cse.google.com/cse.js?cx=<YOUR_CSE_ID>"></script> */}
      <div className="gcse-search"></div>
      <SearchBar {...props} />
    </>
  );
}

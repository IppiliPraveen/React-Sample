import React from "react";

interface Props {
    name: string;
  }
  function SearchEmploy(props: Props) {
    return <div>Hello, {props.name}!</div>;
  }
export default SearchEmploy;
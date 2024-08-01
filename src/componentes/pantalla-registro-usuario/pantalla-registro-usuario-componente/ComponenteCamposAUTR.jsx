/* eslint-disable arrow-body-style */
import React from "react";
import { v4 } from "uuid";

const ComponenteCamposAUTR = () => {
  return (
    <React.Fragment key={v4()}>
      <p>Hola mundo</p>
    </React.Fragment>
  );
};

export default ComponenteCamposAUTR;

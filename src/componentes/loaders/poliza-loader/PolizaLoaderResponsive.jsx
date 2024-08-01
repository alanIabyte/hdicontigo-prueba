/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import ContentLoader from "react-content-loader";
import { EnvolvedorPantallaResponsive } from "../../componentes-styled-compartidos/Pantalla.styled";

const PolizaLoaderResponsive = (props) => (
  <EnvolvedorPantallaResponsive>
    <ContentLoader
      speed={2}
      width={230}
      height={160}
      viewBox="0 0 200 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#737373"
      {...props}
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <rect x="0" y="8" rx="0" ry="0" width="32" height="30" />
      <rect x="1" y="134" rx="11" ry="11" width="77" height="16" />
      <rect x="307" y="132" rx="12" ry="12" width="84" height="20" />
    </ContentLoader>
  </EnvolvedorPantallaResponsive>
);

export default PolizaLoaderResponsive;

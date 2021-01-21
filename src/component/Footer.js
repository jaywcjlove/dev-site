import React from 'react';
import './Footer.scss';

export default function Footer({ children }) {
  return (
    <div className="footer"><span>{children}</span></div>
  );
}

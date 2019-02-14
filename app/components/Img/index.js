/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React from 'react';
import PropTypes from 'prop-types';

function Img(props) {
  let image = (
    <img className={props.className} src={props.src} alt={props.alt} />
  );
  if (props.href) {
    image = <a href={props.href}>{image}</a>;
  }
  return image;
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

export default Img;

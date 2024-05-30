import React from "react";
import PropTypes from "prop-types";
import { FaSun, FaMoon } from "react-icons/fa";

const IconComponent = ({ iconType }) => {
  return (
    <p className="text-toggle">
      {iconType === "light" ? <FaSun /> : <FaMoon />}
    </p>
  );
};

export default IconComponent;

IconComponent.propTypes = {
  iconType: PropTypes.string.isRequired,
};

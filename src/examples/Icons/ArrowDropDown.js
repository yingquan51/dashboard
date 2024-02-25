import PropTypes from "prop-types";
// Soft UI Dashboard PRO React base styles
import colors from "assets/theme/base/colors";

function ArrowDropDownIcon({ color, size, marginRight }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginRight: `${marginRight}px` }} // Add margin to the right
    >
      <path
        d="M19 9l-7 7-7-7"
        id="Path"
        opacity="0.7"
      />
    </svg>
  );
}

// Setting default values for the props of Cube
ArrowDropDownIcon.defaultProps = {
  color: "dark",
  size: "16px",
  marginRight: 4, // Default right margin
};


ArrowDropDownIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginRight: PropTypes.number, // Prop for controlling right margin
};

export default ArrowDropDownIcon;

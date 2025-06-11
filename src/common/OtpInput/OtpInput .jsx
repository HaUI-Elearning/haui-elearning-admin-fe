
import PropTypes from "prop-types";
import "./OtpInput.css";
import { useRef } from "react";

const OtpInput = ({ length = 6, onChange }) => {
  const inputsRef = useRef([]);

  const handleOtpInput = (e, index) => {
    const value = e.target.value;
    const newOtp = inputsRef.current.map((input) => input?.value || "");
    onChange?.(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (
      !value &&
      index > 0 &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-input-group">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          className="otp-box"
          ref={(el) => (inputsRef.current[i] = el)}
          onInput={(e) => handleOtpInput(e, i)}
        />
      ))}
    </div>
  );
};
OtpInput.propTypes = {
  length: PropTypes.number,
  onChange: PropTypes.func
};

export default OtpInput;


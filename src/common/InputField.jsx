import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const InputField = ({
  control,
  name,
  placeholder,
  type = "text",
  icon: Icon,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <div className="input-group">
          <input {...field} type={type} placeholder={placeholder} required />
          {Icon && (
            <span className="icon">
              <Icon />
            </span>
          )}
        </div>
      )}
    />
  );
};

InputField.propTypes = {
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.elementType,
};

export default InputField;

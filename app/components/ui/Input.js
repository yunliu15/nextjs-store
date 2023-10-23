const Input = (props, ref) => {
  const {
    className,
    onChange,
    title,
    icon,
    inputSize = "medium",
    inputClassName,
    errorClassName,
    variant,
    isError = false,
    required,
    name,
    register,
    validationError,
    errorMessage = "Field is required.",
    validate,
    id,
    autoComplete = "off",
    ...rest
  } = props;

  const handleOnChange = (e) => {
    if (onChange) {
      if (rest.type === "number" && typeof rest.step === "number") {
        let newValue =
          rest.step && rest.step < 1
            ? parseFloat(e.target.value) || 0
            : parseInt(e.target.value, 10) || 0;
        if (rest.max !== undefined && rest.max !== null) {
          newValue = Math.min(
            typeof rest.max === "string" ? parseInt(rest.max) : rest.max,
            newValue
          );
        }
        if (rest.min !== undefined && rest.min !== null) {
          newValue = Math.max(
            typeof rest.min === "string" ? parseInt(rest.min) : rest.min,
            newValue
          );
        }

        onChange(rest.min ? newValue : newValue !== 0 ? newValue : "");
      } else {
        onChange(e.target.value);
      }
    }
    return null;
  };

  return (
    <label className={className} htmlFor={id}>
      {title & <div>{title}</div>}
      <div>
        <input
          id={id}
          className={inputClassName}
          onChange={handleOnChange}
          autoComplete={autoComplete}
          ref={ref}
          {...register?.(name || "", {
            returied: {
              value: required || false,
              message: "Field is required.",
            },
            onchange: handleOnChange,
            validate,
          })}
          {...rest}
        />
        {icon && <div>{icon}</div>}
      </div>
      {isError && (
        <div className={errorClassName}>{validationError || errorMessage} </div>
      )}
    </label>
  );
};

export default Input;

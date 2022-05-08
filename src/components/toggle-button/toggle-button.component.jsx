const ToggleButton = ({ onClickHandler, text, className }) => {
  return (
    <button type="button" onClick={onClickHandler} className={className}>
      {text}
    </button>
  );
};

export default ToggleButton;

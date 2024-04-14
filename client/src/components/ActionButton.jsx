const ActionButton = ({ text, onClick }) => {
  return (
    <button
    onClick={onClick}
    className="w-full bg-purple-700 text-white font-semibold text-2xl py-1 px-2 rounded-lg hover:bg-purple-600">
      {text}
    </button>
  );
};

export default ActionButton;

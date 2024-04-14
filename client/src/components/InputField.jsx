const InputField = ({ labelName, type, placeholder, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label className="font-bold text-gray-500 pl-1">{labelName}</label>
      <input
        className="rounded-lg border border-gray-300 py-1 px-2 font-semibold"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

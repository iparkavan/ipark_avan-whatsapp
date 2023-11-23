import React from "react";

interface props {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: boolean;
}

const Input = ({ name, value, onChange, label = false }: props) => {
  return (
    <div className="flex gap-1 flex-col">
      {label && (
        <label htmlFor={name} className="text-teal-light text-lg px-1">
          {name}
        </label>
      )}
      <div>
        <input
          type="text"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-input-background text-start focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
        />
      </div>
    </div>
  );
};

export default Input;

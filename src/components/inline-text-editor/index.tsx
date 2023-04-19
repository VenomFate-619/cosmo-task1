import { useState } from "react";
interface InlineTextEditorProps {
  text: string;
  saveName: (id: string, data: any) => void;
  id:string
}

const InlineTextEditor = ({ text , saveName , id }: InlineTextEditorProps) => {
  const [inputValue, setInputValue] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const guardEmpty = (func: any) => {
    if (inputValue.length === 0) return;
    func();
  };

  const handleInput = (e: any) => {
    setInputValue(e.target.value);
  };
  const keyPress = (e: any) => {
    if (e.key === "Enter" || e.key === "Escape") {
      saveName(id , {name:inputValue})
      guardEmpty(() => {
        setIsEditing(false);
      });
    }
  };
  return isEditing ? (
    <input
      type="text"
      onChange={handleInput}
      onKeyDown={keyPress}
      value={inputValue}
      autoFocus
      onBlur={() => {
        saveName(id , {name:inputValue})
        guardEmpty(() => {
          setIsEditing(false);
        });
      }}
      className="focus:outline-none min-w-[20px] rounded px-1"
      style={{ width: inputValue.length + 2 + "ch" }}
    />
  ) : (
    <p onClick={() => setIsEditing(true)}>{inputValue}</p>
  );
};

export default InlineTextEditor;

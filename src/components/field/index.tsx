import InlineTextEditor from "../inline-text-editor";
import trash from "../../assets/trash.svg";
import plus from "../../assets/plus.svg";
import { typesOfData } from "../../constant";
import { fieldType } from "../../types";

interface FieldProps {
  nameOfField: string;
  id: string;
  typeOfField:
    | typesOfData.STRING
    | typesOfData.NUMBER
    | typesOfData.BOOLEAN
    | typesOfData.OBJECT;
  changeType: (id: string, modifiedType: typesOfData) => void;
  addFieldInObject: (id: string, parentId: string) => void;
  parentId: string;
  schemaData: fieldType;
  deleteField: (id: string) => void;
  updateField: (id: string, data: any) => void;
}

const Field = ({
  nameOfField,
  typeOfField,
  changeType,
  id,
  addFieldInObject,
  schemaData,
  parentId,
  deleteField,
  updateField,
}: FieldProps) => {
  return (
    <>
      <div className="flex col-start-2 col-end-3 border-b border-gray-400">
        <div className="flex justify-between w-full rounded group hover:bg-[#EDEAEC] p-2">
          <div className="space-x-2 flex items-center">
            <InlineTextEditor
              text={nameOfField}
              saveName={updateField}
              id={id}
            />
            <select
              value={typeOfField}
              onChange={(e) => changeType(id, e.target.value as typesOfData)}
              className="bg-gray-200 py-1 font-medium rounded-lg outline-none focus:outline-none"
            >
              {Object.values(typesOfData).map((value) => (
                <option value={value} key={value}>
                  {value.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="group-hover:flex items-center gap-x-2 hidden">
            <div className="flex gap-x-2 items-center">
              <span>Required</span>
              <label className="relative inline-flex items-center  cursor-pointer">
                <input
                  type="checkbox"
                  checked={schemaData[id].required}
                  className="sr-only peer"
                  onChange={(e) =>
                    updateField(id, { required: e.target.checked })
                  }
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
              </label>
            </div>
            {typeOfField === typesOfData.OBJECT && (
              <img
                src={plus}
                alt="add"
                className="w-5 h-5 bg-white cursor-pointer"
                onClick={() => addFieldInObject(id, parentId)}
              />
            )}
            <img
              src={trash}
              alt="delete"
              className="w-5 h-5 cursor-pointer"
              onClick={() => deleteField(id)}
            />
          </div>
        </div>
      </div>
      {typeOfField === typesOfData.OBJECT &&
        (schemaData[id].childIds.length > 0
          ? schemaData[id].childIds.map((s: any) => {
              return schemaData[s] !== undefined ? (
                <div className="col-start-2  relative pl-5 border-l" key={s}>
                  <Field
                    nameOfField={schemaData[s].name}
                    typeOfField={schemaData[s].type}
                    key={s}
                    changeType={changeType}
                    id={s}
                    parentId={s}
                    schemaData={schemaData}
                    addFieldInObject={addFieldInObject}
                    deleteField={deleteField}
                    updateField={updateField}
                  />
                </div>
              ) : null;
            })
          : null)}
    </>
  );
};

export default Field;

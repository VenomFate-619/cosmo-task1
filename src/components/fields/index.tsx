import { useState } from "react";
import plus from "../../assets/plus.svg";
import { typesOfData } from "../../constant";
import Field from "../field";
import clone from "just-clone";
import React from "react";

type MyType = {
  [key: string]: {
    type: typesOfData;
    required: boolean;
    name: string;
    childIds: string[];
    parentId: string;
  };
};

function parseData(data: MyType) {
  let ans: any = {};
  for (let item in data) {
    if (data[item].childIds.length === 0) {
      ans[data[item].name] = { ...data[item], id: item };
    } else {
      ans[data[item].name] = { ...data[item], id: item };
      ans[data[item].name] = {
        ...ans[data[item].name],
        ...parseData(data[data[item].childIds[0]]),
      };
    }
  }

  return ans;
}

const initialData = (id: string) => {
  return {
    type: typesOfData.STRING,
    required: false,
    childIds: [],
    name: "addName",
    parentId: id,
  };
};

const Fields = () => {
  const [schema, setSchema] = useState<MyType>({});
  const onAdd = () => {
    let newSchema = clone(schema);
    newSchema[Date.now()] = initialData("");
    setSchema(newSchema);
  };
  const addFieldInObject = (id: string, parentId: string) => {
    let newSchema = clone(schema);
    const newField = initialData(parentId);
    let newId = Date.now();
    newSchema[newId] = newField;
    newSchema[parentId].childIds.push(String(newId));
    setSchema(newSchema);
  };
  const changeType = (id: string, modifiedType: typesOfData) => {
    let newSchema = clone(schema);
    newSchema[id].type = modifiedType;
    newSchema[id].childIds = [];
    setSchema(newSchema);
  };

  const deleteField = (id: string) => {
    let newSchema = clone(schema);
    delete newSchema[id];
    setSchema(newSchema);
    // improve delete childId from parent
  };

  const updateField = (id: string, data: any) => {
    let newSchema = clone(schema);
    newSchema[id] = { ...newSchema[id], ...data };
    setSchema(newSchema);
  };

  return (
    <div className="bg-[#FAF9FA] p-4 grid grid-cols-[auto_1fr] gap-x-6  items-center">
      <div className="flex justify-between text-lg col-start-2 ">
        <p className="text-gray-600">Field name and type</p>
        <img
          src={plus}
          alt="add"
          onClick={onAdd}
          className="w-6 h-6 cursor-pointer"
        />
      </div>
      {Object.keys(schema)
        .filter((s) => !schema[s].parentId && schema[s] !== undefined)
        .map((s, i) => (
          <React.Fragment key={s}>
            <div className="col-start-1">{i + 1}.</div>
            <Field
              nameOfField={schema[s].name}
              typeOfField={schema[s].type}
              key={s}
              changeType={changeType}
              id={s}
              parentId={s}
              schemaData={schema}
              addFieldInObject={addFieldInObject}
              deleteField={deleteField}
              updateField={updateField}
            />
          </React.Fragment>
        ))}
      <br />
      <button
        className="px-6 py-3 mt-4  text-gray-600 w-fit m-auto bg-[#c6c7c9] rounded-md hover:bg-gray-200 hover:text-gray-800"
        onClick={() => console.log(parseData(schema))
        }
      >
        Parse
      </button>
    </div>
  );
};

export default Fields;

import { useEffect, useState } from "react";
import useField from "../contexts/FieldContext";
import { Switch } from "@radix-ui/themes";
import { Pencil, PlusCircle, Save } from "lucide-react";
import useRadio from "../contexts/RadioContext";

const TempComp = ({ selectedField, setSelectedField, setFieldAdded }) => {
  const [userInput, setUserInput] = useState("");
  const [radioFieldInput, setRadioFieldInput] = useState("");
  const [checkboxFieldInput, setCheckboxFieldInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [showRadioField, setShowRadioField] = useState(true);
  const [showCheckboxField, setShowCheckboxField] = useState(true);

  const { fields, setFields } = useField();
  const { radioFields, setRadioFields } = useRadio();
  const [checkboxFields, setCheckboxFields] = useState([]);

  const addField = (selectedField) => {
    setFields((prev) => [
      ...prev,
      selectedField === "Radio"
        ? {
            id: Date.now(),
            fieldType: selectedField.toLowerCase(),
            fieldQuestion: userInput,
            required: checked,
            radioValues: radioFields,
          }
        : selectedField === "Checkbox"
        ? {
            id: Date.now(),
            fieldType: selectedField.toLowerCase(),
            fieldQuestion: userInput,
            required: checked,
            checkboxValues: checkboxFields,
          }
        : {
            id: Date.now(),
            fieldType: selectedField.toLowerCase(),
            fieldQuestion: userInput,
            required: checked,
          },
    ]);

    // reset all states
    setFieldAdded(false);
    setUserInput("");
    setRadioFields([]);
    setCheckboxFields([]);
    setRadioFieldInput("");
    setCheckboxFieldInput("");
    setEditingId(null);
    setEditInput("");
    setShowRadioField(true);
    setShowCheckboxField(true);
  };

  const handleRadioAdd = () => {
    if (!radioFieldInput) return;
    setRadioFields((prev) => [
      ...prev,
      { id: Date.now(), radioValue: radioFieldInput },
    ]);
    setRadioFieldInput("");
  };

  const handleCheckboxAdd = () => {
    if (!checkboxFieldInput) return;
    setCheckboxFields((prev) => [
      ...prev,
      { id: Date.now(), checkboxValue: checkboxFieldInput },
    ]);
    setCheckboxFieldInput("");
  };

  const handleRadioSave = (id) => {
    setRadioFields((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, radioValue: editInput } : item
      )
    );
    setEditingId(null);
    setEditInput("");
  };

  const handleCheckboxSave = (id) => {
    setCheckboxFields((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checkboxValue: editInput } : item
      )
    );
    setEditingId(null);
    setEditInput("");
  };

  useEffect(() => {
    console.log("RadioFields", radioFields);
    console.log("CheckboxFields", checkboxFields);
  }, [radioFields, checkboxFields]);

  return (
    <div className="bg-emerald-600 rounded-2xl shadow-2xl px-3 py-3">
      <div className="flex flex-col justify-evenly gap-3">
        <div className="flex flex-col gap-3">
          <div className="w-full flex gap-5">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-[70%] px-2 py-2 bg-gray-700 text-white text-md border-transparent outline-none rounded focus:ring-2 focus:ring-indigo-50 transition-all duration-200"
              placeholder={`Enter ${selectedField} Description`}
              onKeyDown={(e) => {
                e.key === "Enter" && userInput && addField(selectedField);
              }}
            />
            <div className="flex gap-2 items-center ">
              <p className="text-gray-900 font-mono text-lg">Required</p>
              <Switch
                color="red"
                onCheckedChange={(checked) => setChecked(checked)}
              />
            </div>
          </div>

          {selectedField === "Radio" && (
            <div className="w-full bg-teal-800 px-3 py-2 rounded flex flex-col gap-3">
              <p className="text-zinc-200">Add Radio Button Values</p>
              <div className="flex flex-col gap-3 items-center justify-center">
                {radioFields.map((radio) => (
                  <div key={radio.id} className="flex gap-3 items-center w-full">
                    <input
                      type="text"
                      className="w-[70%] px-2 py-1 bg-gray-700 text-white text-md border-transparent outline-none rounded transition-all duration-200"
                      value={
                        editingId === radio.id ? editInput : radio.radioValue
                      }
                      onChange={(e) => setEditInput(e.target.value)}
                      readOnly={editingId !== radio.id}
                    />
                    {editingId === radio.id ? (
                      <Save
                        color="white"
                        onClick={() => handleRadioSave(radio.id)}
                        className="hover:scale-110 duration-200 cursor-pointer"
                      />
                    ) : (
                      <Pencil
                        color="white"
                        onClick={() => {
                          setEditingId(radio.id);
                          setEditInput(radio.radioValue);
                        }}
                        className="hover:scale-110 duration-200 cursor-pointer"
                      />
                    )}
                    {!editingId && (
                      <PlusCircle
                        color="white"
                        onClick={() => setShowRadioField(true)}
                        className="hover:scale-110 duration-200 cursor-pointer"
                      />
                    )}
                  </div>
                ))}

                {showRadioField && (
                  <div className="flex gap-3 items-center justify-center w-full">
                    <input
                      type="text"
                      value={radioFieldInput}
                      onChange={(e) => setRadioFieldInput(e.target.value)}
                      className="w-full px-2 py-1 bg-gray-700 text-white text-md border-transparent outline-none rounded focus:ring-2 focus:ring-indigo-50 transition-all duration-200"
                      placeholder="Enter Value"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRadioAdd();
                      }}
                    />
                    <Save
                      color="white"
                      className={`hover:scale-110 duration-200 ${
                        !radioFieldInput
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        if (radioFieldInput) {
                          handleRadioAdd();
                          setShowRadioField(false);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedField === "Checkbox" && (
            <div className="w-full bg-purple-800 px-3 py-2 rounded flex flex-col gap-3">
              <p className="text-zinc-200">Add Checkbox Options</p>
              <div className="flex flex-col gap-3 items-center justify-center">
                {checkboxFields.map((checkbox) => (
                  <div
                    key={checkbox.id}
                    className="flex gap-3 items-center w-full"
                  >
                    <input
                      type="text"
                      className="w-[70%] px-2 py-1 bg-gray-700 text-white text-md border-transparent outline-none rounded transition-all duration-200"
                      value={
                        editingId === checkbox.id
                          ? editInput
                          : checkbox.checkboxValue
                      }
                      onChange={(e) => setEditInput(e.target.value)}
                      readOnly={editingId !== checkbox.id}
                    />
                    {editingId === checkbox.id ? (
                      <Save
                        color="white"
                        onClick={() => handleCheckboxSave(checkbox.id)}
                        className="hover:scale-110 duration-200 cursor-pointer"
                      />
                    ) : (
                      <Pencil
                        color="white"
                        onClick={() => {
                          setEditingId(checkbox.id);
                          setEditInput(checkbox.checkboxValue);
                        }}
                        className="hover:scale-110 duration-200 cursor-pointer"
                      />
                    )}
                    {!editingId && (
                      <PlusCircle
                        color="white"
                        onClick={() => setShowCheckboxField(true)}
                        className="hover:scale-110 duration-200 cursor-pointer"
                      />
                    )}
                  </div>
                ))}

                {showCheckboxField && (
                  <div className="flex gap-3 items-center justify-center w-full">
                    <input
                      type="text"
                      value={checkboxFieldInput}
                      onChange={(e) => setCheckboxFieldInput(e.target.value)}
                      className="w-full px-2 py-1 bg-gray-700 text-white text-md border-transparent outline-none rounded focus:ring-2 focus:ring-indigo-50 transition-all duration-200"
                      placeholder="Enter Value"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCheckboxAdd();
                      }}
                    />
                    <Save
                      color="white"
                      className={`hover:scale-110 duration-200 ${
                        !checkboxFieldInput
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                      onClick={() => {
                        if (checkboxFieldInput) {
                          handleCheckboxAdd();
                          setShowCheckboxField(false);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          className="bg-black disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-3 rounded-xl text-md text-white hover:bg-gray-800 cursor-pointer"
          onClick={() => {
            addField(selectedField);
            setSelectedField(null);
          }}
          disabled={
            !userInput ||
            (selectedField === "Radio" && radioFields.length === 0) ||
            (selectedField === "Checkbox" && checkboxFields.length === 0)
          }
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TempComp;

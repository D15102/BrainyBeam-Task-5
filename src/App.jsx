import { DropdownMenu, Button } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import TempComp from "./components/TempComp";
import { FieldProvider } from "./contexts/FieldContext.js";
import FieldList from "./components/FieldList.jsx";
import { RadioProvider } from "./contexts/RadioContext.js";
const App = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [fieldAdded, setFieldAdded] = useState(false);
  const [fields, setFields] = useState([]);
  const [radioFields, setRadioFields] = useState([]);
  useEffect(() => {
    console.log(fields);
  }, [fields]);
  return (
    <FieldProvider value={{ fields, setFields }}>
      <RadioProvider value={{ radioFields, setRadioFields }}>
        <div className="w-full min-h-screen bg-gray-800 py-6 px-10 flex flex-col gap-5">
          <div className="w-full bg-gray-700 rounded-xl shadow-2xl px-3 py-4 flex flex-col items-center gap-4">
            <h1 className="text-3xl text-lime-400 hover:scale-110 transition-all duration-300 cursor-pointer">
              Dynamic Form
            </h1>
            <div className="flex gap-3">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Button variant="solid" className="" color="white">
                    {selectedField ? selectedField : "Choose Field"}
                    <DropdownMenu.TriggerIcon />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Text
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Password
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Email
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Number
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Date
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    File
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Checkbox
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Radio
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Range
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    shortcut=""
                    onClick={(e) => setSelectedField(e.currentTarget.innerText)}
                  >
                    Color
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
              {selectedField && (
                <Button
                  variant="solid"
                  style={{
                    backgroundColor: "green",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    setFieldAdded(true);
                  }}
                >
                  Add Field
                </Button>
              )}
              {fieldAdded && (
                <TempComp
                  selectedField={selectedField}
                  setSelectedField={setSelectedField}
                  setFieldAdded={setFieldAdded}
                />
              )}
            </div>
          </div>
          {Array.isArray(fields) && fields.length > 0 && <FieldList />}
        </div>
      </RadioProvider>
    </FieldProvider>
  );
};

export default App;

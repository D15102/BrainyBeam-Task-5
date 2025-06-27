import { HoverCard, Box, Text, Checkbox } from "@radix-ui/themes";
import useField from "../contexts/FieldContext";
import styled from "styled-components";
import { XCircle } from "lucide-react";

const FieldList = () => {
  const { fields,setFields } = useField();

  const handleDelteField = (id)=>{
    setFields(prev => prev.filter(item => (
      item.id !== id 
    )))
  }

  return (
    <div className="w-full bg-gray-700 rounded-xl shadow-2xl px-3 py-4 flex flex-col items-center gap-4">
      <h1 className="text-3xl text-lime-400 hover:scale-110 transition-all duration-300 cursor-pointer">
        Fields List
      </h1>

      <div className="w-full flex flex-col items-center">
        <div className="w-full bg-lime-200 py-2 px-3 rounded shadow-sm shadow-lime-200">
          {fields
            .filter((field) => field.id !== 1)
            .map((field) => (
              <div key={field.id} className="w-full group relative mb-5">
                {/* Cross button */}
                <button className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700">
                  <XCircle size={25}
                  onClick={e =>handleDelteField(field.id)}
                  />
                </button>

                {/* Field Label & Required Asterisk */}
                <div className="flex gap-1 items-center">
                  <p className="text-2xl font-medium mb-2">
                    {field.fieldQuestion}
                  </p>
                  {field.required && (
                    <HoverCard.Root>
                      <HoverCard.Trigger>
                        <p className="text-red-600 text-3xl select-none">*</p>
                      </HoverCard.Trigger>
                      <HoverCard.Content>
                        <Box>
                          <Text as="div" size="2">
                            This Is Required Field
                          </Text>
                        </Box>
                      </HoverCard.Content>
                    </HoverCard.Root>
                  )}
                </div>

                {/* Field Types */}
                {field.fieldType === "range" ? (
                  <StyledWrapper className="flex gap-4 items-center">
                    <label className="slider mb-3">
                      <input type="range" className="level" />
                      <svg className="volume" viewBox="0 0 24 24">
                        <g>
                          <path
                            d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
                            fill="currentColor"
                          />
                          <path
                            d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </label>
                  </StyledWrapper>
                ) : field.fieldType === "radio" ? (
                  field.radioValues.map((radio) => (
                    <div key={radio.id} className="flex flex-col mb-4">
                      <StyledWrapper>
                        <div className="radio-group">
                          <label className="liquid-radio">
                            <input
                              type="radio"
                              name={`radio-${field.id}`}
                              defaultValue={radio.radioValue}
                            />
                            <span className="radio-visual" />
                            <span className="radio-label">
                              {radio.radioValue}
                            </span>
                          </label>
                        </div>
                      </StyledWrapper>
                    </div>
                  ))
                ) : field.fieldType === "file" ? (
                  <StyledWrapper>
                    <div>
                      <label htmlFor="file" className="labelFile">
                        <svg
                          viewBox="0 0 184.69 184.69"
                          width="60px"
                          height="60px"
                        >
                          <g>
                            <path
                              d="M149.968,50.186c-8.017-14.308-23.796-22.515-40.717-19.813..."
                              fill="#010002"
                            />
                          </g>
                          <g>
                            <path
                              d="M108.586,90.201c1.406-1.403,1.406-3.672,0-5.075L88.541..."
                              fill="#010002"
                            />
                          </g>
                        </svg>
                        <p>
                          drag and drop your file here or click to select a
                          file!
                        </p>
                      </label>
                      <input className="input" id="file" type="file" />
                    </div>
                  </StyledWrapper>
                ) : field.fieldType === "date" ? (
                  <StyledWrapper>
                    <input
                      placeholder="Select date"
                      className="date"
                      type="date"
                    />
                  </StyledWrapper>
                ) : field.fieldType === "checkbox" ? (
                  field.checkboxValues.map((checkbox) => (
                    <div key={checkbox.id} className="flex gap-2 items-center">
                      <Checkbox size="3" color="red" />
                      {checkbox.checkboxValue}
                    </div>
                  ))
                ) : (
                  <input
                    type={field.fieldType}
                    className={`text-lg mb-3 font-mono py-1 px-2 bg-transparent transition-all duration-100
                      ${
                        field.fieldType === "text" ||
                        field.fieldType === "password" ||
                        field.fieldType === "email" ||
                        field.fieldType === "number"
                          ? `focus:border-b-3 border-red-400 focus:outline-none`
                          : ``
                      }
                      ${
                        field.fieldType === "color" ||
                        field.fieldType === "date" ||
                        field.fieldType === "range" ||
                        field.fieldType === "file"
                          ? ``
                          : `w-full`
                      }
                    `}
                    placeholder="Enter Your Response.."
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  /* level settings 👇 */

  .slider {
    /* slider */
    --slider-width: 100%;
    --slider-height: 6px;
    --slider-bg: #fff;
    --slider-border-radius: 999px;
    /* level */
    --level-color: red;
    --level-transition-duration: 0.1s;
    /* icon */
    --icon-margin: 15px;
    --icon-color: var(--slider-bg);
    --icon-size: 25px;
  }

  .slider {
    cursor: pointer;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .slider .volume {
    display: none;
    vertical-align: top;
    margin-right: var(--icon-margin);
    color: var(--icon-color);
    width: var(--icon-size);
    height: auto;
  }

  .slider .level {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: var(--slider-width);
    height: var(--slider-height);
    background: var(--slider-bg);
    overflow: hidden;
    border-radius: var(--slider-border-radius);
    -webkit-transition: height var(--level-transition-duration);
    -o-transition: height var(--level-transition-duration);
    transition: height var(--level-transition-duration);
    cursor: inherit;
  }

  .slider .level::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    -webkit-box-shadow: -200px 0 0 200px var(--level-color);
    box-shadow: -200px 0 0 200px var(--level-color);
  }

  .slider:hover .level {
    height: calc(var(--slider-height) * 2);
  }
  .lgc-radio-wrapper {
    margin: 0;
    padding: 2rem;
    font-family: system-ui, -apple-system, sans-serif;
    background: #f8f9fa;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    min-height: 100%;
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .liquid-radio {
    --primary-hue: 280;
    --secondary-hue: 320;
    --tertiary-hue: 200;
    --saturation: 45%;
    --lightness: 85%;
    --border-radius: 2em;
    --transition-duration: 0.4s;
    --scale-factor: 1;

    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;
    user-select: none;
    transition: all var(--transition-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform-style: preserve-3d;
    perspective: 1000px;
  }

  .liquid-radio:hover {
    --scale-factor: 1.03;
    transform: scale(var(--scale-factor)) translateZ(5px);
  }

  .liquid-radio input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .liquid-radio .radio-visual {
    position: relative;
    width: 1.5em;
    height: 1.5em;
    margin-right: 0.75em;
    border-radius: var(--border-radius);
    background: linear-gradient(
      135deg,
      hsl(var(--primary-hue), var(--saturation), var(--lightness)),
      hsl(var(--secondary-hue), var(--saturation), var(--lightness)),
      hsl(var(--tertiary-hue), var(--saturation), var(--lightness))
    );
    border: 0.125em solid
      hsla(
        var(--primary-hue),
        var(--saturation),
        calc(var(--lightness) - 20%),
        0.4
      );
    transition: all var(--transition-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 0.25em 0.5em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 40%),
          0.15
        ),
      0 0.125em 0.25em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 30%),
          0.2
        ),
      0 0.0625em 0.125em hsla(0, 0%, 0%, 0.1),
      inset 0 0.125em 0.25em hsla(0, 0%, 100%, 0.6),
      inset 0 -0.0625em 0.125em hsla(var(--primary-hue), var(--saturation), calc(var(
                --lightness
              ) - 15%), 0.3);
    transform-style: preserve-3d;
  }

  .liquid-radio .radio-visual::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      hsl(
        var(--primary-hue),
        calc(var(--saturation) + 25%),
        calc(var(--lightness) - 25%)
      ),
      hsl(
        var(--secondary-hue),
        calc(var(--saturation) + 20%),
        calc(var(--lightness) - 35%)
      ),
      hsl(
        var(--primary-hue),
        calc(var(--saturation) + 15%),
        calc(var(--lightness) - 45%)
      )
    );
    transform: translate(-50%, -50%) scale(0) translateZ(2px);
    transition: all var(--transition-duration)
      cubic-bezier(0.68, -0.25, 0.265, 1.25);
    opacity: 0;
    box-shadow: 0 0.0625em 0.125em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 50%),
          0.4
        ),
      inset 0 0.0312em 0.0625em hsla(0, 0%, 100%, 0.4);
  }

  .liquid-radio .radio-visual::after {
    content: "";
    position: absolute;
    top: -0.1875em;
    left: -0.1875em;
    right: -0.1875em;
    bottom: -0.1875em;
    border-radius: calc(var(--border-radius) + 0.0625em);
    background: radial-gradient(
      ellipse at top left,
      hsla(var(--primary-hue), var(--saturation), var(--lightness), 0.6),
      hsla(var(--secondary-hue), var(--saturation), var(--lightness), 0.4),
      hsla(var(--tertiary-hue), var(--saturation), var(--lightness), 0.2)
    );
    opacity: 0;
    transition: all var(--transition-duration)
      cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: -1;
    filter: blur(0.125em);
  }

  .liquid-radio:hover .radio-visual {
    --saturation: 55%;
    --lightness: 88%;
    transform: translateY(-0.125em) rotateX(5deg) translateZ(3px);
    box-shadow: 0 0.5em 1em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 40%),
          0.2
        ),
      0 0.25em 0.5em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 30%),
          0.25
        ),
      0 0.125em 0.25em hsla(0, 0%, 0%, 0.15),
      inset 0 0.1875em 0.375em hsla(0, 0%, 100%, 0.7),
      inset 0 -0.0625em 0.125em hsla(var(--primary-hue), var(--saturation), calc(var(
                --lightness
              ) - 15%), 0.4);
  }

  .liquid-radio:hover .radio-visual::after {
    opacity: 1;
    transform: translateZ(-1px) scale(1.1);
  }

  .liquid-radio input[type="radio"]:focus + .radio-visual {
    outline: 0.125em solid
      hsl(var(--primary-hue), var(--saturation), calc(var(--lightness) - 40%));
    outline-offset: 0.125em;
  }

  .liquid-radio input[type="radio"]:checked + .radio-visual {
    --saturation: 65%;
    --lightness: 80%;
    background: radial-gradient(
      ellipse at top left,
      hsl(var(--primary-hue), var(--saturation), calc(var(--lightness) + 5%)),
      hsl(var(--secondary-hue), var(--saturation), var(--lightness)),
      hsl(var(--tertiary-hue), var(--saturation), calc(var(--lightness) - 5%))
    );
    border-color: hsl(
      var(--primary-hue),
      calc(var(--saturation) + 10%),
      calc(var(--lightness) - 30%)
    );
    box-shadow: 0 0.375em 0.75em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 40%),
          0.25
        ),
      0 0.1875em 0.375em
        hsla(
          var(--primary-hue),
          var(--saturation),
          calc(var(--lightness) - 30%),
          0.3
        ),
      0 0.0625em 0.125em hsla(0, 0%, 0%, 0.2),
      inset 0 0.1875em 0.375em hsla(0, 0%, 100%, 0.8),
      inset 0 -0.0625em 0.1875em hsla(var(--primary-hue), var(--saturation), calc(var(
                --lightness
              ) - 20%), 0.4);
    transform: translateZ(2px);
  }

  .liquid-radio input[type="radio"]:checked + .radio-visual::before {
    transform: translate(-50%, -50%) scale(1) translateZ(2px);
    opacity: 1;
    animation: pulseGlow 2s ease-in-out infinite;
  }

  .liquid-radio input[type="radio"]:active + .radio-visual {
    transform: scale(0.96) translateY(0.0625em) rotateX(-2deg);
    transition: all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @keyframes pulseGlow {
    0%,
    100% {
      box-shadow: 0 0.0625em 0.125em
          hsla(
            var(--primary-hue),
            var(--saturation),
            calc(var(--lightness) - 50%),
            0.4
          ),
        inset 0 0.0312em 0.0625em hsla(0, 0%, 100%, 0.4);
    }
    50% {
      box-shadow: 0 0.0625em 0.1875em
          hsla(
            var(--primary-hue),
            var(--saturation),
            calc(var(--lightness) - 50%),
            0.6
          ),
        0 0 0.25em
          hsla(
            var(--primary-hue),
            calc(var(--saturation) + 20%),
            calc(var(--lightness) - 30%),
            0.3
          ),
        inset 0 0.0312em 0.0625em hsla(0, 0%, 100%, 0.6);
    }
  }

  .liquid-radio .radio-label {
    color: hsl(var(--primary-hue), 25%, 45%);
    font-weight: 500;
    transition: color var(--transition-duration) ease;
  }

  .liquid-radio:hover .radio-label {
    color: hsl(var(--primary-hue), 35%, 35%);
  }

  .liquid-radio input[type="radio"]:checked ~ .radio-label {
    color: hsl(var(--primary-hue), 40%, 30%);
  }

  /* Variant colors */
  .liquid-radio.variant-coral {
    --primary-hue: 15;
    --secondary-hue: 45;
    --tertiary-hue: 340;
  }

  .liquid-radio.variant-mint {
    --primary-hue: 150;
    --secondary-hue: 180;
    --tertiary-hue: 120;
  }

  .liquid-radio.variant-sky {
    --primary-hue: 200;
    --secondary-hue: 220;
    --tertiary-hue: 260;
  }
  .input {
    max-width: 190px;
    display: none;
  }

  .labelFile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 250px;
    height: 190px;
    border: 2px dashed #ccc;
    align-items: center;
    text-align: center;
    padding: 5px;
    color: #404040;
    cursor: pointer;
  }
  .input {
    border: 2px solid transparent;
    width: 15em;
    height: 2.5em;
    padding-left: 0.8em;
    outline: none;
    overflow: hidden;
    background-color: #f3f3f3;
    border-radius: 10px;
    transition: all 0.5s;
  }

  .date:hover,
  .date:focus {
    border: 2px solid #4a9dec;
    box-shadow: 0px 0px 0px 7px rgb(74, 157, 236, 20%);
    background-color: white;
  }
  .date {
    background-color: white;
  }
`;

export default FieldList;

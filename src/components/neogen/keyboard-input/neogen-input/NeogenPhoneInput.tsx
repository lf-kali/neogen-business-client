import { useState } from "react"
import ReactInputMask from "react-input-mask"

function NeogenPhoneInput() {
  const [displayPhone, setDisplayPhone] = useState("");
  const [rawPhone, setRawPhone] = useState("");

  const onlyNumbers = (value: string) => value.replace(/\D/g, "");

  const getMask = (value: string) => {
    const numbers = onlyNumbers(value);
    if (numbers.length > 10) {
        return "(99) 99999-9999";
    }

    return "(99) 9999-9999";
  }
  return (
    <ReactInputMask
      mask={"(99) 9999"}
    >
    </ReactInputMask>
  )
}

export default NeogenPhoneInput
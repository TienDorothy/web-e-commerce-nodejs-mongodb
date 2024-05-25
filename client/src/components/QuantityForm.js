import React, {  useState } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

const QuantityForm = (props) => {
  // get id product
  const [input, setInput] = useState(parseInt(props.inputForm) || 1);
  
  const decrementHandler = () => {
    if (input > 1) {
      setInput((pre) => pre - 1);
    }
  };
  const incrementHandler = () => {
    setInput((pre) => pre + 1);
  };

  //   passing data from child to parent
  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit(input);
  };

  return (
    <>
      <form action="" onSubmit={submitHandler}>
        <div className="input flex flex-nowrap">
          <button onClick={decrementHandler}>
            <GoTriangleLeft />
          </button>
          <input
            type="number"
            className="border-none focus:border-none text-center w-[50px]"
            onChange={(e) => setInput(parseInt(e.target.value))}
            disabled
            value={input}
          />
          <button onClick={incrementHandler}>
            <GoTriangleRight />
          </button>
        </div>
      </form>
    </>
  );
};

export default QuantityForm;

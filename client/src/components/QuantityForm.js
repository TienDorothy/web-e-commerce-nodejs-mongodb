import React, { useState } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

const QuantityForm = (props) => {
  // get id product
  const inputForm =
    parseInt(props.inputForm) > props.stock
      ? props.stock
      : parseInt(props.inputForm);

  const [input, setInput] = useState(inputForm || 1);

  const decrementHandler = () => {
    if (input > 1) {
      setInput((pre) => pre - 1);
    }
  };
  const incrementHandler = () => {
    if (input < props.stock) {
      setInput((pre) => pre + 1);
    } else alert(`The product is only available in ${props.stock} units`);
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

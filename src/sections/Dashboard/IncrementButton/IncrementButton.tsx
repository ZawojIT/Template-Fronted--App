import { useState } from "react";

// ! This is a component that is used only on Dashboard module, so it is inside Dashboard folder. Have sperate state logic and do not re-render the page
const IncrementButton = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      <p>{state}</p>
      <button onClick={() => setState(state + 1)}>Increment</button>
    </div>
  );
};

export default IncrementButton;

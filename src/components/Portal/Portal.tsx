import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactElement;
  target?: string;
};

const Portal = ({ children, target }: Props) => {
  const [root, setRoot] = useState<Element>();
  useEffect(() => {
    if (target) {
      const targetRoot = document.querySelector(`#${target}`);
      setRoot(targetRoot ? targetRoot : document.body);
      return;
    }
    const baseRoot = document.createElement("div");
    document.body.appendChild(baseRoot);
    setRoot(baseRoot);

    return () => {
      if (root) document.body.removeChild(root);
    };
  }, []);

  return createPortal(children, root || document.body);
};

export default Portal;
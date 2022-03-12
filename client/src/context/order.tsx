import { createContext, useState, useContext } from "react";

interface IOrder {
  color: string;
  size: string;
  quantity: number;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  handleQuantity: (operator: "+" | "-") => void;
  handleSize: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const OrderContext = createContext({} as IOrder);

type OrderProps = {
  children: React.ReactNode;
};

const OrderContextProvider: any = ({ children }: OrderProps) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleQuantity = (operator: "+" | "-") => {
    if (operator === "+") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value);
    // change color to empty when size changes
    setColor("");
  };

  return (
    <OrderContext.Provider
      value={{
        color,
        size,
        quantity,
        handleQuantity,
        handleSize,
        setColor,
        setSize,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderData = () => {
  return useContext(OrderContext);
};

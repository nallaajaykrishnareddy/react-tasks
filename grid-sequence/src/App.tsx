import { useCallback, useEffect, useState } from "react";

type GridItems = {
  sequence: number;
  clicked: boolean;
};

function App() {
  const [griditems, setGridItems] = useState<GridItems[]>(
    Array.from({ length: 9 }, (_, index) => ({
      sequence: index,
      clicked: false,
    }))
  );

  const [order, setOrder] = useState<number[]>([]);

  const handleClick = useCallback((seq: number) => {
    setGridItems((prevGridItems) => {
      return prevGridItems.map((gridItem) => {
        return seq === gridItem.sequence
          ? {
              ...gridItem,
              clicked: !gridItem.clicked,
            }
          : gridItem;
      });
    });
    setOrder((prevOrder) =>
      prevOrder.includes(seq) ? prevOrder : [...prevOrder, seq]
    );
  }, []);

  useEffect(() => {
    if (order.length === 0) return;

    const timer = setTimeout(() => {
      setOrder((prevOrder) => {
        const [first, ...rest] = prevOrder;
        setGridItems((prevGridItems) => {
          return prevGridItems.map((gridItem) => {
            return first === gridItem.sequence
              ? {
                  ...gridItem,
                  clicked: false,
                }
              : gridItem;
          });
        });
        return rest;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [order]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 100px 100px",
        gap: "50px",
      }}
    >
      {griditems.map(({ sequence, clicked }) => {
        return sequence !== 4 ? (
          <div
            style={{
              border: "1px solid gray",
              width: "100px",
              height: "100px",
              cursor: "pointer",
              backgroundColor: clicked ? "green" : "white",
            }}
            key={sequence}
            onClick={() => handleClick(sequence)}
          ></div>
        ) : (
          <div key={sequence}></div>
        );
      })}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import { Spin, Empty } from "antd";
import { Link } from "react-router-dom";

export default function NotFound() {
  const [counter, setCounter] = useState(2);
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        {counter === 0 ? (
          <>
            <Link to="/">
              <Empty description="" />
            </Link>
          </>
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
}

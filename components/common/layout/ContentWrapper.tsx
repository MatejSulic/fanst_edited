import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <div className="max-w-7xl mx-auto max-h-screen h-screen">
      <div className="p-8 space-y-8 max-h-full h-full overflow-y-hidden">
        {children}
      </div>
    </div>
  );
};

export default ContentWrapper;

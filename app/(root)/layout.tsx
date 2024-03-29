import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <div className="">
        <div className="wrapper"> {children} </div>
      </div>
    </main>
  );
};

export default Layout;

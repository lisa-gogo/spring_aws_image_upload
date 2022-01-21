import React from 'react';

const Loading = () => {
  return(
      <div>
          <div>
            Connecting to database .......
          </div>;
          <img src='../../public/load.gif' alt='wait'></img>
      </div>
  ) 
};

export default Loading;

import React from 'react';

type Props = {};

const ErrorPage = (props: Props) => {
   return (
      <div style={{ minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         Em bi rate limit hoac la khong ton tai api nay roi :(((
      </div>
   );
};

export default ErrorPage;

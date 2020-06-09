import React, { useRef, useState, useEffect } from 'react';
import Image from 'react-image';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FormattedMessage } from 'react-intl';

type ErrorProps = {
  message: string;
};

const Error: React.FC<ErrorProps> = ({
    message,
}) => {

  return (
    <div style={{padding: "15px", backgroundColor: "#ffa4a2", borderRadius: "15px", color: "#af4448"}}>
        {message}
    </div>
  );
};

export default Error;

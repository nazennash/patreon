import React from 'react';

const TruncatedText = ({ text }) => {
    const maxLength = 18;
    const displayText = text.length > maxLength ? `${text.slice(0, maxLength)}` : text;

    return <span>{displayText}</span>;
};

export default TruncatedText;

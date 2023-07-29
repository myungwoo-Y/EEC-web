import React from 'react';

function ClassOrderOption() {
  const options = Array(10)
    .fill(null)
    .map((_, idx) => idx + 1);
  return (
    <>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}기
        </option>
      ))}
    </>
  );
}

export default ClassOrderOption;

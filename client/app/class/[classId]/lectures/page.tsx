import React from 'react'

interface LecturesProps {
  params: {
    classId: string;
  };
}

function Lectures({ params: { classId } }: LecturesProps) {
  return (
    <div>
      <div>Lectures</div>
      <div>{classId}</div>
    </div>
  );
}

export default Lectures

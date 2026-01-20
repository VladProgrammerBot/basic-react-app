import React from "react";

interface TypingCursorProps {
  isTyping: boolean;
}

export const TypingCursor: React.FC<TypingCursorProps> = ({ isTyping }) => {
  if (!isTyping) return null;
  
  return (
    <span className="inline-block w-2 h-5 ml-1 bg-blue-500 animate-pulse align-middle" />
  );
};
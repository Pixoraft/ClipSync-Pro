import { useState, useEffect } from "react";

interface TypingAnimationProps {
  texts: string[];
  className?: string;
}

export default function TypingAnimation({ texts, className = "" }: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(prev => prev - 1);
          setDisplayText(currentText.substring(0, currentCharIndex - 1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex(prev => (prev + 1) % texts.length);
        }
      } else {
        if (currentCharIndex < currentText.length) {
          setCurrentCharIndex(prev => prev + 1);
          setDisplayText(currentText.substring(0, currentCharIndex + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentTextIndex, currentCharIndex, isDeleting, texts]);

  return (
    <div className={`typing-text text-glow font-mono ${className}`}>
      {displayText}
      <span className="cursor-animation"></span>
    </div>
  );
}

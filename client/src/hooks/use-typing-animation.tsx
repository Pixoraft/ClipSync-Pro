import { useState, useEffect } from "react";

export function useTypingAnimation(texts: string[], speed: number = 100) {
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
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [currentTextIndex, currentCharIndex, isDeleting, texts, speed]);

  return displayText;
}

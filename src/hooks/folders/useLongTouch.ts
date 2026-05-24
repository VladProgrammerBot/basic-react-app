import { useRef } from "react";

export const useLongTouch = (func: () => void) => {
    const longTouchTimer = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        longTouchTimer.current = window.setTimeout(() => {
          e.preventDefault();
          func();
        }, 300);
      };
    
      const handleTouchEnd = () => {
        if (longTouchTimer.current) {
          clearTimeout(longTouchTimer.current);
          longTouchTimer.current = null;
        }
      };
    
      const handleTouchMove = () => {
        if (longTouchTimer.current) {
          clearTimeout(longTouchTimer.current);
          longTouchTimer.current = null;
        }
      };

      const longTouchTrigger = {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchMove: handleTouchMove,
      };

      return {
        handleTouchStart,
        handleTouchEnd,
        handleTouchMove,
        longTouchTrigger
      };
}
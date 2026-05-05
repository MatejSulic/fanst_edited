// components/KeyPressHandler.tsx
import { useEffect } from 'react';

interface KeyPressHandlerProps {
  leftKeyFunction: () => void;
  rightKeyFunction: () => void;
}

function KeyPressHandler({ leftKeyFunction, rightKeyFunction }: KeyPressHandlerProps) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
        switch (event.key) {
            case 'a':
                leftKeyFunction();
                break;
            case 'l':
                rightKeyFunction();
                break;
        }
    }

    // Připojení události 'keydown' na celý dokument
    document.addEventListener('keydown', handleKeyPress);

    // Odebrání události po odmontování komponenty
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [leftKeyFunction, rightKeyFunction]);

  return null; // Tato komponenta nemusí renderovat žádný obsah
}

export default KeyPressHandler;

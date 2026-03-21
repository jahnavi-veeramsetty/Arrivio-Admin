import { useEffect, useState, useRef } from 'react';

const introMessages = [
  "You do know what you’re doing… right?",
  "Even the server gets nervous when you log in.",
  "Confidence level: admin. Skill level: questionable.",
  "Bold of you to assume you know what you're doing.",
  "System was stable… then you logged in.",
  "I've seen toddlers with better impulse control.",
  "I'm not saying I'm scared, but I'm updating my will.",
  "I've had cats with better decision-making skills.",
  "You're the admin...then we really need better hiring standards",
  "The system is adapting… to survive you.",
  "Go ahead, press something. Let’s ruin the day properly.",
  "I'm just a simple AI, but you're making me question my existence.",
  "Did you even read the manual?"
];

const droppedMessages = [
  "Ouch! Put me down gently next time!",
  "Bro really picked me up like luggage",
  "This is why no one lets you near production.",
  "You drop things like you drop standards, mic drop!",
  "I'm starting to think you're doing this on purpose!",
  "You're not even good at being a villain!",
  "My back... Admin, please focus.",
  "Stop throwing the employees around!"
];

export default function WalkingAnimation() {
  const [isWalking, setIsWalking] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // Drag state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFallen, setIsFallen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const messageQueue = useRef([]);

  const getNextMessage = () => {
    if (messageQueue.current.length === 0) {
      // Refill and shuffle indices
      const indices = Array.from({ length: introMessages.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      messageQueue.current = indices;
    }
    return introMessages[messageQueue.current.pop()];
  };

  useEffect(() => {
    const walkTimer = setTimeout(() => {
      setIsWalking(false);
      setMessage(getNextMessage());
      setShowMessage(true);
    }, 4500);

    return () => clearTimeout(walkTimer);
  }, []);

  useEffect(() => {
    if (isWalking || isDragging || isFallen || isReturning) {
      return;
    }

    let hideTimer;
    let showTimer;

    const cycle = () => {
      const waitTime = Math.random() * 2000 + 3000;

      hideTimer = setTimeout(() => {
        setShowMessage(false);

        showTimer = setTimeout(() => {
          setMessage(getNextMessage());
          setShowMessage(true);
          cycle();
        }, 500);
      }, waitTime);
    };

    cycle();

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
    };
  }, [isWalking, isDragging, isFallen, isReturning]);

  const handlePointerDown = (e) => {
    if (isFallen || isReturning) return;

    e.preventDefault();
    setIsDragging(true);
    setShowMessage(false);

    const startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const initialPos = { ...position };

    const handlePointerMove = (eMove) => {
      const currentX = eMove.clientX || (eMove.touches && eMove.touches[0].clientX) || 0;
      const currentY = eMove.clientY || (eMove.touches && eMove.touches[0].clientY) || 0;
      setPosition({
        x: initialPos.x + (currentX - startX),
        y: initialPos.y + (currentY - startY)
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);

      triggerFallSequence();
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);
  };

  const triggerFallSequence = () => {
    // Drop him to the floor! The floor is approximately half the window height minus some padding for his own height.
    const floorY = (window.innerHeight / 2) - 150;

    setPosition(prev => ({ x: prev.x, y: Math.max(prev.y, floorY) }));
    setIsFallen(true);

    setTimeout(() => {
      // Stands up at the drop site
      setIsFallen(false);

      setTimeout(() => {
        // Flies back to home position
        setIsReturning(true);
        setPosition({ x: 0, y: 0 });

        setTimeout(() => {
          setIsReturning(false);
          setMessage(droppedMessages[Math.floor(Math.random() * droppedMessages.length)]);
          setShowMessage(true);
        }, 800); // 800ms flight time
      }, 600); // Wait standing for 600ms before flying home
    }, 1200); // Lying down time
  };

  const isActivelyWalking = isWalking || isReturning;
  const limbClass = "transition-transform duration-500 ease-out";

  const getStyle = (isActivelyWalking, runningClass, restTransform, origin) => {
    return {
      transformOrigin: origin,
      transform: isActivelyWalking ? '' : restTransform
    };
  };

  let containerTransform = `translate3d(${position.x}px, ${position.y}px, 0)`;
  if (isFallen) {
    containerTransform = `translate3d(${position.x}px, ${position.y}px, 0) rotate(90deg)`;
  }

  let containerTransition = 'none';
  if (!isDragging) {
    if (isFallen) {
      // Accelerating fall like real gravity
      containerTransition = 'transform 500ms cubic-bezier(0.5, 0, 1, 1)';
    } else if (isReturning) {
      // Decelerating flight home
      containerTransition = 'transform 800ms cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      // Snappy bounce parameter to stand up
      containerTransition = 'transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
  }

  const shadowOpacity = (!isActivelyWalking && !isDragging && position.x === 0 && position.y === 0) ? 'scale-100 opacity-100' : 'scale-[0.5] opacity-0';

  return (
    <div className="flex w-full flex-col items-center justify-center text-emerald-100/90 relative">
      <div className="relative">

        {showMessage && (
          <div className="absolute bottom-[90%] left-[50%] -translate-x-1/2 z-50 animate-slide-up select-none flex flex-col items-center pointer-events-none">
            <div className="relative bg-white text-[#0f4c3a] px-6 py-3.5 rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] text-[14px] font-semibold tracking-tight text-center max-w-[260px] w-max z-10 leading-snug">
              {message}
            </div>
            <div className="absolute -bottom-2.5 left-[45%] w-4 h-4 bg-white rounded-full shadow-sm z-0"></div>
            <div className="absolute -bottom-5 left-[42%] w-2.5 h-2.5 bg-white rounded-full shadow-sm z-0"></div>
          </div>
        )}

        <div className="relative flex flex-col items-center justify-center translate-y-12">

          <div
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            style={{
              transform: containerTransform,
              transition: containerTransition,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            className="flex flex-col items-center justify-center select-none"
          >
            {/* Stickman */}
            <svg className={`w-56 h-56 drop-shadow-lg ${isWalking ? 'anim-body-sway' : ''}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="18" r="9" />
              <line x1="50" y1="27" x2="50" y2="58" />
              <g strokeOpacity="0.4">
                <line x1="50" y1="36" x2="50" y2="60" className={`${limbClass} ${isActivelyWalking ? 'anim-arm-left' : ''}`} style={getStyle(isActivelyWalking, 'anim-arm-left', 'rotate(15deg)', '50px 36px')} />
                <line x1="50" y1="58" x2="50" y2="92" className={`${limbClass} ${isActivelyWalking ? 'anim-leg-left' : ''}`} style={getStyle(isActivelyWalking, 'anim-leg-left', 'rotate(12deg)', '50px 58px')} />
              </g>
              <g>
                <line x1="50" y1="36" x2="50" y2="60" className={`${limbClass} ${isActivelyWalking ? 'anim-arm-right' : ''}`} style={getStyle(isActivelyWalking, 'anim-arm-right', 'rotate(-15deg)', '50px 36px')} />
                <line x1="50" y1="58" x2="50" y2="92" className={`${limbClass} ${isActivelyWalking ? 'anim-leg-right' : ''}`} style={getStyle(isActivelyWalking, 'anim-leg-right', 'rotate(-12deg)', '50px 58px')} />
              </g>
            </svg>
          </div>

          {/* Ground shadow */}
          <div className={`absolute -bottom-2 w-24 h-2 bg-emerald-950/40 rounded-[100%] blur-[3px] transition-all duration-300 ease-out ${shadowOpacity} pointer-events-none`}></div>
        </div>

      </div>
    </div>
  );
}

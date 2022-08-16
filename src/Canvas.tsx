import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';

// Custom hook for window size
function useWindowSize() { 
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


const Canvas: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dim = useWindowSize();

    // Resize and redraw canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if(canvas){
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const ctx = canvas.getContext('2d');

          if(ctx){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "salmon";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "white";
            ctx.font = "50px sans-serif";
            ctx.fillText("Resize Me!", canvas.width / 2 - 100, canvas.height / 2, 200);
          }
        }
    }, [dim])

    return (
        <canvas id="responsive-canvas" ref={canvasRef} />
    );
}

export default Canvas;





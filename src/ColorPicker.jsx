import {useState, useRef} from 'react'
import Shuffle from './assets/shuffle.png'

// Helper function to throttle state updates
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};


function ColorPicker(){

    const [color1,setColor1] = useState("#000000");
    const [color2,setColor2] = useState("#FFFFFF");
    const [degree,setDegree] = useState(180);
    const [stop1,setStop1] = useState(0);
    const [stop2,setStop2] = useState(100);
    const [width,setWidth] = useState(400);
    const [height,setHeight] = useState(400);
    const [scale, setScale] = useState(2);

    const colorViewRef = useRef(null);

    const updateColor1 = (e)=> setColor1(e.target.value);
    const updateColor2 = (e)=> setColor2(e.target.value);

    // --- Original handler implementations moved to helper variables ---
    const setDegreeValue = (e)=> setDegree(e.target.value);
    const setStop1Value = (e) => setStop1(e.target.value);
    const setStop2Value = (e) => setStop2(100-e.target.value);
    // ---

    // --- Public functions now use throttle wrapper but retain original names ---
    const updateDegree = throttle(setDegreeValue, 50);
    const updateStop1 = throttle(setStop1Value, 50);
    const updateStop2 = throttle(setStop2Value, 50);
    // ---

    const updateRatio = (e)=> {
        const [widthx,heightx] = e.target.value.split(":");
        setWidth(Math.round(400*parseFloat(widthx)));
        setHeight(Math.round(400*parseFloat(heightx)));
    };

    const handleScaleChange = (e) => {
        const value = parseFloat(e.target.value); 
        if (e.type === 'blur' || (value >= 1 && value <= 20)) {
            setScale(value >= 20 ? 20 : value <= 0 || isNaN(value) ? 1 : value);
        } else {
            setScale(e.target.value); 
        }
    };
    
    const saveAsImage = async () => {
        const Html2Canvas = (await import('html2canvas')).default;

        if (colorViewRef.current) {
            Html2Canvas(colorViewRef.current, { 
                width, height, scale: scale, useCORS: true, backgroundColor: null, logging: false, removeContainer: true
            }).then(canvas => {
                const image = canvas.toDataURL("image/png");
                const link = document.createElement('a');
                link.href = image;
                link.download = `${color1}-${color2}-${degree}deg.png`;
                link.click();
            });
        }
    };

    const randomizeGradient = () => {
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const getRandomDegree = () => {
            return Math.floor(Math.random() * 360) + 1;
        };
        setColor1(getRandomColor());
        setColor2(getRandomColor());
        setDegree(getRandomDegree());
        setStop1(0);
        setStop2(100);
    };
    

    return(
        <>
        <div className='container'>
        <h1>Linear Gradient Generator</h1><br/>
        <div ref={colorViewRef} className="colorView" style={{background:`linear-gradient(${degree}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`, width:`${width}px` ,height:`${height}px`}}></div>
        <h4>{color1}, {color2}, {degree}deg, ({Math.round(width*scale)} x {Math.round(height*scale)})px</h4><br/>
            
        <div className='selectordiv'>
            <h4>Color 1:</h4>
            <input className='colorPicker' value={color1} onChange={updateColor1} type="color"/>
            <div className='gradientSlider' style={{background:`linear-gradient(${90}deg, white 0%, ${color1} 100%)`}}>
            <input onChange={updateStop1} value={stop1} type="range" min='0' max='49' step='1'/>
            </div>
        </div>

        <div className='selectordiv'>
            <h4>Color 2:</h4>
            <input className='colorPicker' value={color2} onChange={updateColor2} type="color"/>
            <div className='gradientSlider' style={{background:`linear-gradient(${90}deg, white 0%, ${color2} 100%)`}}>
            <input onChange={updateStop2} value={100-stop2} type="range" min='0' max='49' step='1'/>
        </div>

        </div>
        <div className='selectordiv'>
            <h4>Degree:</h4>
            <input className='number' min='1' max='360' type="number" value={degree} onChange={setDegreeValue} />
            <div className='gradientSlider'>
            <input onChange={updateDegree} value={degree} type="range" min='0' max='360' step='1'/>
            </div>
        </div>
        <br/>
        <div className='selectordiv'>
            <h4>Ratio:</h4>
        <select className='number number2' onChange={updateRatio} defaultValue="1:1">
            <option value="1:1">1:1</option>
            <option value="1:0.75">4:3</option>
            <option value="1:0.67">3:2</option>
            <option value="1:0.5625">16:9</option>
            <option value="0.5625:1">9:16</option>
            <option value="1:0.43">21:9</option>
        </select>
        <h4>Scale Multiplier:</h4>
        <input className='number number2' onChange={handleScaleChange} onBlur={handleScaleChange} min='2' max='20' step='1' value={scale} type="number"/>
        </div><br/>
        <div className='selectordiv'>
        <img onClick={randomizeGradient} src={Shuffle} alt="Shuffle" />
        <button onClick={saveAsImage}>Save</button>
        </div>
        </div>
        <br/>
        <footer><p>&copy; By Prashant Rana</p></footer>
        </>
    );
}

export default ColorPicker;

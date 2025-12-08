import React,{useState, useRef} from 'react'
import Html2Canvas from 'html2canvas'
import Shuffle from './assets/shuffle.png'

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

    const updateDegree = (e)=> setDegree(e.target.value);

    const updateStop1 = (e) => setStop1(e.target.value);
    const updateStop2 = (e) => setStop2(100-e.target.value);

    const updateRatio = (e)=> {
        const [widthx,heightx] = e.target.value.split(":");
        setWidth(Math.round(400*widthx));
        setHeight(Math.round(400*heightx));
    };

    const handleScaleChange = (e) => {
        const value = parseFloat(e.target.value); 
        // The logic runs either on change (while typing) or on blur (when focus leaves)
        if (e.type === 'blur' || (value >= 1 && value <= 20)) {
            setScale(value >= 20 ? 20 : value <= 0 || isNaN(value) ? 1 : value);
        } else {
            // Optional: allow typing outside bounds temporarily during change event
            setScale(e.target.value); 
        }
    };

    
    const saveAsImage = () => {//Ai generated function
        if (colorViewRef.current) {
            Html2Canvas(colorViewRef.current, { 
                width,      
                height, 
                scale: scale,               
                useCORS: true,
                backgroundColor: null,
                logging: false, 
                removeContainer: true // A common fix for weird edge artifacts
            }).then(canvas => {
                // Creates an image URL from the canvas data
                const image = canvas.toDataURL("image/png");
                // Create a temporary link element to trigger the download
                const link = document.createElement('a');
                link.href = image;
                link.download = `${color1}-${color2}-${degree}deg.png`; // Suggested filename
                link.click(); // Programmatically click the link to start download
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
        <div className='container'>
        <h1>Linear Gradient Generator</h1><br/>
        <div ref={colorViewRef} className="colorView" style={{background:`linear-gradient(${degree}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`, width:`${width}px` ,height:`${height}px`}}></div>
        <h4>{color1}, {color2}, {degree}deg, ({width*scale} x {height*scale})px</h4><br/>
            
        <div className='selectordiv'>
            <h4>Color 1:</h4>
            <input className='colorPicker' value={color1} onChange={updateColor1} type="color"/>
            <div className='gradientSlider' style={{background:`linear-gradient(${90}deg, white 0%, ${color1} ${stop2}%)`}}>
            <input onChange={updateStop1} value={stop1} type="range" min='0' max='49' step='1'/>
            </div>
        </div>

        <div className='selectordiv'>
            <h4>Color 2:</h4>
            <input className='colorPicker' value={color2} onChange={updateColor2} type="color"/>
            <div className='gradientSlider' style={{background:`linear-gradient(${90}deg, white 0%, ${color2} ${stop2}%)`}}>
            <input onChange={updateStop2} value={100-stop2} type="range" min='0' max='49' step='1'/>
        </div>

        </div>
        <div className='selectordiv'>
            <h4>Degree:</h4>
            <input className='number' min='1' max='360' type="number" value={degree} onChange={updateDegree} />
            <div className='gradientSlider'>
            <input className='gradientSlider' onChange={updateDegree} value={degree} type="range" min='0' max='360' step='1'/>
            </div>
        </div>
        <br/>
        <div className='selectordiv'>
            <h4>Ratio:</h4>
        <select className='number number2' onChange={updateRatio}>
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
    );
}

export default ColorPicker;

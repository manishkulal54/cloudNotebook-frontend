import React from 'react';
import {ParallaxBanner} from "react-scroll-parallax"

const ParallaxImg = (props) => {
    return (
        <ParallaxBanner
        layer={[{Image:props.Imgsrc,amount:0.6}]}
        style={{height:props.height}}
        >
            <div>
                {props.children}
            </div>
            
        </ParallaxBanner>
    );
}

export default ParallaxImg;

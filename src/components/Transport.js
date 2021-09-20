import React, { useState } from "react";
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TrainIcon from '@material-ui/icons/Train';

import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import TramIcon from '@material-ui/icons/Tram';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    transportButton: {
      background: '#FFF',
        '&:focus': {
        background: "#777777",
    },
   
  },
}));

const Transport = (props) => {
  
    const [shortTransport, setShortTransport] = useState("");
    const [longTransport, setLongTransport] = useState("");
    const [disable, setDisable] = useState(true);

    const classes = useStyles();

    const carButtonClicked = () => {
        setDisable(true);
        setLongTransport("car");
        props.onLongTransportChange(longTransport); 
    };
    const trainButtonClicked = () => {
        setDisable(false);
        setLongTransport("train");
        props.onLongTransportChange(longTransport); 
    };

  return (
      <div>  
    <h2>We suggest you choose transport</h2>
        {props.distance <= 20 ?
            <div>
                <Button
                className={classes.transportButton}
                >
                    <DirectionsBikeIcon />  
                </Button>
                <Button
                className={classes.transportButton}
                >
                    <TramIcon/>
                </Button>
                <Button
                className={classes.transportButton}
                >
                    <DirectionsBusIcon/>
                </Button>
            </div>
            :
            <div>
                <Button
                className={classes.transportButton}
                onClick={carButtonClicked}
                >
                    <DirectionsCarIcon />  
                </Button>
                <Button
                    className={classes.transportButton}
                    onClick={trainButtonClicked}
                >
                    <TrainIcon/>
                </Button>
                <h2>And from Main Station: </h2>
                <Button
                    disabled={disable}
                    className={classes.transportButton}
                >
                    <TramIcon />
                    <span>Number 2, 16</span>
                </Button>
                <Button
                    disabled={disable}
                    className={classes.transportButton}
                >
                    <DirectionsBusIcon />
                    <span>Number 145, 146</span>
                </Button>
            </div>
        }       
    </div>
  );
};

export default Transport;

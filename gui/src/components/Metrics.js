import React from 'react';


class MetricDisplay extends React.Component{

    subcats = []
    labels = []


    render(){

        for(var i=0;i<this.props.data.length;i++){
            // this.subcats.push(this.props.data[i][0]);
            // this.subcats.push(this.props.data[i][1]);
        }

        console.log(this.props.data)

        return(
            <div>
                
            </div>
        )
    }
}

export default MetricDisplay;
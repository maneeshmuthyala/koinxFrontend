import { Component } from "react";
import './index.css'

class PreHCard extends Component{
    render(){
        return (
     <div className="capital-gains-card">
      <h3 className="title">Pre Harvesting</h3>
      <div className="columns">
        <div className="column-label"></div>
        <div className="column">Short-term</div>
        <div className="column">Long-term</div>
      </div>

      <div className="row">
        <div className="label">Profits</div>
        <div className="value">$4049.48</div>
        <div className="value">$0.00</div>
      </div>
      <div className="row">
        <div className="label">Losses</div>
        <div className="value">$32127.03</div>
        <div className="value">- $0.00</div>
      </div>

      <div className="row bold">
        <div className="label">Net Capital Gains</div>
        <div className="value">-$28077.55</div>
        <div className="value">$0.00</div>
      </div>

      <div className="total-gains">
        Realised Capital Gains: <span className="total-amount">-$28077.55</span>
      </div>
    </div>
        )
    }
}
export default PreHCard
import React, { Component } from 'react';
import './index.css';

class AftHCard extends Component {
  render() {
    const { shortProfit, shortLoss, longProfit, longLoss } = this.props;

    const netShort = shortProfit - shortLoss;
    const netLong = longProfit - longLoss;
    const preHarvestGains = '-28077.55';
    const res = netShort - preHarvestGains;
    return (
      <div className="capital-gains-car">
        <h3 className="title">After Harvesting</h3>
        <div className="columns">
          <div className="column-label"></div>
          <div className="column">Short-term</div>
          <div className="column">Long-term</div>
        </div>

        <div className="row">
          <div className="label">Profits</div>
          <div className="value">${shortProfit.toFixed(2)}</div>
          <div className="value">${longProfit.toFixed(2)}</div>
        </div>
        <div className="row">
          <div className="label">Losses</div>
          <div className="value">${shortLoss.toFixed(2)}</div>
          <div className="value">${longLoss.toFixed(2)}</div>
        </div>

        <div className="row bold">
          <div className="label">Net Capital Gains</div>
          <div className="value">${netShort.toFixed(2)}</div>
          <div className="value">${netLong.toFixed(2)}</div>
        </div>

        <div className="total-gains">
          Effective Capital Gains: <span className="total-amount">${netShort.toFixed(2)}</span>
        </div>
        {
          preHarvestGains < netShort ? <p>🎉 You are going to save upto ${res.toFixed(2)}</p> : ''
        }
      </div>
    );
  }
}

export default AftHCard;

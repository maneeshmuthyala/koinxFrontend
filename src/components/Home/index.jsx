import React, { Component } from 'react';
import './index.css';
import Header from '../Header';
import PreHCard from '../PreHCard';
import AftHCard from '../AftHCard';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dat: [],
      selectedRows: [],
      shortTermSortOrder: 'asc',
      showAll: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const response = await fetch('https://koinxbackend-4r08.onrender.com/holdings');
      const data = await response.json();
      this.setState({ dat: data });
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  };

  toggleImportantNotes = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  handleCheckboxChange = (item) => {
    const { selectedRows } = this.state;
    const alreadySelected = selectedRows.includes(item);
    const updated = alreadySelected
      ? selectedRows.filter((i) => i !== item)
      : [...selectedRows, item];
    this.setState({ selectedRows: updated });
  };

  calculateHarvesting = () => {
    const { selectedRows } = this.state;
    let shortProfit = 4049.48;
    let shortLoss = 32127.03;
    let longProfit = 0;
    let longLoss = 0;

    selectedRows.forEach((item) => {
      const stGain = item.stcg.gain || 0;
      const ltGain = item.ltcg.gain || 0;
      if (stGain >= 0) shortProfit += stGain;
      else shortLoss += -stGain;
      if (ltGain >= 0) longProfit += ltGain;
      else longLoss += -ltGain;
    });

    return { shortProfit, shortLoss, longProfit, longLoss };
  };

  formatAmount = (value) => {
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toString();
  };

  handleShortTermSort = () => {
    const { dat, shortTermSortOrder } = this.state;
    const sortedData = [...dat].sort((a, b) => {
      const gainA = a.stcg?.gain ?? 0;
      const gainB = b.stcg?.gain ?? 0;
      return shortTermSortOrder === 'asc' ? gainA - gainB : gainB - gainA;
    });

    this.setState({
      dat: sortedData,
      shortTermSortOrder: shortTermSortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  toggleShowAll = () => {
    this.setState(prev => ({ showAll: !prev.showAll }));
  }

  render() {
    const { isOpen, dat, selectedRows, shortTermSortOrder, showAll } = this.state;
    const { shortProfit, shortLoss, longProfit, longLoss } = this.calculateHarvesting();
    const displayData = showAll ? dat : dat.slice(0, 4);

    return (
      <div className="main-co">
        <Header />
        <div className="ro-co">
          <h1 className="head">Tax Harvesting</h1>
          <div className="tooltip-container">
            <a className="an">How it Works?</a>
            <div className="tooltip-box">
             Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur. <a>Know More</a>
              <div className="tooltip-arrow" />
            </div>
          </div>
        </div>

        <div className="important-notes-container">
          <div className="header" onClick={this.toggleImportantNotes}>
            <div className="title">
              <span className="info-icon">ℹ️</span>
              <span>Important Notes & Disclaimers</span>
            </div>
            <span className="chevron">{isOpen ? '▲' : '▼'}</span>
          </div>
          {isOpen && (
            <ul className="notes-list">
              <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
              <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
              <li>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
               <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
                <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>

            </ul>
          )}
        </div>

        <div className="toos">
          <PreHCard />
          <AftHCard
            shortProfit={shortProfit}
            shortLoss={shortLoss}
            longProfit={longProfit}
            longLoss={longLoss}
          />
        </div>

        <h3 className="head">Holdings</h3>
        <div className="holdings-container">
          <table className="holdings-table">
            <thead>
              <tr>
                <th></th>
                <th>Asset</th>
                <th>Holdings<br /><span className="sub">Avg Buy Price</span></th>
                <th>Current Price</th>
                <th onClick={this.handleShortTermSort} style={{ cursor: 'pointer' }}>
                  Short-term {shortTermSortOrder === 'asc' ? '🔼' : '🔽'}
                </th>
                <th>Long-Term</th>
                <th>Amount to Sell</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((item) => (
                <tr key={item.coin} className={selectedRows.includes(item) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item)}
                      onChange={() => this.handleCheckboxChange(item)}
                    />
                  </td>
                  <td className="asset-cell">
                    <div className="coto">
                      <img src={item.logo} alt={item.coinName} className="item-lg" />
                      <div>
                        <span className="icon">{item.coinName}</span><br />
                        <span className="sub">{item.coin}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="tooltip">
                      {this.formatAmount(item.totalHolding)}
                      <span className="tooltiptext">{item.totalHolding}</span>
                    </div>
                    <div className="sub">{item.averageBuyPrice}</div>
                  </td>
                  <td>{item.currentPrice}</td>
                  <td>
                    <div className={`tooltip ${item.stcg.gain >= 0 ? 'gr' : 'rd'}`}>
                      {item.stcg.gain >= 0 ? '+' : '-'}${this.formatAmount(Math.abs(item.stcg.gain))}
                      <span className="tooltiptext">${Math.abs(item.stcg.gain).toFixed(2)}</span>
                    </div>
                    <div className="sub">{item.stcg.balance} {item.coin}</div>
                  </td>
                  <td>
                    <div className={`tooltip ${item.ltcg.gain >= 0 ? 'gr' : 'rd'}`}>
                      {item.ltcg.gain >= 0 ? '+' : '-'}${this.formatAmount(Math.abs(item.ltcg.gain))}
                      <span className="tooltiptext">${Math.abs(item.ltcg.gain).toFixed(2)}</span>
                    </div>
                    <div className="sub">{item.ltcg.balance} {item.coin}</div>
                  </td>
                  <td>
                    {selectedRows.includes(item) ? (
                      <div className="tooltip">
                        {this.formatAmount(item.totalHolding)}
                        <span className="tooltiptext">{item.totalHolding}</span>
                      </div>
                    ) : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="view-all" onClick={this.toggleShowAll}>
            {showAll ? 'Show Less' : 'View All'}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

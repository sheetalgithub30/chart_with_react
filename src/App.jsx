import { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import "./App.css";

function App() {
  const [homevalue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(5);

  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    // Update the downPaymentValue : 20% of current homevalue
    const newDownPayment = Math.floor(homevalue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homevalue - newDownPayment);
  }, [homevalue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI =
      (loanAmount *
        interestPerMonth *
        (1 + interestPerMonth) ** totalLoanMonths) /
      ((1 + interestPerMonth) ** totalLoanMonths - 1);

    setMonthlyPayment(Math.round(EMI*100)/100);
  }, [loanAmount, interestRate, tenure]);



  return (
    <div id="app">
      <div id="navbar">
         <h2>BANK OF REACT</h2>
      </div>
      <div id="container">
      <div id="progress">
        <div class="value">
          <p>Home Value</p>
          <p class="price">$ {homevalue}</p>
       
          <input
            onChange={(e) => setHomeValue(parseInt(e.currentTarget.value))}
            type="range"
            min="1000"
            max="10000"
            value={homevalue}
          />
           <div id="min_max">
          <p>$ 1000</p>
          <p>$ 10000</p>
          </div>
        </div>
        <div class="value">
          <p>Down Payment</p>
          <p class="price">$ {homevalue - loanAmount}</p>
          <input
            onChange={(e) => {
              setDownPayment(parseInt(e.currentTarget.value));
              setLoanAmount(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={downPayment}
          />
              <div id="min_max">
          <p>$ 0</p>
          <p>$ 3000</p>
          </div>
        </div>
        <div class="value">
          <p>Loan Amount</p>
          <p class="price">$ {homevalue - downPayment}</p>
          <input
            onChange={(e) => {
              setLoanAmount(parseInt(e.currentTarget.value));
              setDownPayment(homevalue - parseInt(e.currentTarget.value));
            }}
            type="range"
            min="0"
            max={homevalue}
            value={loanAmount}
          />
           <div id="min_max">
          <p>$ 0</p>
          <p>$ 3000</p>
          </div>
        </div>
        <div class="value">
          <p>Interest Rate</p>
          <p class="price">{interestRate} %</p>
          <input
            onChange={(e) => setInterestRate(parseInt(e.currentTarget.value))}
            type="range"
            min="2"
            max="18"
            value={interestRate}
          />
           <div id="min_max">
          <p>2 %</p>
          <p>8 %</p>
          </div>
        </div>

        <div class="value">
          <fieldset>
            <legend>
               Tenure
            </legend>
            <select value={tenure} onChange={(e)=>{ setTenure(e.target.value);}}>
              <option value="5">5 years</option>
              <option value="10">10 years</option>
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
            </select>
          </fieldset>
        </div>
      </div>
      <div id="chart">
        <div id="inner-chart">
        <p>Monthly Payment: $ {monthlyPayment}</p>          
        <CChart
          type="pie"
          data={{
            labels: ["Principle", "Interest"],

            datasets: [
              {
        
                backgroundColor: ["#48CAE4","#E75480"],
                data: [homevalue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "black",
                },
              },
            },
          }}
        />

      </div>
      </div>
      </div>
    </div>
  );
}

export default App;
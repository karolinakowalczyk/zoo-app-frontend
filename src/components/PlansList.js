import React, { useState, useEffect } from "react";
import PlansService from "../services/plans.service";
import AuthService from "../services/auth.service";
import { Alert } from '@mui/material/';
import createUUID from "../helpers/createUUID";
import convertMinsToTime from "../helpers/convertMinsToTime";

const PlanList = () => {
  const [plansData, setPlansData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
    PlansService.getUserPlans(currentUser.id).then(
      (response) => {
        setPlansData(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
          setSuccessful(false); 
      }
    );
  }, [currentUser.id]);

const displayPlans = plansData.map((plan, index) =>
    <div key={index}>
        <li key={plan.id}>Plan {index}</li>
        <ul key={createUUID(plan.id)}>
            Reservation
            <li key={createUUID(plan.reservation['date'])}>Date: {plan.reservation['date']}</li>
            <li key={createUUID(plan.reservation['expirationDate'])}>Expiration date: {plan.reservation['expirationDate']}</li>          
        </ul>
        <ul key={createUUID(plan.id)}>
            Transport
            <li key={createUUID(plan.transport['shortTransport'])}>{plan.transport['shortTransport']}</li>
            <li key={createUUID(plan.transport['longTransport'])}>{plan.transport['longTransport']}</li>          
        </ul>
        <ul>
            Attractions
            <ul key={createUUID(plan.id)}>
                {Object.keys(plan.attractions).map((key, index) => (
                    <div key={key}>
                        <li key={createUUID(plan.attractions[key].name)}>{plan.attractions[key].name}</li>
                        <li key={createUUID(plan.attractions[key].hour)}>{convertMinsToTime(plan.attractions[key].hour)}</li>
                        <li key={createUUID(plan.attractions[key].duration)}>{plan.attractions[key].duration} minutes</li>
                    </div>
                ))}
            </ul>       
        </ul>
    </div>
);

  return (
    <div>
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
       )}
      <h2>Your Trip Plans</h2>
      <ul>
        {displayPlans}
      </ul>
      
    </div>
  );
};

export default PlanList;
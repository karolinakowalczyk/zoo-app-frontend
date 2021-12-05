const vphone = (value) => {
  const onlyNumbersAndPlus = /^[0-9 +]+$/;
  if (value && !onlyNumbersAndPlus.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Only numbers and + are valid.</p>
      </div>
    );
  }
};

export default vphone;
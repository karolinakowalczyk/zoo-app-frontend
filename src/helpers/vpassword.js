const vpassword = (value) => {
  const oneNumber = /^(?=.*[0-9])/;
  const oneSpecialCharacter = /^(?=.*[!@#$%^&*])/;
  const appropriateLength = /[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const oneLowerCaseLetter = /^(?=.*[a-z])/;
  const oneUpperCaseLetter = /^(?=.*[A-Z])/
  if (!appropriateLength.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password must be between 6 and 16 characters.</p>
      </div>
    );
  }
  else if (!oneLowerCaseLetter.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password should have at least one lowercase letter.</p>
      </div>
    );
  }
  else if (!oneUpperCaseLetter.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password should have at least one uppercase letter.</p>
      </div>
    );
  }
  else if (!oneNumber.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password should have at least one number.</p>
      </div>
    );
  }
  else if (!oneSpecialCharacter.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Password should have at least one special character.</p>
      </div>
    );
  }
};

export default vpassword;
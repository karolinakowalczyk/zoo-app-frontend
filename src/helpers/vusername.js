const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>The username must be between 3 and 20 characters.</p>
      </div>
    );
  }
};

export default vusername;
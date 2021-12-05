const vonlyLetters = (value) => {
  const onlyLetters = /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/i;
  if (value && !onlyLetters.test(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>Only letters are valid.</p>
      </div>
    );
  }
};

export default vonlyLetters;
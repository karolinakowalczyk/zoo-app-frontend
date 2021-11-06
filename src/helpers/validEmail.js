import { isEmail } from "validator";
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div>
        <p style={{color: "red", margin: "0"}}>This is not a valid email.</p>
      </div>
    );
  }
};
export default validEmail;
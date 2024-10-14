import { Edit } from "@mui/icons-material"
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';


const Account = () => {
  const userInfo = useSelector((state) => state.user.userDetails);
  return (
    <div style={{ margin: "1rem"}}>
      
      <div style={{ margin: "4rem 0 3rem" }}>
        <h1>Account</h1>
      </div>

      <form style={{ width: "90%", display: "flex", flexDirection: "column", gap: "2rem", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: ".5rem" }}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstname" id="firstName" placeholder={userInfo?.firstName} style={{ width: "100%", padding: "1rem 1rem", fontSize: "1rem", fontWeight: "600" }} disabled />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: ".5rem" }}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastname" id="lastName" placeholder={userInfo?.lastName} style={{ width: "100%", padding: "1rem 1rem", fontSize: "1rem", fontWeight: "600" }} disabled />
        </div>  

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: ".5rem" }}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder={userInfo?.email} style={{ width: "100%", padding: "1rem 1rem", fontSize: "1rem", fontWeight: "600" }} disabled />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: ".5rem" }}>
          <label htmlFor="firstName">Password</label>
          <input type="password" name="firstname" id="firstName" placeholder={userInfo?.password} style={{ width: "100%", padding: "1rem 1rem", fontSize: "1rem", fontWeight: "600" }} disabled />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: ".5rem" }}>
          <label htmlFor="firstName">Phone Number</label>
          <input type="password" name="firstname" id="firstName" placeholder="09037613598" style={{ width: "100%", padding: "1rem 1rem", fontSize: "1rem", fontWeight: "600" }} disabled />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: ".5rem", marginBottom: "5rem" }}>
          <label htmlFor="firstName">ID</label>
          <input type="text" name="firstname" id="firstName" placeholder={userInfo?._id} style={{ width: "100%", padding: "1rem 1rem", fontSize: "1rem", fontWeight: "600" }} disabled />
        </div>

        <LoadingButton style={{position: "absolute", bottom: "0", right: "0", fontSize: "1rem", backgroundColor: "#d6d608", padding: "0.5rem 1.5rem", display: "flex", justifyContent: "center", gap: ".5rem" }}>
          <Edit/>
          Edit
        </LoadingButton>
      </form>

      <div style={{margin: "6rem 0", background: "#2DBE60", padding: "2rem", borderRadius: "10px", width: "90%"}}>
        <h2>Full Account Details</h2>
        <div style={{margin: "2rem 0"}}>
          <p style={{margin: ".8rem 0 0"}}>Full Name: <span>Ademola Afolabi</span></p>
          <p style={{margin: ".8rem 0 0"}}>Account Number: <span>22554562939</span></p>
          <p style={{margin: ".8rem 0 0"}}>Email Address: afolabiademola27@gmail.com</p>
          <p style={{margin: ".8rem 0 0"}}>Phone Number: 09037613598</p>
          <p style={{margin: ".8rem 0 0"}}>NIN: 94378329829</p>
        </div>
      </div>
    </div>
  )
}

export default Account

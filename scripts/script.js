//password hashing
async function hashPassword(password) {
  //convert strin to a byte
  const encorder = new TextEncoder();
  const data = encorder.encode(password);
  //turn buffer into an array
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  //convert byte
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b=>b.toString(16).padStart(2,'0')).join('');
  return hashHex;
}

async function handleRegistration(event) {
  //prevent form from reloading page
  event.preventDefault();

  //get values from html
  const name = document.querySelector(".name-input").value.trim();
  const surname = document.querySelector(".surname-input").value.trim()
  const email = document.querySelector(".email-input").value.trim();
  const username = document.querySelector(".username-input").value.trim();
  const password = document.querySelector(".password-input").value;
  const confirmPassword = document.querySelector(".confirmPassword-input").value;

  //validate the inputs
  if(!name || !surname || !username || !email || !password || !confirmPassword){
    alert("please fill all the required fields")
    return;
  }

  if(password !== confirmPassword){
    alert("passwords do not match");
    return;
  }

  /*HASH PASSWORDS*/ 

  //user object
  const userDetails = {
    name,
    surname,
    email,
    username,
    password:await hashPassword(password)
  };

  localStorage.setItem("userDetails", JSON.stringify(userDetails));

  //give feedback &redirect
  alert("Registration succesful");
  /*Redirect to login page*/
};

//connect function to form
document.getElementById("registrationForm").addEventListener("submit", handleRegistration);
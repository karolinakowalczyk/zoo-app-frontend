export default async (req, res) => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");
  params.append("client_id", "HS5962v4NTN1Mo4StTNQ4sxlVPsCXnIZRz0KQLR9Ihi0xJTota");
  params.append("client_secret", "6TwCtSlk1lwO5w4HbFprjxMy6qWpWZeUgf7esv4D");
  const petfinderRes = await fetch(
    "https://api.petfinder.com/v2/oauth2/token",
    {
      method: "POST",
      body: params,
    }
  );
  const data = await petfinderRes.json();
  res.send(data);
};
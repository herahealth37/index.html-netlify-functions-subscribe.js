exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const LOOPS_FORM_ID = "cmm2b8ovj0aii0i0fwt3va27g";
  const LOOPS_ENDPOINT = `https://app.loops.so/api/newsletter-form/${LOOPS_FORM_ID}`;

  try {
    const response = await fetch(LOOPS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong, please try again." }),
    };
  }
};

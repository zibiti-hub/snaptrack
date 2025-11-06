function callGetFromLocalFile() {
    console.log('Calling get endpoint');
  const service = "projects";
  const requestor = "USER-000";
  const action = "getProjects";
  const payload = JSON.stringify({
    id: "PRJ-000"
  });

  const sheetId = "AKfycbz-lVdwbXQcmNEJCTx_cnKWjtfV_hsCHVHsmKK4M1LKvuhsKpsmbls7826xEmwO8H7PpA";
  const url = `https://script.google.com/macros/s/${sheetId}/exec?service=${service}&requestor=${requestor}&action=${action}&payload=${encodeURIComponent(payload)}`;
  
  console.log('Fetching clients via GET...');
  
  return fetch(url)
    .then(response => {
      return response.text().then(text => {
        console.log("Raw GET response:", text);
        
        try {
          const data = JSON.parse(text);
          console.log("GET Response from GAS endpoint:", data);
          return data;
        } catch (e) {
          console.error("JSON parse error:", e);
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
        }
      });
    })
    .catch(error => {
      console.error('GET Request failed:', error);
      throw error;
    });
}

function callPostFromLocalFile() {
  const sheetId = "AKfycbz-lVdwbXQcmNEJCTx_cnKWjtfV_hsCHVHsmKK4M1LKvuhsKpsmbls7826xEmwO8H7PpA";
  const url = `https://script.google.com/macros/s/${sheetId}/exec`;
  
  const body = {
    service: "clients",
    requestor: "USER-000",
    action: "postClient",
    payload: {
      id: "CLI-020",
      name: "ABC Company",
      terms: "7 days"
    }
  };

  console.log('Posting client data via POST...');
  
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      return response.text().then(text => {
        console.log("Raw POST response:", text);
        
        try {
          const data = JSON.parse(text);
          console.log("POST Response from GAS endpoint:", data);
          return data;
        } catch (e) {
          console.error("JSON parse error:", e);
          throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
        }
      });
    })
    .catch(error => {
      console.error('POST Request failed:', error);
      throw error;
    });
}

// Using with .then()
callGetFromLocalFile()
  .then(data => {
    console.log('GET Success:', data);
    // Update your UI here
  })
  .catch(error => {
    console.error('GET Error:', error);
  });

// callPostFromLocalFile()
//   .then(data => {
//     console.log('POST Success:', data);
//     // Update your UI here
//   })
//   .catch(error => {
//     console.error('POST Error:', error);
//   });

// Using with async/await
// async function handleClientOperations() {
//   try {
//     const getResult = await callGetFromLocalFile();
//     console.log('Clients retrieved:', getResult);
    
//     const postResult = await callPostFromLocalFile();
//     console.log('Client created:', postResult);
//   } catch (error) {
//     console.error('Operation failed:', error);
//   }
// }
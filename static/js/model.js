async function sendModelQuery() {
    console.log('sendModelQuery()');
    var inputValue1 = document.getElementById("input1").value;
    var inputValue2 = document.getElementById("input2").value;
    var inputValue3 = document.getElementById("input3").value;
    var inputValue4 = document.getElementById("input4").value;
    var inputValue5 = document.getElementById("input5").value;
    console.log(`send query json ${JSON.stringify({ inputValue1, inputValue2, inputValue3, inputValue4, inputValue5 })}`);
    // Make AJAX request
    const response = await fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputValue1, inputValue2, inputValue3, inputValue4, inputValue5 }),
      
    });

    // if (!response.ok) {
    //     // Handle the error
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }


    const json_response = await response.json();
    const outputElement = document.getElementById('output');
    outputElement.textContent = JSON.stringify(json_response);
}

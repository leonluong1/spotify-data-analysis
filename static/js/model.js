async function sendModelQuery() {
    console.log('sendModelQuery()');
    sendMiniQuery();
    var inputValue1 = document.getElementById("acousticness").value;
    var inputValue2 = document.getElementById("danceability").value;
    var inputValue3 = document.getElementById("energy").value;
    var inputValue4 = document.getElementById("liveness").value;
    var inputValue5 = document.getElementById("loudness").value;
    var inputValue6 = document.getElementById("speechiness").value;
    var inputValue7 = document.getElementById("tempo").value;
    var inputValue8 = document.getElementById("valence").value;
    var inputValue9 = document.getElementById("year").value;
    var inputValue10 = document.getElementById("duration").value;
    console.log(`send query json ${JSON.stringify({ inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8, inputValue9, inputValue10 })}`);
    // Make AJAX request
    const response = await fetch('/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8, inputValue9, inputValue10 }),
      
    });

    // if (!response.ok) {
    //     // Handle the error
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }


    const json_response = await response.json();
    const outputElement = document.getElementById('output');
    var output = Math.round(parseInt(JSON.stringify(json_response)));
    outputElement.textContent = output;
}

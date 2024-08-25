import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(input);
      const result = await axios.post('http://127.0.0.1:5000/bfhl', jsonData);
      setResponse(result.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleSelectChange = (event) => {
    const options = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    let dataToDisplay = [];

    if (selectedOptions.includes('Numbers')) dataToDisplay = dataToDisplay.concat(numbers);
    if (selectedOptions.includes('Alphabets')) dataToDisplay = dataToDisplay.concat(alphabets);
    if (selectedOptions.includes('Highest lowercase alphabet')) dataToDisplay = dataToDisplay.concat(highest_lowercase_alphabet);

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(dataToDisplay, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON data (e.g., {"data":["A","C","z"]})'
      />
      <button onClick={handleSubmit}>Submit</button>

      <select multiple onChange={handleSelectChange}>
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>

      {renderResponse()}
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import Papa from 'papaparse';

// function App() {
//   const [csvData, setCsvData] = useState([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];

//     Papa.parse(file, {
//       complete: (result) => {
//         setCsvData(result.data);
//       },
//     });
//   };

//   return (
//     <div>
//       <h1>CSV Reader</h1>
//       <input type="file" accept=".csv" onChange={handleFileUpload} />
//       <table>
//         <thead>
//           <tr>
//             {csvData[0] && csvData[0].map((header, index) => <th key={index}>{header}</th>)}
//           </tr>
//         </thead>
//         <tbody>
//           {csvData.slice(1).map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {row.map((cell, cellIndex) => (
//                 <td key={cellIndex}>{cell}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data.csv'); // Adjust the file path based on your file location
      const reader = response.body.getReader();
      const result = await reader.read();
      const text = new TextDecoder('utf-8').decode(result.value);

      Papa.parse(text, {
        complete: (parsedData) => {
          setCsvData(parsedData.data);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>CSV Reader</h1>
      <table>
        <thead>
          <tr>
            {csvData[0] && csvData[0].map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {csvData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;


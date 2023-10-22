import React, { useState, useEffect } from 'react';

const CodeEditor = () => {
    const initialCode = `
@cfunction(callable, ReturnType, (ArgumentTypes...,)) -> Ptr{Cvoid}
@cfunction($callable, ReturnType, (ArgumentTypes...,)) -> CFunction
julia> A = zeros(5, 5);

julia> B = [1 2; 3 4];

julia> Ainds = CartesianIndices((2:3, 2:3));

julia> Binds = CartesianIndices(B);

julia> copyto!(A, Ainds, B, Binds)
5×5 Matrix{Float64}:
 0.0  0.0  0.0  0.0  0.0
 0.0  1.0  2.0  0.0  0.0
 0.0  3.0  4.0  0.0  0.0
 0.0  0.0  0.0  0.0  0.0
 0.0  0.0  0.0  0.0  0.0
`;
const [code, setCode] = useState(initialCode);
const [lines, setLines] = useState(computeLines(initialCode));

function computeLines(text) {
  return text.split('\n').length;
}

useEffect(() => {
  setLines(computeLines(code));
}, [code]);

return (
  <div style={{ display: 'flex', backgroundColor: '#f7f7f7', borderRadius: '8px', padding: '20px' }}>
    {/* <div style={{ marginRight: '8px' }}>
      {[...Array(lines)].map((_, idx) => (
        <div key={idx} style={{ fontFamily: 'monospace', fontSize: '14px', padding: '8.5px 0' }}>{idx + 1}</div>
      ))}
    </div> */}
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      style={{
        width: '100%',
        height: `${lines * 21}px`,
        fontFamily: 'monospace',
        fontSize: '14px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        whiteSpace: 'pre-wrap',
        overflow: 'auto',
        resize: 'none'
      }}
    />
  </div>
);
}

export default CodeEditor;

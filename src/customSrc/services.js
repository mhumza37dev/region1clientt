export const getCandidates = async () => {
    const response = await fetch('http://localhost:3001/Candidates');
    const data = await response.json();
  }
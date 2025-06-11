const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(2); 
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };
  
  export default formatDuration;
  
const Error = ({ message }) => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-600 text-center">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{message}</p>
      </div>
    </div>
  );
  
  export default Error;
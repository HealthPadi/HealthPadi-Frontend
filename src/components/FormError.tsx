import React from "react";

function FormError({ error }: { error?: string }) {
  return (
    <div className={`${error ? "block" : "hidden"}`}>
      <p className=" text-red-600 text-xs my-2">{error}</p>
    </div>
  );
}

export default FormError;
